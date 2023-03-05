import {
  AnyAtom,
  AnyBigNumber,
  AnyPid,
  AnyPort,
  AnyReference,
  AnyTuple,
  ATOM_EXT,
  ATOM_UTF8_EXT,
  BINARY_EXT,
  BIT_BINARY_EXT,
  ETF_VERSION,
  EXPORT_EXT,
  FLOAT_EXT,
  INTEGER_EXT,
  LARGE_BIG_EXT,
  LARGE_TUPLE_EXT,
  LIST_EXT,
  MAP_EXT,
  NEW_FLOAT_EXT,
  NEW_FUN_EXT,
  NEW_PID_EXT,
  NEW_PORT_EXT,
  NEW_REFERENCE_EXT,
  NEWER_REFERENCE_EXT,
  NIL_EXT,
  PID_EXT,
  PORT_EXT,
  REFERENCE_EXT,
  SMALL_ATOM_EXT,
  SMALL_ATOM_UTF8_EXT,
  SMALL_BIG_EXT,
  SMALL_INTEGER_EXT,
  SMALL_TUPLE_EXT,
  STRING_EXT,
  V4_PORT_EXT,
} from "./Constants.ts";
import { Atom } from "./Structs/Atom.ts";
import {
  IExport,
  INewFun,
  IPid,
  IPort,
  IReference,
} from "./Structs/types.d.ts";

export class Decoder {
  private buffer = new Uint8Array(0);
  private view = new DataView(this.buffer.buffer);
  private offset = 0;
  private readonly textDecoder = new TextDecoder();

  /**
   * Decodes data.
   * @param data Data to decode.
   */
  public decode(data: Uint8Array) {
    this.buffer = data;
    this.view = new DataView(this.buffer.buffer);
    this.offset = 0;
    const VERSION = this.readUInt8();
    if (VERSION !== ETF_VERSION) throw new Error("Invalid ETF version");
    const decoded = this.read();
    this.reset();
    return decoded;
  }

  /**
   * For recursive calls to decode.
   * @param data Data to decode.
   */
  private read(): DecodedData {
    const term = this.readUInt8();

    switch (term) {
      case SMALL_INTEGER_EXT:
        return this.readUInt8();
      case INTEGER_EXT:
        return this.readInt32();
      case FLOAT_EXT:
        return parseFloat(this.readString(31));
      case PORT_EXT:
      case NEW_PORT_EXT:
      case V4_PORT_EXT:
        return this.readAnyPort(term);
      case PID_EXT:
      case NEW_PID_EXT:
        return this.readAnyPid(term);
      case SMALL_TUPLE_EXT:
      case LARGE_TUPLE_EXT:
        return this.readAnyTuple(term);
      case MAP_EXT:
        return this.readMap();
      case NIL_EXT:
        return [];
      case STRING_EXT: {
        const length = this.readUInt16();
        return this.readString(length);
      }
      case LIST_EXT:
        return this.readList();
      case BINARY_EXT:
        return this.readBinary();
      case SMALL_BIG_EXT:
      case LARGE_BIG_EXT:
        return this.readAnyBigNumber(term);
      case REFERENCE_EXT:
      case NEW_REFERENCE_EXT:
      case NEWER_REFERENCE_EXT:
        return this.readAnyReference(term);
      case NEW_FUN_EXT:
        return this.readNewFun();
      case EXPORT_EXT:
        return this.readExport();
      case BIT_BINARY_EXT:
        return this.readBitBinary();
      case NEW_FLOAT_EXT:
        return this.readFloat64();
      case ATOM_UTF8_EXT:
      case SMALL_ATOM_UTF8_EXT:
      case ATOM_EXT:
      case SMALL_ATOM_EXT: {
        const atom = this.readAnyAtom(term);
        if (atom === "nil" || atom === "null") return null;
        else if (atom === "undefined") return undefined;
        else if (atom === "true" || atom === "false") return atom === "true";
        else if (atom === "NaN") return NaN;
        else if (atom === "Infinity") return Infinity;
        return atom;
      }
      default:
        throw new Error(`Unsupported term: ${term}`);
    }
  }

  private readAnyPort(term: AnyPort) {
    const isPortExt = term === PORT_EXT;
    const isNewPortExt = term === NEW_PORT_EXT;
    const node = this.read();
    const id = (isPortExt || isNewPortExt)
      ? this.readUInt32()
      : this.readBigUint64();
    const creation = (isPortExt) ? this.readUInt8() : this.readUInt32();

    return {
      node,
      id,
      creation,
      toString: () => `#Port<${creation}.${id}>`,
    } as IPort;
  }

  private readAnyPid(term: AnyPid) {
    const isNewPid = term === NEW_PID_EXT;
    const node = this.read();
    const id = this.readUInt32();
    const serial = this.readUInt32();
    const creation = isNewPid ? this.readUInt32() : this.readUInt8();

    return {
      node,
      id,
      serial,
      creation,
      toString: () => `#PID<${creation}.${id}.${serial}>`,
    } as IPid;
  }

  private readAnyTuple(
    term: AnyTuple,
  ): DecodedData[] {
    const isSmall = term === SMALL_TUPLE_EXT;
    const length = isSmall ? this.readUInt8() : this.readUInt32();
    return Array.from({ length }, () => this.read());
  }

  private readMap() {
    const o = {} as Record<string, DecodedData>;
    const length = this.readInt32();

    for (let i = 0; i < length; i++) {
      const key = this.read() as string;
      o[key] = this.read();
    }
    return o;
  }

  private readList() {
    const length = this.readUInt32();
    const list = Array.from({ length }, () => this.read()) as DecodedData[];
    this.offset++; // skip NIL_EXT
    return list;
  }

  private readBinary() {
    const length = this.readUInt32();
    return this.readString(length);
  }

  private readAnyBigNumber(term: AnyBigNumber) {
    const isSmall = term === SMALL_BIG_EXT;
    const length = isSmall ? this.readUInt8() : this.readUInt32();
    const sign = this.readUInt8();
    let value = 0n, b = 1n;

    for (let i = 0; i < length; i++) {
      value += BigInt(this.readInt8()) * b;
      b <<= 8n;
    }

    return sign === 0 ? value : -value;
  }

  readAnyReference(term: AnyReference) {
    if (term === REFERENCE_EXT) {
      const node = this.read();
      const id = this.readUInt32();
      const creation = this.readUInt8();
      return {
        node,
        id,
        creation,
        toString: () => `#Reference<${creation}.0.0.${id}>`,
      } as IReference;
    } else {
      const length = this.readUInt16();
      const node = this.read();
      const creation = term === NEWER_REFERENCE_EXT
        ? this.readUInt32()
        : this.readUInt8();
      const ids = Array.from({ length }, () => this.readUInt32()).reverse();
      return {
        node,
        id: ids,
        creation,
        toString: () => `#Reference<${creation}.${ids.join(".")}>`,
      } as IReference;
    }
  }

  private readNewFun() {
    const size = this.readUInt32();
    const arity = this.readUInt8();
    const uniq = Array.from(
      { length: 16 },
      () => this.readUInt8().toString(16).padStart(2, "0"),
    ).join("");
    const index = this.readUInt32();
    const numFree = this.readUInt32();
    const module = this.read();
    const oldIndex = this.read() as number;
    const oldUniq = this.read() as number;
    const pid = this.read() as IPid;
    const freeVars = this.read() as DecodedData[];

    return {
      size,
      arity,
      uniq,
      index,
      numFree,
      module,
      oldIndex,
      oldUniq,
      pid,
      freeVars,
      toString: () => `#Function<${oldIndex}.${oldUniq}/${arity}>`,
    } as INewFun;
  }

  private readExport() {
    const module = this.read();
    const func = this.read();
    const arity = this.read();
    return {
      module,
      func,
      arity,
      toString: () => `&:${module}.${func}/${arity}`,
    } as IExport;
  }

  private readBitBinary() {
    const length = this.readUInt32();
    this.offset++; // skip Bits
    return Array.from({ length }, () => this.readUInt8());
  }

  private readAnyAtom(term: AnyAtom) {
    const isAnySmallAtom = term === SMALL_ATOM_UTF8_EXT ||
      term === SMALL_ATOM_EXT;
    const isUTF8 = term === ATOM_UTF8_EXT || term === SMALL_ATOM_UTF8_EXT;
    const length = (isAnySmallAtom) ? this.readUInt8() : this.readUInt16();
    return this.readString(length);
  }

  private readString(length: number) {
    const value = this.textDecoder.decode(
      this.buffer.slice(this.offset, this.offset + length),
    );
    this.offset += length;
    return value;
  }

  private reset() {
    this.buffer = new Uint8Array(0);
    this.view = new DataView(this.buffer.buffer);
    this.offset = 0;
  }

  private readInt8() {
    return this.view.getInt8(this.offset++);
  }

  private readUInt8() {
    return this.view.getUint8(this.offset++);
  }

  private readInt16(littleEndian = false) {
    const value = this.view.getInt16(this.offset, littleEndian);
    this.offset += 2;
    return value;
  }

  private readUInt16(littleEndian = false) {
    const value = this.view.getUint16(this.offset, littleEndian);
    this.offset += 2;
    return value;
  }

  private readInt32(littleEndian = false) {
    const value = this.view.getInt32(this.offset, littleEndian);
    this.offset += 4;
    return value;
  }

  private readUInt32(littleEndian = false) {
    const value = this.view.getUint32(this.offset, littleEndian);
    this.offset += 4;
    return value;
  }

  private readFloat64(littleEndian = false) {
    const value = this.view.getFloat64(this.offset, littleEndian);
    this.offset += 8;
    return value;
  }

  private readBigInt64(littleEndian = false) {
    const value = this.view.getBigInt64(this.offset, littleEndian);
    this.offset += 8;
    return value;
  }

  private readBigUint64(littleEndian = false) {
    const value = this.view.getBigUint64(this.offset, littleEndian);
    this.offset += 8;
    return value;
  }
}

export const decode = (data: Uint8Array) => new Decoder().decode(data);

export type DecodedData =
  | string
  | number
  | bigint
  | boolean
  | unknown[]
  | Record<PropertyKey, unknown>
  | null
  | undefined
  | Atom
  | IPort
  | IPid
  | IReference
  | INewFun
  | IExport;

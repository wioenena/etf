import {
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
import { IPid, IPort, IReference } from "./Structs/types.d.ts";

const NOT_IMPLEMENTED = "Not implemented";

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
      case V4_PORT_EXT: {
        const isPortExt = term === PORT_EXT;
        const isNewPortExt = term === NEW_PORT_EXT;
        const node = this.read() as Atom;
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
      case PID_EXT:
      case NEW_PID_EXT: {
        const isNewPid = term === NEW_PID_EXT;
        const node = this.read() as Atom;
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
      case SMALL_TUPLE_EXT:
      case LARGE_TUPLE_EXT:
        return NOT_IMPLEMENTED;
      case MAP_EXT:
        return NOT_IMPLEMENTED;
      case NIL_EXT:
        return [];
      case STRING_EXT: {
        const length = this.readUInt16();
        return this.readString(length);
      }
      case LIST_EXT:
        return NOT_IMPLEMENTED;
      case BINARY_EXT: {
        const length = this.readUInt32();
        return this.readString(length);
      }
      case SMALL_BIG_EXT:
      case LARGE_BIG_EXT: {
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
      case REFERENCE_EXT:
      case NEW_REFERENCE_EXT:
      case NEWER_REFERENCE_EXT: {
        if (term === REFERENCE_EXT) {
          const node = this.read() as Atom;
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
          const node = this.read() as Atom;
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
      case NEW_FUN_EXT:
        return NOT_IMPLEMENTED;
      case EXPORT_EXT:
        return NOT_IMPLEMENTED;
      case BIT_BINARY_EXT:
        return NOT_IMPLEMENTED;
      case NEW_FLOAT_EXT:
        return NOT_IMPLEMENTED;
      case ATOM_UTF8_EXT:
      case SMALL_ATOM_UTF8_EXT:
      case ATOM_EXT:
      case SMALL_ATOM_EXT: {
        const isAnySmallAtom = term === SMALL_ATOM_UTF8_EXT ||
          term === SMALL_ATOM_EXT;
        const isUTF8 = term === ATOM_UTF8_EXT || term === SMALL_ATOM_UTF8_EXT;
        const length = (isAnySmallAtom) ? this.readUInt8() : this.readUInt16();
        return new Atom(this.readString(length), isUTF8);
      }

      default:
        throw new Error(`Unsupported term: ${term}`);
    }
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
  | IReference;

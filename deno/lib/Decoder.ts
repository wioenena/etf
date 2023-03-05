import {
  ATOM_EXT,
  ATOM_UTF8_EXT,
  AtomTerms,
  BINARY_EXT,
  ETF_VERSION,
  FLOAT_EXT,
  INTEGER_EXT,
  NEW_PID_EXT,
  NEW_PORT_EXT,
  NIL_EXT,
  PID_EXT,
  PORT_EXT,
  SMALL_ATOM_EXT,
  SMALL_ATOM_UTF8_EXT,
  SMALL_INTEGER_EXT,
  STRING_EXT,
  V4_PORT_EXT,
} from "./Constants.ts";
import { Atom, AtomTerm } from "./Structs/Atom.ts";
import { Pid, PidTerm } from "./Structs/Pid.ts";
import { Port, PortTerm } from "./Structs/Port.ts";

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
    const decoded = this.nativeDecode();
    this.reset();
    return decoded;
  }

  /**
   * For recursive calls to decode.
   * @param data Data to decode.
   */
  private nativeDecode() {
    const term = this.readUInt8();
    switch (term) {
      case SMALL_INTEGER_EXT:
        return this.readUInt8();
      case INTEGER_EXT:
        return this.readInt32();
      case FLOAT_EXT:
        return parseFloat(this.readString(31));
      case PORT_EXT:
        return this.readPortExt();
      case NEW_PORT_EXT:
        return this.readNewPortExt();
      case V4_PORT_EXT:
        return this.readV4PortExt();
      case PID_EXT:
        return this.readPidExt();
      case NEW_PID_EXT:
        return this.readNewPidExt();
      case NIL_EXT:
        return [];
      case STRING_EXT: {
        const length = this.readUInt16();
        return this.readString(length);
      }
      case BINARY_EXT: {
        const length = this.readUInt32();
        return this.readString(length);
      }

      default:
        throw new Error(`Unsupported term: ${term}`);
    }
  }

  private readPortExt() {
    const atomTerm = this.readUInt8();
    const node = this.detectAtom(atomTerm as AtomTerms);
    const id = this.readUInt32();
    const creation = this.readUInt8();
    return new Port(node, id, creation);
  }

  private readNewPortExt() {
    const atomTerm = this.readUInt8();
    const node = this.detectAtom(atomTerm as AtomTerms);
    const id = this.readInt32();
    const creation = this.readInt32();
    return new Port(node, id, creation, PortTerm.NEW_PORT_EXT);
  }

  private readV4PortExt() {
    const atomTerm = this.readUInt8();
    const node = this.detectAtom(atomTerm as AtomTerms);
    const id = this.readBigUint64();
    const creation = this.readInt32();
    return new Port(node, id, creation, PortTerm.V4_PORT_EXT);
  }

  private readPidExt() {
    const atomTerm = this.readUInt8();
    const node = this.detectAtom(atomTerm as AtomTerms);
    const id = this.readUInt32();
    const serial = this.readUInt32();
    const creation = this.readUInt8();
    return new Pid(node, id, serial, creation);
  }

  private readNewPidExt() {
    const atomTerm = this.readUInt8();
    const node = this.detectAtom(atomTerm as AtomTerms);
    const id = this.readUInt32();
    const serial = this.readUInt32();
    const creation = this.readUInt32();
    return new Pid(node, id, serial, creation, PidTerm.NEW_PID_EXT);
  }

  private readString(length: number) {
    const value = this.textDecoder.decode(
      this.buffer.slice(this.offset, this.offset + length),
    );
    this.offset += length;
    return value;
  }

  private detectAtom(term: AtomTerms) {
    if (term === ATOM_UTF8_EXT) {
      return this.readUTF8AtomExt();
    } else if (term === SMALL_ATOM_UTF8_EXT) {
      return this.readSmallUTF8AtomExt();
    } else if (term === ATOM_EXT) {
      return this.readAtomExt();
    } else if (term === SMALL_ATOM_EXT) {
      return this.readSmallAtomExt();
    }
    throw new Error(`Unsupported term: ${term}`);
  }

  private readUTF8AtomExt() {
    const length = this.readUInt16();
    return new Atom(this.readString(length), AtomTerm.ATOM_UTF8_EXT);
  }

  private readSmallUTF8AtomExt() {
    const length = this.readUInt8();
    return new Atom(this.readString(length), AtomTerm.SMALL_ATOM_UTF8_EXT);
  }

  private readAtomExt() {
    const length = this.readUInt16();
    return new Atom(this.readString(length), AtomTerm.ATOM_EXT);
  }

  private readSmallAtomExt() {
    const length = this.readUInt8();
    return new Atom(this.readString(length), AtomTerm.SMALL_ATOM_EXT);
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

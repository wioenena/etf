import * as Constants from "./Constants.ts";
import { Atom } from "./Structs/Atom.ts";

export class Encoder {
  private buffer = new Uint8Array(0);
  private view = new DataView(this.buffer.buffer);
  private offset = 0;
  private readonly encoder = new TextEncoder();

  /**
   * Write a data with ETF format.
   * @param value Value to write
   */
  public encode(value: unknown) {
    this.writeVersion();
    this.write(value);
    const { buffer } = this;
    this.reset();
    return buffer;
  }

  /**
   * Write ETF version.
   */
  private writeVersion() {
    this.expandBuffer(1);
    this.setUInt8(Constants.ETF_VERSION);
  }

  /**
   * For recursive calls to write.
   * @param value Value to write
   */
  private write(value: unknown) {
    if (value instanceof Atom) return this.writeAtom(value), void 0;
    else if (value === null) return this.writeAtom(new Atom("null")), void 0;
    else if (value === undefined) {
      return this.writeAtom(new Atom("undefined")), void 0;
    } else if (value === true || value === false) {
      return this.writeAtom(new Atom(value ? "true" : "false")), void 0;
    }

    const type = typeof value;
    switch (type) {
      case "number":
        this.writeAnyNumber(value as number);
        break;
      case "bigint":
        this.writeBigInt(value as bigint);
        break;
      case "object":
        if (Array.isArray(value)) {
          value.length === 0
            ? this.writeNil()
            : this.writeList(value as unknown[]);
        } else this.writeObject(value as Record<PropertyKey, unknown>);
        break;
      case "string":
        this.writeString(value as string);
        break;
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  }

  private writeAnyNumber(value: number) {
    if (Number.isNaN(value)) this.writeAtom(new Atom("NaN"));
    else if (!Number.isFinite(value)) this.writeAtom(new Atom("Infinity"));
    else if (!Number.isInteger(value)) this.writeFloat(value);
    else if ((value) >= (0x0) && (value) <= 0xFF) {
      this.writeSmallInt(value); /* Only unsigned 8-bit integer */
    } else if ((value) >= (-0x80000000) && (value) <= 0x7FFFFFFF) {
      /* Only signed 32-bit integer */
      this.writeInteger(value);
    } else {
      /* otherwise write it as a float (to write as bigint, the number must be specified in bigint type) */
      this.writeFloat(value);
    }
  }

  private writeSmallInt(value: number) {
    this.expandBuffer(2);
    this.setUInt8(Constants.SMALL_INTEGER_EXT);
    this.setUInt8(value);
  }

  private writeInteger(value: number) {
    this.expandBuffer(5);
    this.setUInt8(Constants.INTEGER_EXT);
    this.setInt32(value);
  }

  private writeFloat(value: number) {
    this.expandBuffer(9);
    this.setUInt8(Constants.NEW_FLOAT_EXT);
    this.setFloat64(value);
  }

  private writeBigInt(value: bigint) {
    this.expandBuffer(6);
    this.setUInt8(Constants.LARGE_BIG_EXT);
    const byteLength = Math.ceil(value.toString(2).length / 8);
    this.expandBuffer(byteLength);

    this.setUInt32(byteLength);
    const sign = value < 0n ? 1 : 0;
    this.setUInt8(sign);
    value = value < 0n ? -value : value;

    for (let i = 0; i < byteLength; i++) {
      this.setUInt8(Number(value & 0xFFn));
      value >>= 8n;
    }
  }

  private writeList(value: unknown[]) {
    this.expandBuffer(5 + value.length); // 4 + (1 for nil)
    this.setUInt8(Constants.LIST_EXT);
    this.setUInt32(value.length);
    for (const item of value) this.write(item);
    this.setUInt8(Constants.NIL_EXT);
  }

  private writeNil() {
    this.expandBuffer(1);
    this.setUInt8(Constants.NIL_EXT);
  }

  private writeObject(value: Record<PropertyKey, unknown>) {
    const entries = Object.entries(value);
    this.expandBuffer(5 + entries.length);
    this.setUInt8(Constants.MAP_EXT);
    this.setUInt32(entries.length);
    for (const [key, value] of entries) {
      this.write(key);
      this.write(value);
    }
  }

  private writeString(value: string) {
    const encoded = this.encoder.encode(value);
    this.expandBuffer(5 + encoded.byteLength);
    this.setUInt8(Constants.BINARY_EXT);
    this.setUInt32(encoded.byteLength);
    this.buffer.set(encoded, this.offset);
    this.offset += encoded.byteLength;
  }

  private writeAtom(atom: Atom) {
    this.expandBuffer(3);
    const encoded = this.encoder.encode(atom.value);
    this.expandBuffer(encoded.byteLength);
    this.setUInt8(atom.isUTF8 ? Constants.ATOM_UTF8_EXT : Constants.ATOM_EXT);
    this.setUInt16(encoded.byteLength);
    for (const byte of encoded) {
      this.setUInt8(byte);
    }
  }

  private setUInt8(value: number) {
    this.view.setUint8(this.offset++, value);
  }

  private setUInt16(value: number, littleEndian = false) {
    this.view.setUint16(this.offset, value, littleEndian);
    this.offset += 2;
  }

  private setInt32(value: number, littleEndian = false) {
    this.view.setInt32(this.offset, value, littleEndian);
    this.offset += 4;
  }

  private setUInt32(value: number, littleEndian = false) {
    this.view.setUint32(this.offset, value, littleEndian);
    this.offset += 4;
  }

  private setFloat64(value: number, littleEndian = false) {
    this.view.setFloat64(this.offset, value, littleEndian);
    this.offset += 8;
  }

  private expandBuffer(size: number) {
    const old = this.buffer;
    this.buffer = new Uint8Array(old.length + size);
    this.buffer.set(old);
    this.view = new DataView(this.buffer.buffer);
  }

  private reset() {
    this.buffer = new Uint8Array(0);
    this.view = new DataView(this.buffer.buffer);
    this.offset = 0;
  }
}

export const encode = (() => {
  const encoder = new Encoder();
  return (value: unknown) => encoder.encode(value);
})();

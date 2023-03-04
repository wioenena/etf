import { ETF_VERSION, SMALL_INTEGER_EXT } from "./Constants.ts";

export class Decoder {
  private buffer = new Uint8Array(0);
  private view = new DataView(this.buffer.buffer);
  private offset = 0;

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
    const decoded = this.nativeDecode(data);
    this.reset();
    return decoded;
  }

  /**
   * For recursive calls to decode.
   * @param data Data to decode.
   */
  private nativeDecode(data: Uint8Array) {
    const term = this.readUInt8();
    switch (term) {
      case SMALL_INTEGER_EXT:
        return this.readUInt8();
    }
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

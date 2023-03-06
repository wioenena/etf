export class Encoder {
  private buffer = new Uint8Array(0);
  private view = new DataView(this.buffer.buffer);
  private offset = 0;
  private readonly encoder = new TextEncoder();

  public encode(value: unknown) {
    this.write(value);
    const { buffer } = this;
    this.reset();
    return buffer;
  }

  public write(value: unknown) {
    const type = typeof value;
    switch (type) {
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  }

  private setInt8(value: number) {
    this.view.setInt8(this.offset++, value);
  }

  private setUInt8(value: number) {
    this.view.setUint8(this.offset++, value);
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

  private setBigUInt64(value: bigint, littleEndian = false) {
    this.view.setBigUint64(this.offset, value, littleEndian);
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

export const encode = (value: unknown) => new Encoder().encode(value);

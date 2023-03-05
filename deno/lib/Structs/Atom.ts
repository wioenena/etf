export class Atom {
  public constructor(
    public readonly value: string,
    public readonly isUTF8 = false,
  ) {
    if (value.length > 255) {
      throw new Error("Atom cannot be longer than 255 characters");
    }

    if (!isUTF8) {
      for (const char of value) {
        const charCode = char.charCodeAt(0);
        if (charCode > 0x7F || charCode < 0) {
          throw new Error("Atom must be latin-1 character-set");
        }
      }
    }
  }
}

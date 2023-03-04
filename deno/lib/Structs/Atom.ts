export class Atom {
  public constructor(
    public readonly value: string,
    public readonly type: AtomType = AtomType.ATOM,
  ) {
    if (value.length > 255) {
      throw new Error("Atom cannot be longer than 255 characters");
    }

    if (type === AtomType.ATOM || type === AtomType.SMALL_ATOM) {
      for (const char of value) {
        const charCode = char.charCodeAt(0);
        if (charCode > 0x7F || charCode < 0) {
          throw new Error("Atom must be latin-1 character-set");
        }
      }
    }
  }
}

export const enum AtomType {
  ATOM,
  SMALL_ATOM,
  ATOM_UTF8,
  SMALL_ATOM_UTF8,
}

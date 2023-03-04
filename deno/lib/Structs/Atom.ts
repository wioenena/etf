export class Atom {
  public constructor(
    public readonly value: string,
    public readonly term: AtomTerm = AtomTerm.ATOM,
  ) {
    if (value.length > 255) {
      throw new Error("Atom cannot be longer than 255 characters");
    }

    if (term === AtomTerm.ATOM || term === AtomTerm.SMALL_ATOM) {
      for (const char of value) {
        const charCode = char.charCodeAt(0);
        if (charCode > 0x7F || charCode < 0) {
          throw new Error("Atom must be latin-1 character-set");
        }
      }
    }
  }
}

export const enum AtomTerm {
  ATOM,
  SMALL_ATOM,
  ATOM_UTF8,
  SMALL_ATOM_UTF8,
}

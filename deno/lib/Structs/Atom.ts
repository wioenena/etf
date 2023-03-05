export class Atom {
  public constructor(
    public readonly value: string,
    public readonly term: AtomTerm = AtomTerm.ATOM_EXT,
  ) {
    if (value.length > 255) {
      throw new Error("Atom cannot be longer than 255 characters");
    }

    if (term === AtomTerm.ATOM_EXT || term === AtomTerm.SMALL_ATOM_EXT) {
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
  ATOM_EXT,
  SMALL_ATOM_EXT,
  ATOM_UTF8_EXT,
  SMALL_ATOM_UTF8_EXT,
}

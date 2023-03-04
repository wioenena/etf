import type { Atom } from "./Atom.ts";

export class Port {
  public constructor(
    public readonly node: Atom,
    public readonly id: number,
    public readonly creation: number,
  ) {}

  public toString() {
    return `#Port<${this.creation}.${this.id}>`;
  }
}

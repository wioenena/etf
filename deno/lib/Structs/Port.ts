import type { Atom } from "./Atom.ts";

export class Port {
  public constructor(
    public readonly node: Atom,
    public readonly id: number | bigint,
    public readonly creation: number,
    public readonly term: PortTerm = PortTerm.PORT_EXT,
  ) {}

  public toString() {
    return `#Port<${this.creation}.${this.id}>`;
  }
}

export const enum PortTerm {
  PORT_EXT,
  NEW_PORT_EXT,
  V4_PORT_EXT,
}

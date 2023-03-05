import type { Atom } from "./Atom.ts";

export class Pid {
  public constructor(
    public readonly atom: Atom,
    public readonly id: number,
    public readonly serial: number,
    public readonly creation: number,
    public readonly term: PidTerm = PidTerm.PID_EXT,
  ) {
  }

  public toString() {
    return `#PID<${this.creation}.${this.id}.${this.serial}>`;
  }
}

export const enum PidTerm {
  PID_EXT,
  NEW_PID_EXT,
}

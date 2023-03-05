import { Atom } from "./Atom.ts";

interface IToString {
  toString: () => string;
}

export interface IPort extends IToString {
  node: Atom;
  id: number | bigint;
  creation: number;
}

export interface IPid extends IToString {
  node: Atom;
  id: number;
  serial: number;
  creation: number;
}

export interface IReference extends IToString {
  node: Atom;
  id: number | number[];
  creation: number;
}

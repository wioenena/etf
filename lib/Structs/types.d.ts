interface IToString {
  toString: () => string;
}

export interface IPort extends IToString {
  node: string;
  id: number | bigint;
  creation: number;
}

export interface IPid extends IToString {
  node: string;
  id: number;
  serial: number;
  creation: number;
}

export interface IReference extends IToString {
  node: string;
  id: number | number[];
  creation: number;
}

export interface INewFun extends IToString {
  size: number;
  arity: number;
  uniq: string;
  index: number;
  numFree: number;
  module: string;
  oldIndex: number;
  oldUniq: number;
  pid: IPid;
  freeVars: unknown[];
}

export interface IExport extends IToString {
  module: string;
  func: string;
  arity: number;
}

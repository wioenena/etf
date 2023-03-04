export const ETF_VERSION = 131;
export const ATOM_CACHE_REF = 82;
export const SMALL_INTEGER_EXT = 97;
export const INTEGER_EXT = 98;
export const FLOAT_EXT = 99;
export const PORT_EXT = 102;
export const NEW_PORT_EXT = 89;
export const V4_PORT_EXT = 120;
export const PID_EXT = 103;
export const NEW_PID_EXT = 88;
export const SMALL_TUPLE_EXT = 104;
export const LARGE_TUPLE_EXT = 105;
export const MAP_EXT = 116;
export const NIL_EXT = 106;
export const STRING_EXT = 107;
export const LIST_EXT = 108;
export const BINARY_EXT = 109;
export const SMALL_BIG_EXT = 110;
export const LARGE_BIG_EXT = 111;
export const REFERENCE_EXT = 101;
export const NEW_REFERENCE_EXT = 114;
export const NEWER_REFERENCE_EXT = 90;
export const NEW_FUN_EXT = 112;
export const EXPORT_EXT = 113;
export const BIT_BINARY_EXT = 77;
export const NEW_FLOAT_EXT = 70;
export const ATOM_UTF8_EXT = 118;
export const SMALL_ATOM_UTF8_EXT = 119;
export const ATOM_EXT = 100;
export const SMALL_ATOM_EXT = 115;

export type AtomTerms =
  | typeof ATOM_EXT
  | typeof SMALL_ATOM_EXT
  | typeof ATOM_UTF8_EXT
  | typeof SMALL_ATOM_UTF8_EXT;

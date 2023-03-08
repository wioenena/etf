/**
 * Table of VERSION
 * @example
 * -------
 * |  1  |
 * -------
 * | 131 |
 * -------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#introduction} For more information
 */
export const ETF_VERSION = 131;

/**
 * Table of ATOM_CACHE_REF
 * @example
 * --------------------------------
 * | 1  |            1            |
 * --------------------------------
 * | 82 | AtomCacheReferenceIndex |
 * --------------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#atom_cache_ref} For more information
 */
export const ATOM_CACHE_REF = 82;

/**
 * Table of SMALL_INTEGER_EXT
 * @example
 * ------------
 * | 1  |  1  |
 * ------------
 * | 97 | Int |
 * ------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#small_integer_ext} For more information
 */
export const SMALL_INTEGER_EXT = 97;

/**
 * Table of INTEGER_EXT
 * @example
 * ------------
 * | 1  |  4  |
 * ------------
 * | 98 | Int |
 * ------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#integer_ext} For more information
 */
export const INTEGER_EXT = 98;

/**
 * Table of FLOAT_EXT
 * @example
 * ---------------------
 * | 1  |      31      |
 * ---------------------
 * | 99 | Float string |
 * ---------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#float_ext} For more information
 */
export const FLOAT_EXT = 99;

/**
 * Table of PORT_EXT
 * @example
 * -------------------------------
 * |  1  |   N  | 4  |     1     |
 * -------------------------------
 * | 102 | Node | ID | Creation  |
 * -------------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#port_ext} For more information
 */
export const PORT_EXT = 102;

/**
 * Table of NEW_PORT_EXT
 * @example
 * ------------------------------
 * | 1  |   N  | 4  |     4     |
 * ------------------------------
 * | 89 | Node | ID | Creation  |
 * ------------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#new_port_ext} For more information
 */
export const NEW_PORT_EXT = 89;

/**
 * Table of V4_PORT_EXT
 * @example
 * -------------------------------
 * |  1  |   N  | 8  |     4     |
 * -------------------------------
 * | 120 | Node | ID | Creation  |
 * -------------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#v4_port_ext} For more information
 */
export const V4_PORT_EXT = 120;

/**
 * Table of PID_EXT
 * @example
 * ---------------------------------------
 * |  1  |   N  | 4  |   4    |    1     |
 * ---------------------------------------
 * | 103 | Node | ID | Serial | Creation |
 * ---------------------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#pid_ext} For more information
 */
export const PID_EXT = 103;

/**
 * Table of NEW_PID_EXT
 * @example
 * ---------------------------------------
 * | 1  |   N  | 4  |    4   |     4     |
 * ---------------------------------------
 * | 88 | Node | ID | Serial | Creation  |
 * ---------------------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#new_pid_ext} For more information
 */
export const NEW_PID_EXT = 88;

/**
 * Table of SMALL_TUPLE_EXT
 * @example
 * --------------------------
 * |  1  |   1   |     N    |
 * --------------------------
 * | 104 | Arity | Elements |
 * --------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#small_tuple_ext} For more information
 */
export const SMALL_TUPLE_EXT = 104;

/**
 * Table of LARGE_TUPLE_EXT
 * @example
 * --------------------------
 * |  1  |   4   |     N    |
 * --------------------------
 * | 105 | Arity | Elements |
 * --------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#large_tuple_ext} For more information
 */
export const LARGE_TUPLE_EXT = 105;

/**
 * Table of MAP_EXT
 * @example
 * -----------------------
 * |  1  |   4   |   N   |
 * -----------------------
 * | 116 | Arity | Pairs |
 * -----------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#map_ext} For more information
 */
export const MAP_EXT = 116;

/**
 * Table of NIL_EXT
 * @example
 * -------
 * |  1  |
 * -------
 * | 106 |
 * -------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#nil_ext} For more information
 */
export const NIL_EXT = 106;

/**
 * Table of STRING_EXT
 * @example
 * -----------------------------
 * |  1  |   2    |   Length   |
 * -----------------------------
 * | 107 | Length | Characters |
 * -----------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#string_ext} For more information
 */
export const STRING_EXT = 107;

/**
 * Table of LIST_EXT
 * @example
 * ----------------------------------
 * |  1  |    4   |          |      |
 * ----------------------------------
 * | 108 | Length | Elements | Tail |
 * ----------------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#list_ext} For more information
 */
export const LIST_EXT = 108;

/**
 * Table of BINARY_EXT
 * @example
 * -------------------------
 * |  1  |    4   | Length |
 * -------------------------
 * | 109 | Length |  Data  |
 * -------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#binary_ext} For more information
 */
export const BINARY_EXT = 109;

/**
 * Table of SMALL_BIG_EXT
 * @example
 * -----------------------------------
 * |  1  | 1 |   1  |       N        |
 * -----------------------------------
 * | 110 | N | Sign | d(0)..d(n - 1) |
 * -----------------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#small_big_ext} For more information
 */
export const SMALL_BIG_EXT = 110;

/**
 * Table of LARGE_BIG_EXT
 * @example
 * -----------------------------------
 * |  1  | 4 |   1  |       N        |
 * -----------------------------------
 * | 111 | N | Sign | d(0)..d(n - 1) |
 * -----------------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#large_big_ext} For more information
 */
export const LARGE_BIG_EXT = 111;

/**
 * Table of REFERENCE_EXT
 * @example
 * ------------------------------
 * |  1  |   N  | 4  |     1    |
 * ------------------------------
 * | 101 | Node | ID | Creation |
 * ------------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#reference_ext} For more information
 */
export const REFERENCE_EXT = 101;

/**
 * Table of NEW_REFERENCE_EXT
 * @example
 * ------------------------------------------
 * |  1  |    2   |  N   |     1    |   N'  |
 * ------------------------------------------
 * | 114 | Length | Node | Creation | ID... |
 * ------------------------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#new_reference_ext} For more information
 */
export const NEW_REFERENCE_EXT = 114;

/**
 * Table of NEWER_REFERENCE_EXT
 * @example
 * ------------------------------------------
 * |  1  |    2   |  N   |     4    |   N'  |
 * ------------------------------------------
 * | 90  | Length | Node | Creation | ID... |
 * ------------------------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#newer_reference_ext} For more information
 */
export const NEWER_REFERENCE_EXT = 90;

/**
 * Table of NEW_FUN_EXT
 * @example
 * -----------------------------------------------------------------------------------------------
 * |  1  |  4   |   1   |  16  |   4   |    4    |   N1   |    N2    |   N3    | N4  |     N5    |
 * -----------------------------------------------------------------------------------------------
 * | 112 | Size | Arity | Uniq | Index | NumFree | Module | OldIndex | OldUniq | Pid | Free Vars |
 * -----------------------------------------------------------------------------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#new_fun_ext} For more information
 */
export const NEW_FUN_EXT = 112;

/**
 * Table of EXPORT_EXT
 * @example
 * -----------------------------------
 * |  1  |   N1   |    N2    |   N3  |
 * -----------------------------------
 * | 113 | Module | Function | Arity |
 * -----------------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#export_ext} For more information
 */
export const EXPORT_EXT = 113;

/**
 * Table of BIT_BINARY_EXT
 * @example
 * -------------------------------
 * | 1  |    4   |   1  | Length |
 * -------------------------------
 * | 77 | Length | Bits |  Data  |
 * -------------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#bit_binary_ext} For more information
 */
export const BIT_BINARY_EXT = 77;

/**
 * Table of NEW_FLOAT_EXT
 * -------------------
 * | 1  |      8     |
 * -------------------
 * | 70 | IEEE float |
 * -------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#new_float_ext} For more information
 */
export const NEW_FLOAT_EXT = 70;

/**
 * Table of ATOM_UTF8_EXT
 * ---------------------------
 * |  1  |    2   |  Length  |
 * ---------------------------
 * | 118 | Length | AtomName |
 * ---------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#atom_utf8_ext} For more information
 */
export const ATOM_UTF8_EXT = 118;

/**
 * Table of SMALL_ATOM_UTF8_EXT
 * ---------------------------
 * |  1  |    1   |  Length  |
 * ---------------------------
 * | 119 | Length | AtomName |
 * ---------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#small_atom_utf8_ext} For more information
 */
export const SMALL_ATOM_UTF8_EXT = 119;

/**
 * Table of ATOM_EXT
 * ---------------------------
 * |  1  |    2   |  Length  |
 * ---------------------------
 * | 100 | Length | AtomName |
 * ---------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#atom_ext} For more information
 */
export const ATOM_EXT = 100;

/**
 * Table of SMALL_ATOM_EXT
 * ---------------------------
 * |  1  |    1   |  Length  |
 * ---------------------------
 * | 115 | Length | AtomName |
 * ---------------------------
 * @see {@link https://www.erlang.org/doc/apps/erts/erl_ext_dist.html#small_atom_ext} For more information
 */
export const SMALL_ATOM_EXT = 115;

export type AnyPort =
  | typeof PORT_EXT
  | typeof NEW_PORT_EXT
  | typeof V4_PORT_EXT;

export type AnyPid = typeof PID_EXT | typeof NEW_PID_EXT;
export type AnyTuple = typeof SMALL_TUPLE_EXT | typeof LARGE_TUPLE_EXT;
export type AnyBigNumber = typeof SMALL_BIG_EXT | typeof LARGE_BIG_EXT;
export type AnyReference =
  | typeof REFERENCE_EXT
  | typeof NEW_REFERENCE_EXT
  | typeof NEWER_REFERENCE_EXT;
export type AnyAtom =
  | typeof ATOM_UTF8_EXT
  | typeof SMALL_ATOM_UTF8_EXT
  | typeof ATOM_EXT
  | typeof SMALL_ATOM_EXT;

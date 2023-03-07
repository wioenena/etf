# etf

External Term Format encoding and decoding for deno

### Support encoding and decoding terms

- [ ] ATOM_CACHE_REF (decode: x, encode: x)
- [x] SMALL_INTEGER_EXT (decode: ✓, encode: ✓)
- [x] INTEGER_EXT (decode: ✓, encode: ✓)
- [ ] FLOAT_EXT (decode: ✓, encode: x)
- [ ] PORT_EXT (decode: ✓, encode: x)
- [ ] NEW_PORT_EXT (decode: ✓, encode: x)
- [ ] V4_PORT_EXT (decode: ✓, encode: x)
- [ ] PID_EXT (decode: ✓, encode: x)
- [ ] NEW_PID_EXT (decode: ✓, encode: x)
- [ ] SMALL_TUPLE_EXT (decode: ✓, encode: x)
- [ ] LARGE_TUPLE_EXT (decode: ✓, encode: x)
- [x] MAP_EXT (decode: ✓, encode: ✓)
- [x] NIL_EXT (decode: ✓, encode: ✓)
- [ ] STRING_EXT (decode: ✓, encode: x)
- [x] LIST_EXT (decode: ✓, encode: ✓)
- [x] BINARY_EXT (decode: ✓, encode: ✓)
- [ ] SMALL_BIG_EXT (decode: ✓, encode: x)
- [x] LARGE_BIG_EXT (decode: ✓, encode: ✓)
- [ ] REFERENCE_EXT (decode: ✓, encode: x)
- [ ] NEW_REFERENCE_EXT (decode: ✓, encode: x)
- [ ] NEWER_REFERENCE_EXT (decode: ✓, encode: x)
- [ ] FUN_EXT (decode: ✓, encode: x)
- [ ] NEW_FUN_EXT (decode: ✓, encode: x)
- [ ] EXPORT_EXT (decode: ✓, encode: x)
- [ ] BIT_BINARY_EXT (decode: ✓, encode: x)
- [x] NEW_FLOAT_EXT (decode: ✓, encode: ✓)
- [x] ATOM_UTF8_EXT (decode: ✓, encode: ✓)
- [ ] SMALL_ATOM_UTF8_EXT (decode: ✓, encode: x)
- [x] ATOM_EXT (decode: ✓, encode: ✓)
- [ ] SMALL_ATOM_EXT (decode: ✓, encode: x)

### Atoms built for javascript

- [x] null (decode: ✓, encode: ✓)
- [x] undefined (decode: ✓, encode: ✓)
- [x] boolean (decode: ✓, encode: ✓)
- [x] NaN (decode: ✓, encode: ✓)
- [x] Infinity (decode: ✓ , encode: ✓)
- [ ] Symbol (maybe) (decode: x, encode: x)

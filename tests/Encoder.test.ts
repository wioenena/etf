import { Atom, decode, encode } from "../mod.ts";
import * as Constants from "../lib/Constants.ts";
import { assertEquals } from "https://deno.land/std@0.178.0/testing/asserts.ts";

Deno.test("Encoder", async (t) => {
  await t.step("encode null", () => {
    const encoded = encode(null);
    assertEquals(encoded[1], Constants.ATOM_EXT);
    assertEquals(decode(encoded), null);
  });

  await t.step("encode Atom", () => {
    const encodedWithUTF8 = encode(new Atom("my_atom", true));
    const encodedWithoutUTF8 = encode(new Atom("my_atom"));
    assertEquals(encodedWithUTF8[1], Constants.ATOM_UTF8_EXT);
    assertEquals(encodedWithoutUTF8[1], Constants.ATOM_EXT);
    assertEquals(decode(encodedWithUTF8), "my_atom");
    assertEquals(decode(encodedWithoutUTF8), "my_atom");
  });

  await t.step("encode undefined", () => {
    const encoded = encode(undefined);
    assertEquals(encoded[1], Constants.ATOM_EXT);
    assertEquals(decode(encoded), undefined);
  });

  await t.step("encode boolean", () => {
    const encodedTrue = encode(true);
    const encodedFalse = encode(false);
    assertEquals(encodedTrue[1], Constants.ATOM_EXT);
    assertEquals(encodedFalse[1], Constants.ATOM_EXT);
    assertEquals(decode(encodedTrue), true);
    assertEquals(decode(encodedFalse), false);
  });

  await t.step("encode number", () => {
    const encodedUInt8 = encode(255);
    const encodedInt32 = encode(65535);
    const encodeFloat = encode(Math.PI);
    const encodeLargeNumber = encode(Number.MAX_SAFE_INTEGER);
    assertEquals(encodedUInt8[1], Constants.SMALL_INTEGER_EXT);
    assertEquals(encodedInt32[1], Constants.INTEGER_EXT);
    assertEquals(encodeFloat[1], Constants.NEW_FLOAT_EXT);
    assertEquals(encodeLargeNumber[1], Constants.NEW_FLOAT_EXT);
    assertEquals(decode(encodedUInt8), 255);
    assertEquals(decode(encodedInt32), 65535);
    assertEquals(decode(encodeFloat), Math.PI);
    assertEquals(decode(encodeLargeNumber), Number.MAX_SAFE_INTEGER);
  });

  await t.step("encode bigint", () => {
    const encoded = encode(255n);
    assertEquals(encoded[1], Constants.LARGE_BIG_EXT);
    assertEquals(decode(encoded), 255n);
  });

  await t.step("encode string", () => {
    const encoded = encode("hello");
    assertEquals(encoded[1], Constants.BINARY_EXT);
    assertEquals(decode(encoded), "hello");
  });

  await t.step("encode array", () => {
    const encoded = encode([1, 2, 3]);
    assertEquals(encoded[1], Constants.LIST_EXT);
    assertEquals(decode(encoded), [1, 2, 3]);
  });

  await t.step("encode object", () => {
    const encoded = encode({ Hello: "World", number: 1, array: [1, 2, 3] });
    assertEquals(encoded[1], Constants.MAP_EXT);
    assertEquals(decode(encoded), {
      Hello: "World",
      number: 1,
      array: [1, 2, 3],
    });
  });

  await t.step("encode nil ext", () => {
    const encoded = encode([]);
    assertEquals(encoded[1], Constants.NIL_EXT);
    assertEquals(decode(encoded), []);
  });

  await t.step("encode NaN", () => {
    const encoded = encode(NaN);
    assertEquals(encoded[1], Constants.ATOM_EXT);
    assertEquals(decode(encoded), NaN);
  });

  await t.step("encode Infinity", () => {
    const encoded = encode(Infinity);
    assertEquals(encoded[1], Constants.ATOM_EXT);
    assertEquals(decode(encoded), Infinity);
  });
});

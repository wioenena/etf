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
});

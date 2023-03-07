import { decode, encode } from "../mod.ts";
import * as Constants from "../lib/Constants.ts";
import { assertEquals } from "https://deno.land/std@0.178.0/testing/asserts.ts";

Deno.test("Encoder", async (t) => {
  await t.step("encode null", () => {
    const encoded = encode(null);
    assertEquals(encoded[1], Constants.ATOM_EXT);
    assertEquals(decode(encoded), null);
  });
});

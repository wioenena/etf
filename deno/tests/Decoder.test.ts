import { decode } from "../mod.ts";
import {
  dirname,
  fromFileUrl,
  join,
} from "https://deno.land/std@0.178.0/path/mod.ts";
import {
  assert,
  assertThrows,
} from "https://deno.land/std@0.178.0/testing/asserts.ts";

const __dirname = dirname(fromFileUrl(import.meta.url));
const encoded_data_dir = join(__dirname, "..", "..", "encoded_data");

Deno.test("Decoder", async (t) => {
  await t.step("decode with invalid ETF version", () => {
    assertThrows(() => decode(new Uint8Array([0])), Error);
  });

  await t.step("decode SMALL_INTEGER_EXT", () => {
    const encoded = Deno.readFileSync(
      join(encoded_data_dir, "SMALL_INTEGER_EXT"),
    );

    const decoded = decode(encoded);
    assert(decoded === 255);
  });
});

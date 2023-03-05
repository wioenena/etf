import {
  dirname,
  fromFileUrl,
  join,
} from "https://deno.land/std@0.178.0/path/mod.ts";
import {
  assert,
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.178.0/testing/asserts.ts";
import { IPid, IPort, IReference } from "../lib/Structs/types.d.ts";

import { decode } from "../mod.ts";

const __dirname = dirname(fromFileUrl(import.meta.url));
const encoded_data_dir = join(__dirname, "..", "..", "encoded_data");

function getEncodedData(filename: string): Uint8Array {
  return Deno.readFileSync(join(encoded_data_dir, filename));
}

Deno.test("Decoder", async (t) => {
  await t.step("decode with invalid ETF version", () => {
    assertThrows(() => decode(new Uint8Array([0])), Error);
  });

  await t.step("decode SMALL_INTEGER_EXT", () => {
    const encoded = getEncodedData("SMALL_INTEGER_EXT");
    const decoded = decode(encoded);
    assertEquals(decoded, 255);
  });

  await t.step("decode INTEGER_EXT", () => {
    const encoded = getEncodedData("INTEGER_EXT");
    const decoded = decode(encoded);
    assertEquals(decoded, 2 ** 10);
  });

  await t.step("decode FLOAT_EXT", () => {
    const encoded = getEncodedData("FLOAT_EXT");
    const decoded = decode(encoded);
    assertEquals(decoded, 3.14);
  });

  await t.step("decode PORT_EXT", () => {
    const encoded = getEncodedData("PORT_EXT");
    const decoded = decode(encoded) as IPort;

    assertEquals(decoded.toString(), "#Port<0.5>");
  });

  await t.step("decode NEW_PORT_EXT", () => {
    const encoded = getEncodedData("NEW_PORT_EXT");
    const decoded = decode(encoded) as IPort;

    assertEquals(decoded.toString(), "#Port<0.5>");
  });

  await t.step("decode V4_PORT_EXT", () => {
    const encoded = getEncodedData("V4_PORT_EXT");
    const decoded = decode(encoded) as IPort;

    assertEquals(decoded.toString(), "#Port<0.5>");
    assertEquals(decoded.id, 5n);
  });

  await t.step("decode PID_EXT", () => {
    const encoded = getEncodedData("PID_EXT");
    const decoded = decode(encoded) as IPid;
    assertEquals(decoded.toString(), "#PID<0.106.0>");
  });

  await t.step("decode NEW_PID_EXT", () => {
    const encoded = getEncodedData("NEW_PID_EXT");
    const decoded = decode(encoded) as IPid;
    assertEquals(decoded.toString(), "#PID<0.106.0>");
  });

  await t.step("decode SMALL_TUPLE_EXT", () => {
    console.log("TODO: Test SMALL_TUPLE_EXT");
  });

  await t.step("decode LARGE_TUPLE_EXT", () => {
    console.log("TODO: Test LARGE_TUPLE_EXT");
  });

  await t.step("decode MAP_EXT", () => {
    console.log("TODO: Test MAP_EXT");
  });

  await t.step("decode NIL_EXT", () => {
    const encoded = getEncodedData("NIL_EXT");
    const decoded = decode(encoded) as never[];
    assert(Array.isArray(decoded));
    assertEquals(decoded.length, 0);
  });

  await t.step("decode STRING_EXT", () => {
    const encoded = getEncodedData("STRING_EXT");
    const decoded = decode(encoded) as unknown as string;
    assertEquals(decoded, "Hello World");
  });

  await t.step("decode LIST_EXT", () => {
    console.log("TODO: Test LIST_EXT");
  });

  await t.step("decode BINARY_EXT", () => {
    const encoded = getEncodedData("BINARY_EXT");
    const decoded = decode(encoded) as string;
    assertEquals(decoded, "Hello World");
  });

  await t.step("decode SMALL_BIG_EXT", () => {
    const encodedPositive = getEncodedData("SMALL_BIG_EXT");
    const encodedNegative = getEncodedData("NEGATIVE_SMALL_BIG_EXT");
    assertEquals(decode(encodedPositive), 2n ** 32n);
    assertEquals(decode(encodedNegative), -(2n ** 32n));
  });

  await t.step("decode LARGE_BIG_EXT", () => {
    const encodedPositive = getEncodedData("LARGE_BIG_EXT");
    const encodedNegative = getEncodedData("NEGATIVE_LARGE_BIG_EXT");
    assertEquals(decode(encodedPositive), 2n ** 10000n);
    assertEquals(decode(encodedNegative), -(2n ** 10000n));
  });

  await t.step("decode REFERENCE_EXT", () => {
    const encoded = getEncodedData("REFERENCE_EXT");
    const decoded = decode(encoded) as IReference;
    assertEquals(decoded.toString(), "#Reference<0.0.0.3>");
  });

  await t.step("decode NEW_REFERENCE_EXT", () => {
    const encoded = getEncodedData("NEW_REFERENCE_EXT");
    const decoded = decode(encoded) as IReference;

    assertEquals(decoded.toString(), "#Reference<0.21204790.195297282.152334>");
  });

  await t.step("decode NEWER_REFERENCE_EXT", () => {
    const encoded = getEncodedData("NEWER_REFERENCE_EXT");
    const decoded = decode(encoded) as IReference;

    assertEquals(decoded.toString(), "#Reference<0.21204790.195297282.152334>");
  });

  await t.step("decode NEW_FUN_EXT", () => {
    console.log("TODO: Test NEW_FUN_EXT");
  });

  await t.step("decode EXPORT_EXT", () => {
    console.log("TODO: Test EXPORT_EXT");
  });

  await t.step("decode BIT_BINARY_EXT", () => {
    console.log("TODO: Test BIT_BINARY_EXT");
  });

  await t.step("decode NEW_FLOAT_EXT", () => {
    console.log("TODO: Test NEW_FLOAT_EXT");
  });

  await t.step("decode ATOM_UTF8_EXT", () => {
    console.log("TODO: Test ATOM_UTF8_EXT");
  });

  await t.step("decode SMALL_ATOM_UTF8_EXT", () => {
    console.log("TODO: Test SMALL_ATOM_UTF8_EXT");
  });

  await t.step("decode ATOM_EXT", () => {
    console.log("TODO: Test ATOM_EXT");
  });

  await t.step("decode SMALL_ATOM_EXT", () => {
    console.log("TODO: Test SMALL_ATOM_EXT");
  });
});

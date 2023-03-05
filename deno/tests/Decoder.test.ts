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
import { Port, PortTerm } from "../lib/Structs/Port.ts";
import { Pid, PidTerm } from "../lib/Structs/Pid.ts";

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
    assert(decoded === 255);
  });

  await t.step("decode INTEGER_EXT", () => {
    const encoded = getEncodedData("INTEGER_EXT");
    const decoded = decode(encoded);
    assert(decoded === 2 ** 10);
  });

  await t.step("decode FLOAT_EXT", () => {
    const encoded = getEncodedData("FLOAT_EXT");
    const decoded = decode(encoded);
    assert(decoded === 3.14);
  });

  await t.step("decode PORT_EXT", () => {
    const encoded = getEncodedData("PORT_EXT");
    const decoded = decode(encoded) as Port;

    assert(decoded.toString() === "#Port<0.5>");
    assert(decoded.term === PortTerm.PORT_EXT);
  });

  await t.step("decode NEW_PORT_EXT", () => {
    const encoded = getEncodedData("NEW_PORT_EXT");
    const decoded = decode(encoded) as Port;

    assert(decoded.toString() === "#Port<0.5>");
    assert(decoded.term === PortTerm.NEW_PORT_EXT);
  });

  await t.step("decode V4_PORT_EXT", () => {
    const encoded = getEncodedData("V4_PORT_EXT");
    const decoded = decode(encoded) as Port;

    assert(decoded.toString() === "#Port<0.5>");
    assert(decoded.term === PortTerm.V4_PORT_EXT);
    assert(decoded.id === 5n);
  });

  await t.step("decode PID_EXT", () => {
    const encoded = getEncodedData("PID_EXT");
    const decoded = decode(encoded) as Pid;
    assert(decoded.toString() === "#PID<0.106.0>");
    assert(decoded.term === PidTerm.PID_EXT);
  });

  await t.step("decode NEW_PID_EXT", () => {
    const encoded = getEncodedData("NEW_PID_EXT");
    const decoded = decode(encoded) as Pid;
    assert(decoded.toString() === "#PID<0.106.0>");
    assert(decoded.term === PidTerm.NEW_PID_EXT);
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
    assert(decoded.length === 0 && Array.isArray(decoded));
  });

  await t.step("decode STRING_EXT", () => {
    const encoded = getEncodedData("STRING_EXT");
    const decoded = decode(encoded) as unknown as string;
    assert(decoded === "Hello World");
  });

  await t.step("decode LIST_EXT", () => {
    console.log("TODO: Test LIST_EXT");
  });

  await t.step("decode BINARY_EXT", () => {
    console.log("TODO: Test BINARY_EXT");
  });

  await t.step("decode SMALL_BIG_EXT", () => {
    console.log("TODO: Test SMALL_BIG_EXT");
  });

  await t.step("decode LARGE_BIG_EXT", () => {
    console.log("TODO: Test LARGE_BIG_EXT");
  });

  await t.step("decode REFERENCE_EXT", () => {
    console.log("TODO: Test REFERENCE_EXT");
  });

  await t.step("decode NEW_REFERENCE_EXT", () => {
    console.log("TODO: Test NEW_REFERENCE_EXT");
  });

  await t.step("decode NEWER_REFERENCE_EXT", () => {
    console.log("TODO: Test NEWER_REFERENCE_EXT");
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

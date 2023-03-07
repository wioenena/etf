# ETF

## Import

```ts
import { decode, encode } from "https://deno.land/x/etf@1.0.1/mod.ts";
import { assertEquals } from "https://deno.land/std@0.178.0/testing/asserts.ts";

const data = ["Hello", "World"];
const encodedData = encode(data);
const decodedData = decode(encodedData);

assertEquals(decodedData, data);
```

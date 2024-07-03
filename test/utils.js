import { compareExact, compareSparse } from "../src/utils.js";
import assert from "node:assert/strict";
import { test } from "node:test";

test(`compareExact() of equal objects`, () => {
  const template = { shop: true, bookable: false };
  const obj = { shop: true, bookable: false };

  assert.ok(compareExact(template, obj));
});

// TODO build out tests

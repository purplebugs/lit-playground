import { compareExact, compareSparse } from "../src/utils.js";
import assert from "node:assert/strict";
import { test } from "node:test";

test(`compareExact() of equal objects - return true`, () => {
  const template = {
    private: false,
    public: true,
  };
  const obj = { private: false, public: true };

  assert.equal(compareExact(template, obj), true);
});

test(`compareExact() of non equal objects - return false`, () => {
  const template = {
    private: false,
    public: true,
  };
  const obj = { private: true, public: true };

  assert.equal(compareExact(template, obj), false);
});

test(`compareSparse() contains equal key, values - return true`, () => {
  const template = {
    bookable: true,
    shop: true,
  };

  const obj = {
    alpacaSales: true,
    alpacaWalking: true,
    bookable: true,
    shop: true,
    overnightStay: true,
    studServices: false,
  };

  assert.equal(compareSparse(template, obj), false);
});

test(`compareSparse() contains non-equal key, values - return false`, () => {
  const template = {
    bookable: true,
    shop: true,
  };

  const obj = {
    alpacaSales: true,
    alpacaWalking: true,
    bookable: false,
    shop: true,
    overnightStay: true,
    studServices: false,
  };

  assert.equal(compareSparse(template, obj), false);
});

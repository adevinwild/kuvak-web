/* eslint-disable no-undef */
// config/jest/setupTests.js
import "@testing-library/jest-dom";

global.ResizeObserver = require("resize-observer-polyfill");

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
});

Object.defineProperty(URL, "createObjectURL", {
  writable: true,
  value: jest.fn(),
});

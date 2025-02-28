// Este archivo debe guardarse como frontend/src/tests/setup.js
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extender las funciones de expect con los matchers de RTL
expect.extend(matchers);

// Limpiar después de cada test
afterEach(() => {
  cleanup();
});

// Mock global para localStorage
global.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
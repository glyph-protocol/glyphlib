#!/usr/bin/env node

import { encodeLEB128 } from '../src/leb128.js';

// Get the number to encode from the command-line arguments
const value = BigInt(process.argv[2]);

if (isNaN(value)) {
  console.error("Please provide a valid number to encode.");
  process.exit(1);
}

// Encode the value using LEB128
const encodedBytes = encodeLEB128(value);

// Output the encoded bytes as a space-separated string
console.log(encodedBytes.map(byte => byte.toString(16).padStart(2, '0')).join(' '));


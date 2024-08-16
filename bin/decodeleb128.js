#!/usr/bin/env node

import { decodeLEB128 } from '../src/leb128.js'

// Helper function to decode a payload into an array of integers using LEB128
function decodeLEB128Integers(payload) {
  const integers = []
  let i = 0

  while (i < payload.length) {
    const { n, len } = decodeLEB128(payload.slice(i))
    integers.push(n)
    i += len
  }

  return integers
}

// Get the hex-encoded bytes from the command-line arguments
const hexBytes = process.argv.slice(2)[0]
console.log('hexBytes', hexBytes)

if (hexBytes.length === 0) {
  console.error('Please provide a valid hex byte sequence to decode.')
  process.exit(1)
}

// Convert the hex string input to a byte array
function hexStringToByteArray(hexString) {
  // Ensure the hex string has an even number of characters
  if (hexString.length % 2 !== 0) {
    throw new Error('Invalid hex string')
  }

  const byteArray = []

  for (let i = 0; i < hexString.length; i += 2) {
    // Parse each pair of characters as a byte
    const byte = parseInt(hexString.slice(i, i + 2), 16)
    byteArray.push(byte)
  }

  return byteArray
}

try {
  // Decode the byte array into an array of integers
  const integers = decodeLEB128Integers(hexStringToByteArray(hexBytes))

  // Print the decoded integers
  console.log('Decoded integers:')
  integers.forEach((integer, index) => {
    console.log(`Integer ${index + 1}: ${integer.toString()}`)
  })
} catch (error) {
  console.error('Failed to decode LEB128:', error.message)
  process.exit(1)
}

#!/usr/bin/env node

import { Runestone } from '../src/runestones.js' // Adjust the path as necessary

// Function to generate the hex for 100 premine
function generateHexForPremine (runeName) {
  const json = {
    name: runeName,
    glyph: 100,
    amount: 0, // Assuming 1 for the example, adjust if necessary
    cap: 0, // Assuming 1 for the example, adjust if necessary
    premine: 1
  }

  const runestone = Runestone.create(json, 'etch')
  const hex = runestone.encipher().toString('hex')

  return hex
}

// Read the rune name from the command line arguments
const args = process.argv.slice(2)
if (args.length !== 1) {
  console.error('Usage: generate_hex <ALL_CAPS_NAME>')
  process.exit(1)
}

const runeName = args[0]

if (runeName !== runeName.toUpperCase()) {
  console.error('Error: The name must be in ALL CAPS.')
  process.exit(1)
}

const hex = generateHexForPremine(runeName)
console.log(hex)

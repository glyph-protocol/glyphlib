#!/usr/bin/env node

import { Runestone } from '../src/runestones.js' // Adjust the path as necessary

// Function to decode the hex string and output JSON
function decodeHexString(hexString) {
  try {
    const runestoneOption = Runestone.decipher(hexString, 0)
    console.log(runestoneOption)

    if (runestoneOption.isNone()) {
      throw new Error('Invalid or non-decodable hex string.')
    }

    const runestone = runestoneOption.value()

    // Convert Runestone object to JSON
    const json = {
      edicts: runestone.edicts.map(edict => ({
        id: {
          block: edict.id.block,
          idx: edict.id.idx
        },
        amount: edict.amount.toString(),
        output: edict.output
      })),
      etching: runestone.etching.isSome()
        ? {
          divisibility: runestone.etching.value().divisibility.isSome() ? runestone.etching.value().divisibility.value() : null,
          premine: runestone.etching.value().premine.isSome() ? runestone.etching.value().premine.value() : null,
          rune: runestone.etching.value().rune.isSome() ? runestone.etching.value().rune.value().toString() : null,
          spacers: runestone.etching.value().spacers.isSome() ? runestone.etching.value().spacers.value() : null,
          symbol: runestone.etching.value().symbol.isSome() ? runestone.etching.value().symbol.value() : null,
          terms: runestone.etching.value().terms.isSome()
            ? {
              amount: runestone.etching.value().terms.value().amount,
              cap: runestone.etching.value().terms.value().cap,
              height: {
                start: runestone.etching.value().terms.value().height.start.isSome() ? runestone.etching.value().terms.value().height.start.value() : null,
                end: runestone.etching.value().terms.value().height.end.isSome() ? runestone.etching.value().terms.value().height.end.value() : null
              },
              offset: {
                start: runestone.etching.value().terms.value().offset.start.isSome() ? runestone.etching.value().terms.value().offset.start.value() : null,
                end: runestone.etching.value().terms.value().offset.end.isSome() ? runestone.etching.value().terms.value().offset.end.value() : null
              }
            }
            : null,
          turbo: runestone.etching.value().turbo
        }
        : null,
      mint: runestone.mint.isSome()
        ? {
          block: runestone.mint.value().block,
          idx: runestone.mint.value().idx
        }
        : null,
      pointer: runestone.pointer.isSome() ? runestone.pointer.value() : null
    }

    return JSON.stringify(json, null, 2)
  } catch (error) {
    console.error('Error decoding hex string:', error.message)
    process.exit(1)
  }
}

// Read the hex string from the command line arguments
const args = process.argv.slice(2)
if (args.length !== 1) {
  console.error('Usage: decode_hex <HEX_STRING>')
  process.exit(1)
}

const hexString = args[0]
const jsonOutput = decodeHexString(hexString)
console.log(jsonOutput)

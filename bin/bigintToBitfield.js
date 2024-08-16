#!/usr/bin/env node

// Import the necessary module for command-line arguments
import readline from 'readline'

// Function to convert BigInt to bitfield
function bigintToBitfield(input) {
    const bigintValue = BigInt(input) // Convert input to BigInt
    let bitfield = ''

    // Convert BigInt to binary string
    let binaryString = bigintValue.toString(2)

    // Ensure the binary string has the correct length by removing leading '0' characters
    binaryString = binaryString.replace(/^0+/, '')

    // Print the binary string as the bitfield
    bitfield = binaryString

    return bitfield
}

// Create an interface for reading input from the command line
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Ask the user for the BigInt input
rl.question('Enter a BigInt: ', (input) => {
    try {
        // Translate the BigInt input to a bitfield
        const bitfield = bigintToBitfield(input)
        console.log(`Bitfield: ${bitfield}`)
    } catch (error) {
        console.error('Invalid input. Please enter a valid BigInt.')
    } finally {
        // Close the interface
        rl.close()
    }
})

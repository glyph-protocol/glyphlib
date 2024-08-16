/**
 * Prepends a '0' to an odd character length word to ensure it has an even number of characters.
 * @param {string} word - The input word.
 * @returns {string} - The word with a leading '0' if it's an odd character length; otherwise, the original word.
 */
export const zero2 = (word) => {
    if (word.length % 2 === 1) {
        return '0' + word;
    } else {
        return word;
    }
}

/**
 * Converts an array of numbers to a hexadecimal string representation.
 * @param {number[]} msg - The input array of numbers.
 * @returns {string} - The hexadecimal string representation of the input array.
 */
export const toHex = (msg) => {
    let res = '';
    for (let i = 0; i < msg.length; i++) {
        res += zero2(msg[i].toString(16));
    }
    return res;
}

export function chunks(bin, chunkSize) {

    const chunks = [];
    let offset = 0;

    while (offset < bin.length) {
        // Use Buffer.slice to create a chunk. This method does not copy the memory;
        // it creates a new Buffer that references the original memory.
        const chunk = bin.slice(offset, offset + chunkSize);
        chunks.push(chunk);
        offset += chunkSize;
    }

    return chunks;
}

export function toPushData(data) {
    const res = [];

    const dLen = data.length;
    if (dLen < 0x4c) {
        const dLenBuff = Buffer.alloc(1);
        dLenBuff.writeUInt8(dLen);
        res.push(dLenBuff);
    } else if (dLen <= 0xff) {
        // OP_PUSHDATA1
        res.push(Buffer.from('4c', 'hex'));

        const dLenBuff = Buffer.alloc(1);
        dLenBuff.writeUInt8(dLen);
        res.push(dLenBuff);
    } else if (dLen <= 0xffff) {
        // OP_PUSHDATA2
        res.push(Buffer.from('4d', 'hex'));

        const dLenBuff = Buffer.alloc(2);
        dLenBuff.writeUint16LE(dLen);
        res.push(dLenBuff);
    } else {
        // OP_PUSHDATA4
        res.push(Buffer.from('4e', 'hex'));

        const dLenBuff = Buffer.alloc(4);
        dLenBuff.writeUint32LE(dLen);
        res.push(dLenBuff);
    }

    res.push(data);

    return Buffer.concat(res);
}


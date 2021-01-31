export function* chunk(collection: Array<any>, size: number): Generator<any[], void, any[]> {
    for (let i = 0; i < collection.length; i += size) {
        yield collection.slice(i, i + size);
    }
}

export function chunkArray<T>(myArray: Array<T>, chunk_size: number): T[][] {   
    const copiedArray = [...myArray]
    const chunked = [];

    while (copiedArray?.length) {
        chunked.push(copiedArray.splice(0, chunk_size));
    }

    return chunked;
}

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
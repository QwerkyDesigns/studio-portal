export function batch<T>(batchable: T[], batchSize = 5): T[][] {
    const batches: T[][] = [];
    let currentBatch: T[] = [];

    for (let i = 0; i < batchable.length; i++) {
        currentBatch.push(batchable[i]);
        if (currentBatch.length === batchSize || i === batchable.length - 1) {
            batches.push(currentBatch);
            currentBatch = [];
        }
    }

    return batches;
}

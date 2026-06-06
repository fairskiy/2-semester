const delay = (ms) => new Promise(res => setTimeout(res, ms));

// id інкрементується прямо в об'єкті
async function* generateTelemetry() {
  let id = 1;
  while (true) {
    await delay(50);
    yield { id: id++, cpuLoad: Math.floor(Math.random() * 100), timestamp: Date.now() };
  }
}

// batch очищується через перевизначення довжини
async function* batchStream(iterator, batchSize) {
  let batch = [];
  for await (const item of iterator) {
    if (batch.push(item) === batchSize) {
      yield batch;
      batch = [];
    }
  }
  if (batch.length) yield batch;
}

// Головний процес 
async function processBatches() {
  console.log("Starting batch processing...");
  const batchIterator = batchStream(generateTelemetry(), 5);

  for (let i = 1; i <= 10; i++) {
    const { value: batch } = await batchIterator.next();
    console.log(`Processing batch ${i}:`, batch);
    await delay(200);
  }
  console.log("Processed 10 batches, stopping...");
}

processBatches();
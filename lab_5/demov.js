import { asyncMapCallback, asyncMapPromise, asyncMapAbortable } from "./mapper.js";

// Компактна асинхронна функція множення
const multiplyAsync = (item, cb) => setTimeout(() => cb(null, item * 2), 1000);
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function run() {
  // 1. Демонстрація Callback 
  console.log("Starting Callback Map...");
  asyncMapCallback([1, 2, 3], multiplyAsync, (err, res) => {
    err ? console.error("Callback Error:", err) : console.log("Callback Result:", res);
  });

  await sleep(1200); // Чекаємо завершення першого тесту

  // 2. Демонстрація Promise 
  console.log("Starting Promise Map...");
  try {
    console.log("Promise Result:", await asyncMapPromise([10, 20, 30], multiplyAsync));
  } catch (err) {
    console.error("Promise Error:", err);
  }

  // 3. Демонстрація Abortable 
  console.log("Starting Abortable Map...");
  const controller = new AbortController();
  setTimeout(() => { console.log("Sending abort..."); controller.abort(); }, 500);

  try {
    const res = await asyncMapAbortable([100, 200, 300], multiplyAsync, controller.signal);
    console.log("Abortable Result (should not happen):", res);
  } catch (err) {
    console.error("Caught abort:", err.message);
  }
}

run();
import { log } from "./logger.js";

class UserService {
  constructor() {
    const configs = {
      getUser: { level: "INFO", output: "console", formatter: (d) => `CUSTOM LOG -> ${d.name} is executing!` },
      loadData: { level: "INFO", output: "file", json: true },
      makeError: { level: "ERROR", output: "service", onlyErrors: true }
    };

    for (const [method, config] of Object.entries(configs)) {
      this[method] = log(config)(this[method].bind(this), method);
    }
  }

  getUser(name) {
    return { name, age: 18 };
  }

  async loadData() {
    await new Promise(res => setTimeout(res, 500));
    return "Data loaded";
  }

  makeError() {
    throw new Error("Test error");
  }
}

// Запуск тесту
const service = new UserService();

async function run() {
  console.log(service.getUser("Ilya"));
  await service.loadData();
  
  try { service.makeError(); } 
  catch { console.log("Error saved to service.txt"); }
}

run();
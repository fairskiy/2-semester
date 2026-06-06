import fs from "fs";

// Карта для швидкого визначення куди писати лог 
const logTargets = {
  console: (msg) => console.log(msg),
  file: (msg) => fs.appendFileSync("logs.txt", msg + "\n"),
  service: (msg) => fs.appendFileSync("service.txt", msg + "\n")
};

export function log(options = {}) {
  const { level = "INFO", output = "console", json = false, onlyErrors = false, formatter } = options;
  const isErrorConfig = level === "ERROR" || onlyErrors;

  return function (fn, name) {
    return async function (...args) {
      const start = Date.now();
      const time = new Date().toISOString();

      // Допоміжний метод для формування та відправки логу
      const emitLog = (type, extraData) => {
        if (type !== "ERROR" && isErrorConfig) return; // Пропускаємо звичайні логи, якщо налаштовано лише на помилки

        const base = { time, level: type, name, args, ...extraData };
        let msg = formatter ? formatter(base) : json ? JSON.stringify(base) : "";

        if (!msg) {
          msg = type === "ERROR" 
            ? `[${time}] [ERROR] ${name}: ${base.error}`
            : `[${time}] [${type}] ${name} ${extraData.result !== undefined ? `finished: ${JSON.stringify(extraData.result)} | Time: ${extraData.time}ms` : `called with: ${JSON.stringify(args)}`}`;
        }

        (logTargets[output] || logTargets.console)(msg);
      };

      // 1. Лог перед початком виконання
      emitLog(level, {});

      try {
        // 2. Виконуємо функцію 
        const result = await fn.apply(this, args);
        
        // 3. Лог успішного завершення
        emitLog(level, { result, time: Date.now() - start });
        return result;
      } catch (error) {
        // 4. Лог помилки
        emitLog("ERROR", { error: error.message });
        throw error;
      }
    };
  };
}
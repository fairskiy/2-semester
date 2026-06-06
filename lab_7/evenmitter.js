const EventEmitter = require('events');
const smarthub = new EventEmitter();


const logger = (temp) => console.log(`[Logger] Temperature is ${temp}°C`);

const conditioner = (temp) => temp > 25 && console.log("[Conditioner] It's too hot! Turning on the AC.");

const fireAlarm = (temp) => {
  if (temp > 60) {
    console.log("[FireAlarm] Alert! Temperature > 60°C! Activating fire alarm and suppression system.");
    smartHub.off('temperatureChange', conditioner);
  }
};

// 1. Реєстрація 
smartHub.on('temperatureChange', logger);
smartHub.on('temperatureChange', conditioner);
smartHub.on('temperatureChange', fireAlarm);

// 2. Симуляція дня через масив та цикл
console.log("Starting a day");

const schedule = [
  ["Morning", 22],
  ["Afternoon", 28],
  ["Evening", 65],
  ["A bit later in evening...", 90]
];

schedule.forEach(([time, temp]) => {
  console.log(`${time}:`);
  smartHub.emit('temperatureChange', temp);
});
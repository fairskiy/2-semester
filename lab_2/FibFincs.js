import { fibonacciGenerator, asyncFibonacciGenerator } from 'lab_1';

// 1. Синхронна генерація 
const fibGen = fibonacciGenerator();
for (let i = 0; i < 7; i++) {
    console.log(fibGen.next().value);
}

// 2. Асинхронна генерація 
(async () => {
    console.log("Початок генерації чисел ");
    
    for await (const num of asyncFibonacciGenerator()) {
        console.log(`Отримано число: ${num}`);
    }
    
    console.log("Виконано генерацію чисел ");
})();
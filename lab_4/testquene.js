import { BiDirectionalPriorityQueue, Mode } from "./queue.js";

const queue = new BiDirectionalPriorityQueue();

// 1. Масове додавання елементів
const tasks = [["Task A", 10], ["Task B", 20], ["Task C", 30], ["Task D", 40]];
tasks.forEach(([task, priority]) => queue.enqueue(task, priority));

// 2. Швидка перевірка 
Object.values(Mode).forEach(mode => console.log(`${mode}: ${queue.peek(mode)}`));

console.log('---');

// 3. Тест видалення
console.log(queue.dequeue(Mode.HIGHEST)); // Task D
console.log(queue.peek(Mode.HIGHEST));    // Task C

console.log(queue.dequeue(Mode.OLDEST));  // Task A
console.log(queue.peek(Mode.OLDEST));     // Task B
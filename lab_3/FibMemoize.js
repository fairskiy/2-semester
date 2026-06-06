import { memoize } from "./memoize.js";

// Компактна рекурсивна функція 
const slowFib = (n) => (n <= 1 ? n : slowFib(n - 1) + slowFib(n - 2));

const fastFib = memoize(slowFib, { limit: 50, strategy: 'LRU' });

// порахує рекурсивно та збереже в кеш
console.log(fastFib(40)); 

// миттєво дістане значення з кешу
console.log(fastFib(40));
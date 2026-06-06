 export function* fibonacciGenerator(){
    let curr = 0, next = 1;
    while (true) {
        yield curr;
        [curr, next] = [next, curr + next];
    }
}
/*const fibGen = fibonacciGenerator();
console.log(fibGen.next().value); // 0
console.log(fibGen.next().value); // 1
console.log(fibGen.next().value); // 2
console.log(fibGen.next().value); // 3  
console.log(fibGen.next().value); // 5
console.log(fibGen.next().value); // 8
*/
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function* asyncFibonacciGenerator(count, delay) {
    let curr = 0, next = 1; 
    for (let i = 0; i < count; i++) {
        await sleep(delay);
        yield curr;
        [curr, next] = [next, curr + next];
    }
}
/*

    for await         console.log
    

asyncFibonacciGenerator(10, 500);
*/
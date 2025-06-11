
export function execute(...args: any[]) {
    const fn = args.pop();
    if (typeof fn !== 'function') {
        console.error('\nLast argument must be a function\n');
        process.exit(1);
    } else if (args.length < fn.length) {
        console.error('\nFunction \x1b[96;1m' + fn.name + '\x1b[0m expects \x1b[32;1m' + fn.length + '\x1b[0m arguments, but received only \x1b[31;1m' + args.length + '\x1b[0m\n');
        process.exit(1);
    }
    const initMemory = process.memoryUsage().heapUsed;
    console.log('\n\nExecuting Function \x1b[96;1m' + fn.name + '\x1b[0m');
    console.time('\n\x1b[31;1m Time Taken: \x1b[0m');
    const output = fn(...args);
    console.timeEnd('\n\x1b[31;1m Time Taken: \x1b[0m');
    const finalMemory = process.memoryUsage().heapUsed;
    console.log('\n\x1b[32;1m input: \x1b[0m', ...args);
    console.log('\n\x1b[32;1m output: \x1b[0m', output);
    console.log('\n\x1b[31;1m Total Memory Used: \x1b[0m', ((finalMemory - initMemory) / 1024).toFixed(2), ' kB\n\n');
}
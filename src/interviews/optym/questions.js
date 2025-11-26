// Question 1: Build a rate limiter

const MAX_LIMIT = 1;
const TIME_LIMIT = 1 * 1000;

const rateLimitMap = new Map();
/*
{
    "abc": [] - max size (10)
}
*/

async function main(sessionId) {
    const startTime = (new Date()).getTime();

    if (rateLimitMap.has(sessionId)) {
        const rateLimitTimeBuckets = rateLimitMap.get(sessionId) || [];
        const copy = JSON.parse(JSON.stringify(rateLimitTimeBuckets));
        for (const startTimeIdx in rateLimitTimeBuckets) {
            if (startTime - rateLimitTimeBuckets[startTimeIdx] >= TIME_LIMIT) {
                copy.splice(startTimeIdx, 1);
            }
        }

        if (copy.length >= MAX_LIMIT) {
            return 'Rate Limit'
        }

        copy.push(startTime);
        rateLimitMap.set(sessionId, copy);
    } else {
        rateLimitMap.set(sessionId, [startTime]);
    }
    return rateLimitMap;
    // continue with request

}

// main('abc');
// setTimeout(() => {
//     main('abc')
// },500);
// main('abc')


// Question 2: Output of 
function x() {
    for (var i = 1; i <= 10; i++) {
        setTimeout(
            function () {
                console.log(i);
            },
            i * 1000);
    }
    console.log("Learn")
} x()


// Question 3: Output of
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const processItems = async () => {
    const items = [1, 2, 3];
    for (const item of items) {
        await wait(1000);
        console.log(`${new Date().toISOString()} - Processed item ${item}`);
    };
    console.log(`${new Date().toISOString()} - All items processed`);
};
processItems();

// Question 4: Output of 
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(resolve, 100, 'foo'));

Promise.all([promise1, promise2]).then(values => {
    console.log(values);
});

Promise.race([promise1, promise2]).then(value => {
    console.log(value);
});

// Question 5: SQL Query
//
// Table Schema
//     EmpId, EmpName, ManagerId(EmpId)
//     1, Alice, null
//     2, Bob, 1
//     3, Clara, 1
//     4, Eve, 2
//     5, Dave, 2
// Print employee details with manager name
// Answer:
// SELECT
//     e1.EmpId,
//     e1.EmpName AS EmployeeName,
//     e2.EmpName AS ManagerName
// FROM employees e1
// LEFT JOIN employees e2
//     ON e1.ManagerId = e2.EmpId;

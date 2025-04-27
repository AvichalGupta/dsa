console.log(myVar); 
var myVar = 10; 
function test() {
    if (false) 
    { 
        var myVar = 20; 
        
    }
    console.log(myVar); 
}
test();
//10
//10

console.log('Script start');

const testPromise = () => new Promise((resolve, reject) => {
    console.log('Inside test promise');
    setTimeout(() => {
        resolve('Promise resolved');
    }, 1000);
});

async function asyncCall() {
    console.log('asyncCall start');
    const result = await testPromise();
    console.log(result,'inside async Call');
}

asyncCall();

testPromise().then(console.log);

console.log('Script end');

// Script start
// Inside test promise
// asyncCall start
// Script end
// inside async Call
// Promise resolved
// Promise resolved
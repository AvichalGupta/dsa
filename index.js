// const input = [2, 1, 4, 5, 3];
// const output = [];
// let minVal;
// for (let index = 0; index < input.length; index++) {
//     const subArr = input.splice(0, index).sort();
//     for (let j = subArr.length; j >= 0; j--) {
//         if (subArr[j] == j) {
//             minVal = subArr[j];
//             break;
//         }
//     }

//     if (!minVal) {
//         output.push(0);
//     } else {
//         output.push(minVal);
//     }
// }



// console.log(output);


function main() {
    const fileSize = 10;
    const input = [[0,9]];

    // duplicate ranges
    // overlapping ranges

    // end of current and start of next can only have difference of 1.

    input.sort((a,b) => {
        if (a[0] - b[0] === 0) {
            return a[1] - b[1];
        }

        return a[0] - b[0];
    });

    let i = 0;
    while (i < input.length - 1) {
        
        const current = input[i];
        const next = input[i + 1];

        if (current[1] >= next[0]) {

            input[i][1] = Math.max(current[1], next[1]);
            input.splice(i + 1 , 1);
            continue;
        }
        i++;
    }

    if (input[0][0] !== 0) return false;

    for (let j = 0; j < input.length - 1; j++) {
        const current = input[j];
        const next = input[j + 1];

        if (Math.abs(current[1] - next[0]) > 1) return false;
    }

    return input.reverse()[0][1] === fileSize - 1;

}

const ans = main();
console.log(ans);
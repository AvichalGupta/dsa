// Set Matrix Zeroes
// Time Complexity: O(n^2)
// Space Complexity: O(n)
function setMatrixZeroes(inputMatrix) {
    const zeroesIndexSet = new Set();

    if (inputMatrix.length <= 1) {
        return inputMatrix;
    }

    for (const rowIndex in inputMatrix) {
        for (const columnIndex in inputMatrix[0]) {
            if (inputMatrix[rowIndex][columnIndex] === 0) {
                zeroesIndexSet.add(rowIndex.toString() + columnIndex.toString());
            }
        }
    }

    for (const indexVal of zeroesIndexSet) {
        inputMatrix[indexVal[0]] = new Array(inputMatrix[0].length).fill(0);
        for (const rowIndex in inputMatrix) {
            inputMatrix[rowIndex][indexVal[1]] = 0;
        }
    }

    return inputMatrix;
}

// (() => {
//     const input = [[0,1,2,0],[3,4,5,2],[1,3,1,5]];
//     const initMemory = process.memoryUsage().heapUsed;
//     console.time('Time Taken: ');
//     const output = setMatrixZeroes(input);
//     console.timeEnd('Time Taken: ');
//     const finalMemory = process.memoryUsage().heapUsed;
//     console.log('\noutput: ', output);
//     console.log('\nTotal Memory Used: ', ((finalMemory - initMemory) / 1024).toFixed(2), ' kB');
// })()

// Pascal Triangle
// Time Complexity: O(n^2)
// Space Complexity: O(n)
function generatePascalTriangle(input) {
    const output = [];
    for (let i = 0; i < input; i++) {
        output.push(new Array(i + 1).fill(1));
    }

    if (input < 3) {
        return output;
    }

    for (let i = 2; i < input; i++) {
        for (let j = 1; j < output[i].length - 1 ; j++) {
            output[i][j] = output[i - 1][j - 1] + output[i - 1][j];
        }
    }

    return output;
}

// (() => {
//     const input = 6;
//     const initMemory = process.memoryUsage().heapUsed;
//     console.time('Time Taken: ');
//     const output = generatePascalTriangle(input);
//     console.timeEnd('Time Taken: ');
//     const finalMemory = process.memoryUsage().heapUsed;
//     console.log('\noutput: ', output);
//     console.log('\nTotal Memory Used: ', ((finalMemory - initMemory) / 1024).toFixed(2), ' kB');
// })()

// Pascal Triangle Variation 1: Print element from Pascal Triangle.
function getElementFromPascalTriangle(row, col) {

    // Brute Force: Create the pascal triangle and fetch the element at row, column.
    
    // Slightly Optimal
    // Time Complexity: O(n) n = row
    // Space Complexity: O(n) n = row
    function solution1() {
        if (row < col) {
            return -1;
        }
    
        function recurse(num) {
            if (num <= 1) {
                return 1;
            }
    
            return num * recurse(num - 1);
        }
    
        function nCr(n, r) {
            // nCr = n! / ( r! * (n - r)! );
            return (recurse(n) / (recurse(r) * recurse(n-r)));
        }
    
        return nCr(row - 1, col - 1);
    }

    // return solution1();

    //Best Solution:
    /*
        Watch for Intutition: https://youtu.be/bR7mQgwQ_o8?si=G1vfPz_-s9Cbu5Rs
        Start from 6:30
    */

    // Time Complexity: O(n) n = col
    // Space Complexity: O(1)
    function solution2() {
        row--;
        col--;
        if (row < col) {
            return -1;
        }

        // Using same nCr approach, but optimised.
        let numerator = 1;
        let denominator = 1;
        let counter = 0;
        while (counter < col) {
            numerator *= row - counter;
            denominator *= col - counter;
            counter++;
        }

        return numerator/denominator;
    }

    return solution2();
}

// (() => {
//     const inputRow = 4;
//     const inputColumn = 1;
//     const initMemory = process.memoryUsage().heapUsed;
//     console.time('Time Taken: ');
//     const output = getElementFromPascalTriangle(inputRow, inputColumn);
//     console.timeEnd('Time Taken: ');
//     const finalMemory = process.memoryUsage().heapUsed;
//     console.log('\noutput: ', output);
//     console.log('\nTotal Memory Used: ', ((finalMemory - initMemory) / 1024).toFixed(2), ' kB');
// })()

// Pascal Triangle Variation 2: Print row from Pascal Triangle.
// Time Complexity: O(n^2) n = row
// Space Complexity: O(n)
function getRowFromPascalTriangle(row) {

    // Brute Force: Create the pascal triangle and fetch the element at row.
    
    //Best Solution:
    /*
        Watch for Intutition: https://youtu.be/bR7mQgwQ_o8?si=G1vfPz_-s9Cbu5Rs
        Start from 6:30
    */

    row--;
    let numerator = 1;
    let denominator = 1;
    let counter = 0;
    let output = [];
    for (let col = 0; col <= row; col++) {
        numerator = 1;
        denominator = 1;
        counter = 0;
        while (counter < col) {
            numerator *= row - counter;
            denominator *= col - counter;
            counter++;
        }
        output.push(numerator/denominator);
    }

    return output;
}

// (() => {
//     const inputRow = 6;
//     const initMemory = process.memoryUsage().heapUsed;
//     console.time('Time Taken: ');
//     const output = getRowFromPascalTriangle(inputRow);
//     console.timeEnd('Time Taken: ');
//     const finalMemory = process.memoryUsage().heapUsed;
//     console.log('\noutput: ', output);
//     console.log('\nTotal Memory Used: ', ((finalMemory - initMemory) / 1024).toFixed(2), ' kB');
// })()

// Next Permutation Lexographically.
// Time Complexity: O(n)
// Space Complexity: O(1)
function getNextPermutationLexographically(inputArr) {
    let breakPoint = null;
    for (let index = inputArr.length - 1; index > 0; index --) {
        if (inputArr[index] > inputArr[index - 1]) {
            breakPoint = index - 1;
            break;
        }
    }

    if (breakPoint === null) {
        return inputArr.reverse();
    }

    let smallestVal = inputArr[breakPoint + 1];
    let smallestValIndex = breakPoint + 1;
    for (let index = breakPoint + 1; index < inputArr.length; index++) {
        if (inputArr[index] < smallestVal && inputArr[index] > inputArr[breakPoint]) {
            smallestVal = inputArr[index];
            smallestValIndex = index;
        }
    }

    // smallestVal is the smallest value just bigger than the breakPoint value, it will never be null after the loop.

    inputArr[smallestValIndex] += inputArr[breakPoint];
    inputArr[breakPoint] = inputArr[smallestValIndex] - inputArr[breakPoint];
    inputArr[smallestValIndex] -= inputArr[breakPoint];

    // Approach 1: using single for loop, on additional variables. 
    let lastIndex = -1;
    for (let i = breakPoint + 1; i < (inputArr + breakPoint + 1) / 2; i++) {
        lastIndex = inputArr.length - 1 - (index - (breakPoint + 1));
        inputArr[lastIndex] += inputArr[index];
        inputArr[index] = inputArr[lastIndex] - inputArr[index];
        inputArr[lastIndex] -= inputArr[index];
    }

    // Approach 2: use 2 pointers, one moving forward other moving back, keep swapping values. forward = breakPoint + 1; backward = inputArr.length - 1;

    return inputArr;
}

// (() => {
//     const input = [1,3,2];
//     const initMemory = process.memoryUsage().heapUsed;
//     console.time('Time Taken: ');
//     const output = getNextPermutationLexographically(input);
//     console.timeEnd('Time Taken: ');
//     const finalMemory = process.memoryUsage().heapUsed;
//     console.log('\noutput: ', output);
//     console.log('\nTotal Memory Used: ', ((finalMemory - initMemory) / 1024).toFixed(2), ' kB');
// })()

// Sort array of 0's, 1's 2's
// Time Complexity: O(n)
// Space Complexity: O(1)
function sortArray(inputArr) {
    // Using Dutch National Flag algorithm.
    
    let low = 0;
    let mid = 0;
    let high = inputArr.length - 1;

    while(mid <= high) {
        if (inputArr[mid] === 0) {
            if (low !== mid) {
                [inputArr[low], inputArr[mid]] = [inputArr[mid], inputArr[low]];
            }
            low++;
            mid++;
        } else if (inputArr[mid] === 1) {
            mid++;
        } else {
            if (high !== mid) {
                [inputArr[high], inputArr[mid]] = [inputArr[mid], inputArr[high]];
            }
            high--;
        }
    }
}

// (() => {
//     const input = [1,0,0,0,2,1,1,2];
//     const initMemory = process.memoryUsage().heapUsed;
//     console.time('Time Taken: ');
//     const output = sortArray(input);
//     console.timeEnd('Time Taken: ');
//     const finalMemory = process.memoryUsage().heapUsed;
//     console.log('\noutput: ', output);
//     console.log('\nTotal Memory Used: ', ((finalMemory - initMemory) / 1024).toFixed(2), ' kB');
// })()

// Rotate a nXn Matrix
// Time Complexity: O(n^2)
// Space Complexity: O(1)
function rotateMatrix(inputMatrix) {

    if (inputMatrix.length !== inputMatrix[0].length) throw new Error('Please provide a square matrix!');

    const maxSize = inputMatrix.length - 1;
    let tempVal = null;
    for (let rowIndex = 0; rowIndex < Math.floor((maxSize + 1) / 2); rowIndex++) {
        for (let columnIndex = rowIndex; columnIndex < maxSize - rowIndex; columnIndex++) {
            tempVal = inputMatrix[rowIndex][columnIndex];
            inputMatrix[rowIndex][columnIndex] = inputMatrix[maxSize - columnIndex][rowIndex];
            inputMatrix[maxSize - columnIndex][rowIndex] = inputMatrix[maxSize - rowIndex][maxSize - columnIndex];
            inputMatrix[maxSize - rowIndex][maxSize - columnIndex] = inputMatrix[columnIndex][maxSize - rowIndex];
            inputMatrix[columnIndex][maxSize - rowIndex] = tempVal;
        }
    }
    return inputMatrix;
}

// (() => {
//     const input = [[1,2,3],[4,5,6],[7,8,9]];
//     const initMemory = process.memoryUsage().heapUsed;
//     console.time('Time Taken: ');
//     const output = rotateMatrix(input);
//     console.timeEnd('Time Taken: ');
//     const finalMemory = process.memoryUsage().heapUsed;
//     console.log('\noutput: ', output);
//     console.log('\nTotal Memory Used: ', ((finalMemory - initMemory) / 1024).toFixed(2), ' kB');
// })()

//Merge Overlapping SubIntervals
// Time Complexity: O(nlog(n)) - because of sorting.
// Space Complexity: O(1)
function mergeOverlappingSubIntervals(inputIntervals) {
    let currentInterval = null;
    let nextInterval = null;
    let inputSize = inputIntervals.length - 1;
    let index = 0;
    inputIntervals = inputIntervals.sort((a,b) => {
        return a[0] - b[0];
    })
    while (index < inputSize) {
        currentInterval = inputIntervals[index];
        nextInterval = inputIntervals[index + 1];

        if (currentInterval[1] >= nextInterval[0]) {
            if (currentInterval[1] < nextInterval[1]) {
                inputIntervals[index][1] = nextInterval[1];
            }
            inputIntervals.splice(index + 1, 1);
            inputSize = inputIntervals.length - 1;
        } else {
            index++;
        }
    }
    return inputIntervals;
}

// (() => {
//     const input = [[1,4],[2,3]];
//     const initMemory = process.memoryUsage().heapUsed;
//     console.time('Time Taken: ');
//     const output = mergeOverlappingSubIntervals(input);
//     console.timeEnd('Time Taken: ');
//     const finalMemory = process.memoryUsage().heapUsed;
//     console.log('\noutput: ', output);
//     console.log('\nTotal Memory Used: ', ((finalMemory - initMemory) / 1024).toFixed(2), ' kB');
// })()

// Merge two sorted array's without extra space
// Time Complexity: O(nlog(n)) - because of sorting.
// Space Complexity: O(1)
function mergeSortedArrays(arr1, arr2) {
    for (let index = 0; index < arr2.length; index++) {
        arr1.push(arr2[index]);
    }
    return arr1.sort((a, b) => { return a - b });
}

// (() => {
//     const initMemory = process.memoryUsage().heapUsed;
//     console.time('Time Taken: ');
//     const output = mergeSortedArrays([1,6,4],[2,5,0,10]);
//     console.timeEnd('Time Taken: ');
//     const finalMemory = process.memoryUsage().heapUsed;
//     console.log('\noutput: ', output);
//     console.log('\nTotal Memory Used: ', ((finalMemory - initMemory) / 1024).toFixed(2), ' kB');
// })()

// Find duplicates in array of N + 1, where each element is between 1 and N
// Time Complexity: O(nlog(n)) - because of sorting.
// Space Complexity: O(1)
function findDuplicates(inputArr) {
    // Hare and Tortoise Algorithm.
    let slow = inputArr[0];
    let fast = inputArr[0];

    while(true) {
        slow = inputArr[slow];
        fast = inputArr[inputArr[fast]];
        if (slow === fast) break;
    }

    slow = inputArr[0];

    while(slow !== fast) {
        slow = inputArr[slow];
        fast = inputArr[fast];
    }

    return slow || null;
}

// (() => {
//     const initMemory = process.memoryUsage().heapUsed;
//     console.time('Time Taken: ');
//     const output = findDuplicates([1,2,12,14]);
//     console.timeEnd('Time Taken: ');
//     const finalMemory = process.memoryUsage().heapUsed;
//     console.log('\noutput: ', output);
//     console.log('\nTotal Memory Used: ', ((finalMemory - initMemory) / 1024).toFixed(2), ' kB');
// })()

// Search a Sorted 2D Matrix
// Time Complexity: O(n)
// Space Complexity: O(1)
function searchElementInSortedMatrix(inputMatrix, elementToBeFound) {
    function solution1() {
        const rowSize = inputMatrix.length;
        const colSize = inputMatrix[0].length;
        let rowIndex = null;
        for (let index = 0; index < rowSize; index++) {
            if (inputMatrix[index][colSize - 1] > elementToBeFound) {
                rowIndex = index;
                break;
            } else if (inputMatrix[index][colSize - 1] === elementToBeFound) {
                return true;
            }
        }
    
        if (!rowIndex) return false;
        
        for (let index = 0; index < colSize; index++) {
            if (inputMatrix[rowIndex][index] === elementToBeFound) {
                return true;
            }
        }
    
        return false;
    }

    function solution2() {
        const rowSize = inputMatrix.length;
        const colSize = inputMatrix[0].length;

        let high = rowSize * colSize - 1;
        let low = 0, mid = 0, row = 0, col = 0;

        while (low <= high) {
            mid = Math.floor((low + high)/2);
            row = Math.floor(mid / colSize);
            col = mid % colSize;

            if (inputMatrix[row][col] === elementToBeFound) return true;
            else if (inputMatrix[row][col] < elementToBeFound) low = mid + 1;
            else high = mid - 1;
        }

        return false;
    }

    return solution1();
}

// (() => {
//     const input = [[1,2,3],[4,5,6],[7,8,9]];
//     const initMemory = process.memoryUsage().heapUsed;
//     console.time('Time Taken: ');
//     const output = searchElementInSortedMatrix(input, 9);
//     console.timeEnd('Time Taken: ');
//     const finalMemory = process.memoryUsage().heapUsed;
//     console.log('\noutput: ', output);
//     console.log('\nTotal Memory Used: ', ((finalMemory - initMemory) / 1024).toFixed(2), ' kB');
// })()

// Implement pow(x,n)
// Time Complexity: O(n)
// Space Complexity: O(1)
function implementPowerFn(baseValue, power) {
    power = Math.floor(power);
    
    if (power === 0) return 1;

    return baseValue * implementPowerFn(baseValue, power - 1);
}

// (() => {
//     const initMemory = process.memoryUsage().heapUsed;
//     console.time('Time Taken: ');
//     const output = implementPowerFn(4,4);
//     console.timeEnd('Time Taken: ');
//     const finalMemory = process.memoryUsage().heapUsed;
//     console.log('\noutput: ', output);
//     console.log('\nTotal Memory Used: ', ((finalMemory - initMemory) / 1024).toFixed(2), ' kB');
// })()


// Find Majority Element occurring more than N/2 times.
// Time Complexity: O(n)
// Space Complexity: O(1)
function findMajorityElement(inputArr) {
    let majorityElement = null;
    let counter = 0;

    // This only works if an element is present more than N/2 times in an array of N elements. 
    // Base assumption here is that if an element if present more than N/2 times, majorityElement will not change although the counter value might not be equal to N/2.
    for (const value of inputArr) {
        if (counter === 0 || value === majorityElement) {
            counter++;
            majorityElement = value;
        } else {
            counter--;
        }
    }

    counter = 0;

    // To verify if the element if present more than N/2 times, this loop is run.
    for (const value of inputArr) {
        if (value === majorityElement) {
            counter++;
        }
    }

    if (counter > Math.floor(inputArr.length / 2)) {
        return majorityElement;
    }

    return null;
}

// (() => {
//     const input = [1,2,2];
//     const initMemory = process.memoryUsage().heapUsed;
//     console.time('Time Taken: ');
//     const output = findMajorityElement(input);
//     console.timeEnd('Time Taken: ');
//     const finalMemory = process.memoryUsage().heapUsed;
//     console.log('\noutput: ', output);
//     console.log('\nTotal Memory Used: ', ((finalMemory - initMemory) / 1024).toFixed(2), ' kB');
// })()

// Find Majority Element occurring more than N/X times.
// Time Complexity: O(n)
// Space Complexity: O(1)
function findMajorityElementX(inputArr, X) {
    let majorityElementFreqMap = new Map();

    for (const value of inputArr) {
        if (majorityElementFreqMap.has(value)) {
            majorityElementFreqMap.set(value, majorityElementFreqMap.get(value) + 1);
        } else {
            majorityElementFreqMap.set(value, 1);
        }
    }


    for (const value of inputArr) {
        if (majorityElementFreqMap.get(value) < (Math.floor(inputArr.length / X))) {
            majorityElementFreqMap.delete(value);
        }
    }

    return Object.keys(Object.fromEntries(majorityElementFreqMap.entries())).map((val) => +val) || [];
}

// (() => {
//     const input = [1,3,3,3,2,2,2];
//     const initMemory = process.memoryUsage().heapUsed;
//     console.time('Time Taken: ');
//     const output = findMajorityElementX(input,3);
//     console.timeEnd('Time Taken: ');
//     const finalMemory = process.memoryUsage().heapUsed;
//     console.log('\noutput: ', output);
//     console.log('\nTotal Memory Used: ', ((finalMemory - initMemory) / 1024).toFixed(2), ' kB');
// })()

// Grid unique paths, find all unique paths in a matrix from point A to point B while moving down and right only.
// Time Complexity: O(n)
// Space Complexity: O(1)
function findAllUniquePaths(inputMatrix, startPoint, endPoint) {
    function isRowBoundaryValue(rowIndex) {
        return (rowIndex === endPoint[0]);
    }

    function isColumnBoundaryValue(colIndex) {
        return (colIndex === endPoint[1]);
    }

    function verifyBounds() {
        if ((startPoint[0] > inputMatrix.length) || (startPoint[0] < 0)) throw new Error('Start Point row out of bounds.');
        if ((startPoint[1] > inputMatrix[0].length) || (startPoint[1] < 0)) throw new Error('Start Point col out of bounds.');
        if ((endPoint[0] > inputMatrix.length) || (endPoint[0] < 0)) throw new Error('End Point row out of bounds.');
        if ((endPoint[1] > inputMatrix[0].length) || (endPoint[1] < 0)) throw new Error('End Point col out of bounds.');
        if (startPoint[0] > endPoint[0]) throw new Error('Start Point row must be lesser than end point row.');
        if (startPoint[1] > endPoint[1]) throw new Error('Start Point column must be lesser than end point column.');
        if ((startPoint[0] === endPoint[0]) && (startPoint[1] === endPoint[1])) throw new Error('Start and Endpoint cannot be same.');
    }

    verifyBounds();

    const possiblePaths = new Array();
    for (let rowIndex = startPoint[0]; rowIndex < endPoint[0]; rowIndex++) {

        for (let colIndex = startPoint[1]; colIndex < endPoint[1]; colIndex++) {
        }
    }
}

// (() => {
//     const input = [1,3,3,3,2,2,2];
//     const startPoint = [0,1];
//     const endPoint = [1,2];
//     const initMemory = process.memoryUsage().heapUsed;
//     console.time('Time Taken: ');
//     const output = findAllUniquePaths(input,startPoint, endPoint);
//     console.timeEnd('Time Taken: ');
//     const finalMemory = process.memoryUsage().heapUsed;
//     console.log('\noutput: ', output);
//     console.log('\nTotal Memory Used: ', ((finalMemory - initMemory) / 1024).toFixed(2), ' kB');
// })()
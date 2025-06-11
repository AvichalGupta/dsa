const { execute } = require('../helper')

// Set Matrix Zeroes
// Time Complexity: O(n^2)
// Space Complexity: O(n)
function setMatrixZeroes(inputMatrix: number[][]) {
    const zeroesIndexSet: Set<string> = new Set<string>();

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
        inputMatrix[+indexVal[0]] = new Array(inputMatrix[0].length).fill(0);
        for (const rowIndex in inputMatrix) {
            inputMatrix[rowIndex][+indexVal[1]] = 0;
        }
    }

    return inputMatrix;
}
// execute([[0,1,2,0],[3,4,5,2],[1,3,1,5]], setMatrixZeroes);

// Pascal Triangle
// Time Complexity: O(n^2)
// Space Complexity: O(n)
function generatePascalTriangle(input: number) {
    const output = [];
    for (let i = 0; i < input; i++) {
        output.push(new Array(i + 1).fill(1));
    }

    if (input < 3) {
        return output;
    }

    for (let i = 2; i < input; i++) {
        for (let j = 1; j < output[i].length - 1; j++) {
            output[i][j] = output[i - 1][j - 1] + output[i - 1][j];
        }
    }

    return output;
}
// execute(6, generatePascalTriangle);

// Pascal Triangle Variation 1: Print element from Pascal Triangle.
function getElementFromPascalTriangle(row: number, col: number) {

    // Brute Force: Create the pascal triangle and fetch the element at row, column.
    
    // Slightly Optimal
    // Time Complexity: O(n) n = row
    // Space Complexity: O(n) n = row
    function solution1() {
        if (row < col) {
            return -1;
        }
    
        function factorial(num: number): number {
            if (num <= 1) {
                return 1;
            }
    
            return num * factorial(num - 1);
        }
    
        function nCr(n: number, r: number) {
            // nCr = n! / ( r! * (n - r)! );
            return (factorial(n) / (factorial(r) * factorial(n-r)));
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
// execute(4, 1, getElementFromPascalTriangle);

// Pascal Triangle Variation 2: Print row from Pascal Triangle.
// Time Complexity: O(n^2) n = row
// Space Complexity: O(n)
function getRowFromPascalTriangle(row: number) {

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
// execute(6, getRowFromPascalTriangle);

// Next Permutation Lexographically.
// Time Complexity: O(n)
// Space Complexity: O(1)
function getNextPermutationLexographically(inputArr: number[]) {
    function solution1() {

        let breakPoint = null;
        for (let index = inputArr.length - 1; index > 0; index --) {
            if (inputArr[index] > inputArr[index - 1]) {
                breakPoint = index - 1;
                break;
            }
        }
    
        if (breakPoint === null) {
            // This means array is in last permutation.
            // Example: inputArr = [3, 2, 1] (breakPoint will be null), reversing array will give next lexographic order.
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
        for (let index = breakPoint + 1; index < (inputArr.length + breakPoint + 1) / 2; index++) {
            lastIndex = inputArr.length - 1 - (index - (breakPoint + 1));
            inputArr[lastIndex] += inputArr[index];
            inputArr[index] = inputArr[lastIndex] - inputArr[index];
            inputArr[lastIndex] -= inputArr[index];
        }
    
        return inputArr;
    }

    function solution2() {
        let n = inputArr.length; // size of the array.

        // Step 1: Find the break point:
        let index = -1; // break point
        for (let i = n - 2; i >= 0; i--) {
            if (inputArr[i] < inputArr[i + 1]) {
                // index i is the break point
                index = i;
                break;
            }
        }

        // If break point does not exist:
        if (index == -1) {
            // reverse the whole array:
            inputArr.reverse();
            return inputArr;
        }

        // Step 2: Find the next greater element and swap it with A[ind]

        for (let i = n - 1; i > index; i--) {
            if (inputArr[i] > inputArr[index]) {
                [inputArr[i], inputArr[index]] = [inputArr[index], inputArr[i]]; // swap A[i] and A[ind]
                break;
            }
        }

        // Step 3: reverse the right half:
        inputArr.splice(index + 1, n - index - 1, ...inputArr.slice(index + 1).reverse());

        return inputArr;
    }

    return solution2();
}
// execute([1,3,2], getNextPermutationLexographically);

// Sort array of 0's, 1's 2's
// Time Complexity: O(n)
// Space Complexity: O(1)
function sortArray(inputArr: number[]) {
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
// execute([1,0,0,0,2,1,1,2], sortArray);

// Rotate a nXn Matrix
// Time Complexity: O(n^2)
// Space Complexity: O(1)
function rotateMatrix(inputMatrix: number[][]) {

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
// execute([[1,2,3],[4,5,6],[7,8,9]], rotateMatrix);

//Merge Overlapping SubIntervals
// Time Complexity: O(nlog(n)) - because of sorting.
// Space Complexity: O(1)
function mergeOverlappingSubIntervals(inputIntervals: number[][]) {
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
// execute([[1,4],[2,3]], mergeOverlappingSubIntervals);

// Merge two sorted array's without extra space
// Time Complexity: O(nlog(n)) - because of sorting.
// Space Complexity: O(1)
function mergeSortedArrays(arr1: number[], arr2: number[]) {
    for (let index = 0; index < arr2.length; index++) {
        arr1.push(arr2[index]);
    }
    return arr1.sort((a, b) => { return a - b });
}
// execute([1,6,4],[2,5,0,10], mergeSortedArrays);

// Find duplicates in array of N + 1, where each element is between 1 and N
// Time Complexity: O(nlog(n)) - because of sorting.
// Space Complexity: O(1)
function findDuplicates(inputArr: number[]) {
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
// execute([1,2,12,14], findDuplicates);

// Search a Sorted 2D Matrix
// Time Complexity: O(n)
// Space Complexity: O(1)
function searchElementInSortedMatrix(inputMatrix: number[][], elementToBeFound: number) {
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
// execute([[1,2,3],[4,5,6],[7,8,9]], 9, searchElementInSortedMatrix);

// Implement pow(x,n)
// Time Complexity: O(n)
// Space Complexity: O(1)
function implementPowerFn(baseValue: number, power: number): number {
    power = Math.floor(power);
    
    if (power === 0) return 1;

    return baseValue * implementPowerFn(baseValue, power - 1);
}
// execute(12, 4, implementPowerFn);

// Find Majority Element occurring more than N/2 times.
// Time Complexity: O(n)
// Space Complexity: O(1)
function findMajorityElement(inputArr: number[]) {
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
// execute([1,2,2,3,3,3,3,3,3,3,4], findMajorityElement);

// Find Majority Element occurring more than N/X times.
// Time Complexity: O(n)
// Space Complexity: O(1)
function findMajorityElementX(inputArr: number[], X: number) {
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
// execute([1,3,3,3,2,2,2], 2, findMajorityElementX);

// Grid unique paths, find all unique paths in a matrix from point A to point B while moving down and right only.
function findAllUniquePaths(rowLen: number, colLen: number) {

    // Time Complexity: O(n)
    // Space Complexity: O(1)
    function solution1() {
        // brute force recursion - This approach perfroms 2 operations at every square (go right and go down), it will re-visit already visited squares.
        function recurse(rowVal = 0, colVal = 0): number {
            if (rowVal === rowLen && colVal === colLen) return 1;
            if (rowVal > rowLen || colVal > colLen) return 0;

            const goRight = recurse(rowVal, colVal + 1);
            const goDown = recurse(rowVal + 1, colVal);

            return goRight + goDown;
        }

        return recurse();
    }

    // Time Complexity: O(m * n)
    // Space Complexity: O((m + 1) * (n + 1))
    function solution2() {
        // memoised format of recursion - This approach perfroms 2 operations at every square (go right and go down), 
        // it will cache visited squares and does not perfrom recursion on the re-visited squares. 
        // It instead returns the value from the cache, 
        // in this case the value is the number of possible paths till the end from the cached square.
        const memoisedArr: number[][] = Array.from({ length: rowLen + 1 }, () => { return new Array(colLen + 1).fill(-1) });

        function recurse(rowVal = 0, colVal = 0, memoisedArr: number[][]): number {
            if (rowVal === rowLen && colVal === colLen) return 1;
            if (rowVal > rowLen || colVal > colLen) return 0;

            if (memoisedArr[rowVal][colVal] === -1) {
                const goRight = recurse(rowVal, colVal + 1, memoisedArr);
                const goDown = recurse(rowVal + 1, colVal, memoisedArr);
    
                memoisedArr[rowVal][colVal] = goRight + goDown;
            }

            return memoisedArr[rowVal][colVal];
        }

        return recurse(0,0,memoisedArr);
    }

    // Time Complexity: O(m * n)
    // Space Complexity: O((m + 1) * (n + 1))
    function solution3() {
        // Dynamic Programming Approach: Bottom Up Tabular - This approach does not use recursion, insteasd uses memoisation with simple for loops.
        // More memory efficient as it does not pass the same array in every function call.
        // Only drawback, each row in this array, stores the same values.
        const dpArr = new Array(rowLen + 1).fill(new Array(colLen + 1).fill(1));

        dpArr[rowLen][colLen] = 1;
        for (let rowIndex = rowLen - 1; rowIndex > 0; rowIndex--) {
            for (let colIndex = colLen - 1; colIndex > 0; colIndex--) {
                dpArr[rowIndex][colIndex] = dpArr[rowIndex + 1][colIndex] + dpArr[rowIndex][colIndex + 1];
            }
        }

        return dpArr[1][1];
    }

    // Time Complexity: O(m * n)
    // Space Complexity: O(n + 1)
    function solution4() {
        // Dynamic Programming Approach: Bottom Up Tabular - This approach does not use recursion, insteasd uses memoisation with simple for loops.
        // More memory efficient as it uses a 1-D array.
        const dpArr = new Array(colLen + 1).fill(1);

        for (let rowIndex = rowLen - 1; rowIndex > 0; rowIndex--) {
            for (let colIndex = colLen - 1; colIndex > 0; colIndex--) {
                dpArr[colIndex] += dpArr[colIndex + 1];
            }
        }

        return dpArr[1];
    }

    return solution4();
}
// execute(3, 7, findAllUniquePaths);

// Tow Sum: Return indices of elements in array that when added give the targetSum.
// Time Complexity: O(n)
// Space Complexity: O(n);
function twoSum(arr: number[], targetSum: number) {

    // Map based approach: Check if complement value exists in array and return indices
    // Time Complexity: O(n) n = arr.length
    // Space Complexity: O(n) n = arr.length
    function solution1() {
        const complementMap = new Map();

        for (let index = 0; index < arr.length; index++) {
            const complementVal = targetSum - arr[index];
            if (complementMap.has(complementVal)) {
                return [index, complementMap.get(complementVal)];
            }
            complementMap.set(complementVal, index);
        }

        return [-1, -1];
    }
    return solution1();
}
// execute([1,2,3,4,5,6], 10, twoSum);

// Find Max Product of an array
// Time Complexity: O(n)
// Space Complexity: O(1)
function maxProduct(nums: number[]) {
    let maxProd = nums[0];
    let minProd = nums[0];
    let result = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        const num = nums[i];
        if (num < 0) {
            [maxProd, minProd] = [minProd, maxProd];
        }
        maxProd = Math.max(num, maxProd * num);
        minProd = Math.min(num, minProd * num);
        result = Math.max(result, maxProd);
    }

    return result;
}
// execute([1,1,2,3,4,4], maxProduct);

// Find Max Product of an array, except self
// Time Complexity: O(n)
// Space Complexity: O(n)
function productExceptSelf(nums: number[]) {
    const n = nums.length;
    const answer = new Array(n).fill(1);
    
    // Left products
    let left = 1;
    for (let i = 0; i < n; i++) {
        answer[i] = left;
        left *= nums[i];
    }
    
    // Right products
    let right = 1;
    for (let i = n - 1; i >= 0; i--) {
        answer[i] *= right;
        right *= nums[i];
    }

    return answer;
} 
// execute([1,1,2,3,4,4], productExceptSelf);
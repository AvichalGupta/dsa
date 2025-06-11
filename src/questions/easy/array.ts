import { execute } from "../helper";

// Largest Element in an Array.
function findLargestElementInArray(arr: number[]) {
    if (!arr.length) return null;
    
    let largestElement = -Infinity;
    for (const value of arr) {
        if (largestElement < value) {
            largestElement = value;
        }
    }

    return largestElement;
}
// execute([1,2,3,4,5], findLargestElementInArray);

// Second Largest Element in an Array without sorting
function findSecondLargestElementInArrayWithoutSorting(arr: number[]) {
    if (!arr || arr.length <= 1) return null;

    let largestElement = -Infinity;
    let secondLargestElement = -Infinity;
    for (const value of arr) {
        if (largestElement < value) {
            secondLargestElement = largestElement;
            largestElement = value;
        } else if (secondLargestElement < value) {
            secondLargestElement = value;
        }
    }

    return secondLargestElement;
}
// execute([1,2,3,4,5], findSecondLargestElementInArrayWithoutSorting);

// Check if array is sorted
function isArraySorted(arr: number[], ascending = true) {
    if (!arr || !arr.length) return false;

    if (arr.length === 1) return true;

    for (let i = 0; i < arr.length - 1; i++) {

        if (ascending === true && arr[i + 1] < arr[i]) {
            return false;
        } else if (ascending === false && arr[i + 1] > arr[i]) {
            return false;
        }
    }

    return true;
}
// execute([1,2,3,4,5], isArraySorted);


// Remove Duplicates from Sorted Array
function removeDuplicatesFromSortedArray(arr: number[]) {
    if (!arr || arr.length <= 1) return [];

    let index = 1;
    while (index < arr.length) {
      if (arr[index - 1] === arr[index]) {
        arr.splice(index, 1);
      } else {
        index++;
      }
    }

    return arr;
}
// execute([1,1,1,1,1,1,2,2,2,2,2,3,3,3,3,4,4,5], removeDuplicatesFromSortedArray);

// Rotate Array Left once.
function rotateArrayLeftOnce(arr: number[]) {
    if (!arr || !arr.length) return [];

    if (arr.length === 1) return arr;

    for (let index = 0; index < arr.length - 1; index++) {
        arr[index] = arr[index] + arr[index + 1];
        arr[index + 1] = arr[index] - arr[index + 1];
        arr[index] = arr[index] - arr[index + 1];
    }
    return arr;
}
// execute([1,2,3,4,5,6], removeDuplicatesFromSortedArray);

// Rotate Array Left D times.
function rotateArrayMultipleTimes(arr: number[], d: number) {
    if (!arr || !arr.length) return [];

    if (arr.length === 1) return arr;

    const numberOfRotations = d % arr.length;

    if (numberOfRotations === 0) return arr;
    
    // Time Complexity: O(n) n = arr.length;
    // Space Complexity: O(n) n= arr.length;
    function solution1() {
        let nextIndex = null;
    
        const newArr = new Array(arr.length).fill(0);
    
        for (let index = 0; index < arr.length; index++) {
            if (index < numberOfRotations) nextIndex = arr.length - numberOfRotations + index;
            else nextIndex = index - numberOfRotations;
            
            newArr[nextIndex] = arr[index];
        }
    
        return newArr;
    }

    // Time Complexity: O(n * d) n = arr.length;
    // Space Complexity: O(1)
    function solution2() {
        for (let count = 1; count <= d; count++) {
            // Perfrom left rotation once on entire array, then perform it again for next iteration.
            for (let index = 0; index < arr.length - 1; index++) {
                arr[index] = arr[index] + arr[index + 1];
                arr[index + 1] = arr[index] - arr[index + 1];
                arr[index] = arr[index] - arr[index + 1];
            }
        }
        return arr;
    }

    // return solution1();
    return solution2();
}
// execute([1,2,3,4,5,6], 2, rotateArrayMultipleTimes);

// Kadane's Algorithm: Maximum SubArray Sum.
function getMaxSubArraySum(inputArr: number[]) {
    let maxCurrent = inputArr[0];
    let maxGlobal = inputArr[0];

    for (let i = 1; i < inputArr.length; i++) {
        
        if (inputArr[i] + maxCurrent > inputArr[i]) {
            // handles negatives
            maxCurrent += inputArr[i];
        } else {
            // handles positives
            maxCurrent = inputArr[i];
        }
        
        if (maxCurrent > maxGlobal) {
            maxGlobal = maxCurrent;
        }
    }

    return maxGlobal;
}
// execute([3, -2, -1], getMaxSubArraySum);

// Stock buy and sell
function getMaxProfit(stockPrices: number[]) {
    let minPrice = stockPrices[0], profit = 0;
    for (let i = 1; i < stockPrices.length; i++) {
        
        if (minPrice > stockPrices[i]) {
            minPrice = stockPrices[i];
        } else if (profit < (stockPrices[i] - minPrice)) {
            profit = stockPrices[i] - minPrice;
        }
    }
    return profit;
}
execute([3, -2, -1, 5, 10], getMaxProfit);
// Largest Element in an Array.
function findLargestElementInArray(arr) {
    if (!arr.length) return null;
    
    let largestElement = null;
    for (const index in arr) {
        if (largestElement < arr[index]) {
            largestElement = arr[index];
        }
    }

    return largestElement;
}

// Second Largest Element in an Array without sorting
function findSecondLargestElementInArrayWithoutSorting(arr) {
    if (!arr || arr.length <= 1) return null;

    let largestElement = null;
    let secondLargestElement = null;
    for (const index in arr) {
        if (largestElement < arr[index]) {
            secondLargestElement = largestElement;
            largestElement = arr[index];
        } else if (secondLargestElement < arr[index]) {
            secondLargestElement = arr[index];
        }
    }

    return secondLargestElement;
}

// Check if array is sorted
function isArraySorted(arr, ascending = true) {
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

// Remove Duplicates from Sorted Array
function removeDuplicatesFromSortedArray(arr) {
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

// Rotate Array Left once.
function rotateArrayLeftOnce(arr) {
    if (!arr || !arr.length) return [];

    if (arr.length === 1) return arr;

    for (let index = 0; index < arr.length - 1; index++) {
        arr[index] = arr[index] + arr[index + 1];
        arr[index + 1] = arr[index] - arr[index + 1];
        arr[index] = arr[index] - arr[index + 1];
    }
    return arr;
}

// Rotate Array Left D times.
function rotateArrayMultipleTimes(arr, d) {
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

// Kadane's Algorithm: Maximum SubArray Sum.
function getMaxSubArraySum(inputArr) {
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
// getMaxSubArraySum([3, -2, -1]);

// Stock buy and sell
function getMaxProfit(stockPrices) {
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
// getMaxProfit([5, -6, 1, 4, 12]);


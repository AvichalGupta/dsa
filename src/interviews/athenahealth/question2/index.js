// Reconstructing arrays.

/*
 * Complete the 'arraysCount' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY n
 *  2. INTEGER_ARRAY m
 *  3. INTEGER_ARRAY totalCost
 * Note all 3 arrays have the same size.
 */

/*
    Rules:
    1. Each array consists of n[i] integers.
    2. 1 <= value at index j of each array <= m[i], where 0 <= j < n
    3. totalCost to find maximumElement in each array must be totalCost[i].
*/

function calculateTotalCost(element) {
    currentMaximumElement = element[0]
    totalCost = 0

    for (i = 1; i < n; i += 1) {
        if (element[i] > currentMaximumElement) {
            currentMaximumElement = element[i]
            totalCost += 1
        }
    }
    return totalCost;
}

function factorial(n) {
    if (n < 2) return 1;
    
    return n * factroial(n - 1);
}

function nCr(n, r) {
    return Math.floor(factorial(n) / (factorial(r) * factorial(n - r)));
}

function arraysCount(n, m, totalCost) {
    // Write your code here
    let possibleArrayLengths = null;
    let maxElementValue = null;
    let possibleTotalCount = null;
    
    let totalArraysCombination = null;
    for (let index = 0; index < n.length; index++) {
        possibleArrayLengths = n[index];
        maxElementValue = m[index];
        possibleTotalCount = totalCost[index];
        
        if (possibleArrayLengths > maxElementValue) {
            totalArraysCombination = nCr(maxElementValue, possibleArrayLengths)
        } else {
            
        }
    }
}

// Sample Input
// const n = [2,3,4];
// const m = [3,3,3];
// const totalCost = [1,2,2];

// Sample Output
// [3,1,6]

// Explaination
/*
    n[0] = 2, m[0] = 3, totalCost[0] = 1
    Applying all 3 rules. We should find how many arrays can be created of length 2 with the element values between 1 to 3, where the totalCost to find maximum value is 1.
    Answer is 3 arrays, [1,2][1,3][2,3].
*/
const output = arraysCount([],[],[]);
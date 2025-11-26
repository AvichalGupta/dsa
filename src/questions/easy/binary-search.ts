import { execute } from "../helper";

// Time Complexity: O(log(n))
// Space Complexity: O(1)
function searchInsertPosition(nums: number[], target: number): number {
    let low = 0;
    let high = nums.length - 1;
    let mid = low + Math.floor((high - low) / 2);

    while (low <= high) {

        mid = low + Math.floor((high - low) / 2);
        
        if (nums[mid] === target) {
            return mid;
        }

        if (nums[mid] > target) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    if (nums[mid] < target) {
        return mid + 1;
    }

    return mid;
}

// execute([1, 3, 5, 6], 7, searchInsertPosition);

// Time Complexity: O(log(n))
// Space Complexity: O(1)
function squareRoot(num: number): number {
    
    if (num < 0) throw new Error('Cannot find square root of a negative number!');
    
    let low = 1;
    let high = Math.floor(num / 2);

    let mid = low + Math.floor((high - low) / 2);

    while (low <= high) {
        mid = low + Math.floor((high - low) / 2);

        if (mid * mid === num) return mid;

        if (mid * mid < num) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return low - 1;
}
// execute(-9, squareRoot);


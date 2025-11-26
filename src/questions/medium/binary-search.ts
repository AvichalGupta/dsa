import { execute } from "../helper";

function searchInRotatedSortedArray(nums: number[], target: number, variant: number): number {
    
    // This variant only works for ascending sort order, reverse conditions for descending sort orders
    function ascending(): number {
        let low = 0;
        let high = nums.length - 1;
        let mid = 0;
    
        while (low <= high) {
            mid = low + Math.floor((high - low) / 2);
    
            if (nums[mid] === target) {
                return mid;
            }
    
            if (nums[low] <= nums[mid]) {
                if (target < nums[mid] && nums[low] <= target) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else {
                if (target > nums[mid] && nums[high] <= target) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }

        console.log(low, mid, high)
    
        return mid;
    }

    // This variant only works for descending sort order, reverse conditions for descending sort orders
    function descending(): number {
        let low = 0;
        let high = nums.length - 1;
        let mid = 0;
    
        while (low <= high) {
            mid = low + Math.floor((high - low) / 2);
    
            if (nums[mid] === target) {
                return mid;
            }
    
            if (nums[low] >= nums[mid]) {
                if (target > nums[mid] && nums[low] >= target) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else {
                if (target < nums[mid] && nums[high] >= target) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
    
        return mid;
    }

    function handleDuplicatesFirstOccurance(): number {
        let low = 0;
        let high = nums.length - 1;
        let mid = 0;
    
        while (low <= high) {
            mid = low + Math.floor((high - low) / 2);
    
            if (nums[mid] === target) {
                return mid;
            }
    
            if (nums[low] <= nums[mid]) {
                if (target < nums[mid] && nums[low] <= target) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else {
                if (target > nums[mid] && nums[high] <= target) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
    
        return mid;
    }

    function handleDuplicatesLastOccurance(): number {
        let low = 0;
        let high = nums.length - 1;
        let mid = 0;
    
        while (low <= high) {
            mid = low + Math.floor((high - low) / 2);
    
            if (nums[mid] === target) {
                return mid;
            }
    
            if (nums[low] <= nums[mid]) {
                if (target < nums[mid] && nums[low] <= target) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else {
                if (target > nums[mid] && nums[high] <= target) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
    
        return mid;
    }

    switch (variant) {
        case 1:
            return ascending();
        case 2:
            return descending();
        case 3:
            return handleDuplicatesFirstOccurance();
        case 4:
            return handleDuplicatesLastOccurance();
        default:
            return ascending();
    }

}

execute([4, 5, 6, 7, 8, 1, 2, 3], 9, 1, searchInRotatedSortedArray);
// execute([3, 2, 1, 8, 7, 6, 5, 4], 3, 2, searchInRotatedSortedArray);
// execute([2, 3, 3, 4, 5, 1, 1, 2], 9, 3, searchInRotatedSortedArray);
// execute([2, 3, 3, 4, 5, 1, 1, 2], 9, 4, searchInRotatedSortedArray);

function kokoEatingBananas(bananaPiles: number[], hours: number): number {
    let eatingSpeed = 0;

    // Find max in array
    let largestPile = 0;
    for (const bananaPile of bananaPiles) {
        if (largestPile < bananaPile) largestPile = bananaPile;
    }

    let start = 0;
    let end = largestPile;

    let mid = 0;

    while (start <= end) {
       
        mid = start + Math.floor((end - start) / 2);

        let hoursTaken = 0;

        for (const bananaPile of bananaPiles) {
            hoursTaken += Math.ceil(bananaPile / mid);
        }

        if (hoursTaken === hours) {
            eatingSpeed = mid;
            break;
        }

        if (hoursTaken > hours) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }

    return eatingSpeed;
}

execute([3,6,7,11], 8, kokoEatingBananas);

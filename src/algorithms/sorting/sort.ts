class SortAlgorithms<T> {
    private array: T[];
    private size: number;
    constructor(array: T[]) {
        this.array = array;
        this.size = this.array.length;
    }

    private swap(currentIdx: number, swappedIdx: number): void {
        [ this.array[currentIdx], this.array[swappedIdx] ] = [ this.array[swappedIdx], this.array[currentIdx] ];
    }

    public get(ascending = true): T[] {
        return ascending ? this.array : this.array.reverse();
    }

    public set(array: T[]): void {
        this.array = array;
        this.size = this.array.length;
    }

    public peek(idx: number): T {
        if (idx < 0 || idx >= this.size) throw new Error('Out of bounds');

        return this.array[idx];
    }

    /*
        Core Implementation: 
        Pass through the entire array, N times.
        The first element is considered as the starting point.
        Every element after it is treated as an insert to the array.
        Post insert, it is sorted by comparing current and previous values

        Complexities:
            Time: O(n^2), technically O(n * (n - 1) / 2)
            Space: O(1)
    */
    public insertionSort(): void {

        // Loops N times
        for (let i = 0; i < this.size; i++) {

            // Loop treates each lookup as a new insert, swaps till sub array from 0 to j is sorted.
            for (let j = i; j > 0; j--) {
                if (this.peek(j) < this.peek(j - 1)) {
                    this.swap(j, j - 1);
                }
            }
        }
    }

    /*
        Core Implementation: 
        Pass through the entire array, N times.
        Find the index of the smallest element in the array.
        Move it to the front of the array by swapping.

        Complexities:
            Time: O(n^2), technically O(n * (n + 1) / 2)
            Space: O(1)
    */
    public selectionSort(): void {
        
        let smallestValueIdx = 0;
        
        // Loops N times
        for (let i = 0; i < this.size; i++) {
            
            // Initialised to first index of the array.
            smallestValueIdx = i;
            
            // Finding minimum element in subarray from i to end. Swaps only minimum element in each outer cycle.
            for (let j = i; j < this.size; j++) {
                if (this.peek(smallestValueIdx) > this.peek(j)) {
                    smallestValueIdx = j;
                }
            }
            this.swap(smallestValueIdx, i);
        }
    }

    /*
        Core Implementation: 
        Pass through the entire array, N times.
        Check if current value is greater than next value, if yes then swap it to end of array (similar to a bubble rising to the top).

        Complexities:
            Time: O(n^2)
            Space: O(1)
    */
    public bubbleSort(): void {

        let swapped = false;
        
        for (let i = this.size - 1; i >= 0; i--) {
            
            swapped = false;
            
            // swaps values i sub array from 0 to i, till current value is larger than next value.
            for (let j = 0; j < i; j++) {
                if (this.peek(j) > this.peek(j + 1)) {
                    this.swap(j, j + 1);
                }
                swapped = true;
            }

            if (!swapped) break;
        }
    }

    private mergeSortRecurse(array: T[]): T[] {
        const size = array.length;

        if (size <= 1) return array;

        const mid = Math.floor(size / 2);

        const leftSubArray = this.mergeSortRecurse(array.slice(0, mid));
        const righttSubArray = this.mergeSortRecurse(array.slice(mid));

        return this.mergeSortCombine(leftSubArray, righttSubArray); 
    }

    // The underlying assumption here is that both the individual arrays are sorted and then are being merged.
    private mergeSortCombine(left: T[], right: T[]): T[] {
        const resultArr: T[] = [];
        let leftIdx = 0;
        let rightIdx = 0;
        
        while(leftIdx < left.length && rightIdx < right.length) {
            if (left[leftIdx] > right[rightIdx]) {
                resultArr.push(right[rightIdx]);
                rightIdx++;
            } else {
                resultArr.push(left[leftIdx]);
                leftIdx++;
            }
        }

        return resultArr
        .concat(left.slice(leftIdx))
        .concat(right.slice(rightIdx));
    }

    /*
        Core Implementation: 
        Loop over array N times.
        Each pass break down array in half till each array size is 1, similar to binary search.
        Merge individual arrays.

        Complexities:
            Time: O(nlog(n)), log(n) for breaking array's in half, n for merging.
            Space: O(1)
    */
    // [5,3,1,2,6]
    public mergeSort(): T[] {
        return this.mergeSortRecurse(this.array);
    }

    /*
        Core Implementation: 
    */
    public quickSort(): void {

    }

    /*
        Core Implementation: 
    */
    public radixSort(): void {

    }
}
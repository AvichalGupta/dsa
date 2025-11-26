# Binary Search Basics

1. Divides the array into two halves and discards one half each step, making it `O(log n)`.
2. Works only on sorted or monotonic[^monotonic] arrays.
3. Common operations solvable with binary search:
   - Find the peak in a unimodal[^unimodal] array.
   - Find the insert position in a monotonic array. Not reliable for unimodal arrays because the insert position can lie on either side of the peak.
   - Find a value in a monotonic array.
   - Find a value in a rotated sorted array.
   ...and many more.
4. Works with duplicates as well, as long as they are monotonic.

[^monotonic]: Arrays whose values are either strictly increasing or strictly decreasing.
[^unimodal]: Arrays that have only one peak.

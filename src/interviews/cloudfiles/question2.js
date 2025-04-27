/*
Problem 1:
Your backend receives a file divided into chunks numbered from 1 to N. Chunks can arrive in random order. You need to track which chunks have been uploaded so far and report the highest chunk number X such that all chunks from 1 to X have been received continuously without gaps.
Example:
Input: [2, 1, 4, 5, 3]
Output: [0, 2, 2, 2, 5]
Explanation:
- chunk 2: chunks [2], highest continuous = 0 (chunk 1 missing)
- chunk 1: chunks [1,2], highest continuous = 2
- chunk 4: chunks [1,2,4], highest continuous still 2 (chunk 3 missing)
- chunk 5: chunks [1,2,4,5], highest continuous still 2
- chunk 3: chunks [1,2,3,4,5], highest continuous = 5
*/

/*
Problem 2:
You’re receiving a large file in multiple parts, each having a specified byte range (start, end). Due to network retries, ranges can overlap or be duplicated. You need to verify if the entire file from byte 0 to byte fileSize - 1 has been uploaded without gaps.
Example:
fileSize = 10
Input: [(0,2), (3,4), (5,9)]
Output: True

Input: [(0,3), (5,9)]
Output: False (gap at byte 4)
*/
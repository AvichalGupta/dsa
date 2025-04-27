/*
Write a function called EvenPairs(str) that accepts a string containing letters, digits, and other characters. The function should locate all pairs of adjacent even numbers present in the string and return the pair with the highest product as a comma-separated string (e.g., "24,6"). If no such pair exists, return "false".

For example, given the input "39y41d216", the function should return "2,16".
*/

"422y41d216"
"23a442c88"

function run(str) {
    let arr = [];
    let tempIndex = 0;
    for (let i = 0; i < str.length; i++) {
        if (isNaN(Number(str[i]))) {
            arr.push(str.slice(tempIndex, i));
            tempIndex = i + 1;
        }
    }
    arr.push(str.slice(tempIndex, str.length));
    
    arr = arr.filter((val) => {
        let evenCount = 0;
        for (let i = 0; i < val.length; i++) {
            if ((+val[i]) % 2 === 0) {
                evenCount++;
            }
        }
        return (evenCount !== 1);
    })
    
    let tempArray = [];
    for (let i = 0; i < arr.length; i++) {
        let permutations = [];
        let index = 0;
        let lastEvenNumber = 0;
        let number = arr[i];
        let tempOddNum = '';
        while(index < number.length) {
            if ((+number[index]) % 2 === 0) {
                permutations.push(number[index]);
                if (permutations.length === 2) {
                    tempArray.push(permutations);
                    permutations = [];
                }
            } else {
                tempOddNum = tempOddNum.split('').push(number[index].toString()).join('');
            }
            index ++;
            
        }
        
        if ((+tempOddNum) % 2 !== 0) {
            permutations.push(tempOddNum);
        }
    }
    
    
    
    console.log(arr)
}

run("422y41d216")
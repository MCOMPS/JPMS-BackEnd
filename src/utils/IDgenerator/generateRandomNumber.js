// returns a 4 digit number where at least 2 numbers are repeating,
//  for total possible numbers that could be generated check the end of the file
const generateRandomNumber = () => {
    const min = 1000; // Minimum 4-digit number (inclusive)
    const max = 9999; // Maximum 4-digit number (inclusive)
    let randomNumber;

    do {
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        const digits = String(randomNumber).split("");
        const uniqueDigits = [...new Set(digits)];

        // Check if the number has at least 2 repeating digits
        if (uniqueDigits.length <= digits.length - 2) {
            break; // Exit the loop if the condition is met
        }
    } while (true);

    return randomNumber;
};

module.exports = {
    generateRandomNumber
};


/*
 total possible numbers that could be generated is 4094
 CHAT GPT EXPLANATION:
 If we consider all the possible scenarios for a 4-digit number where at least two numbers are repeated, including the corrected Case 1, we can calculate the total number of possible numbers as follows:

 Case 1: All four digits are the same.
 In this case, there are 10 possible numbers (0000, 1111, 2222, ..., 9999).

 Case 2: Three digits are the same, and one digit is different.
 To calculate the number of possible numbers, we need to choose the different digit (10 options) and the position for it (4 options). The remaining three positions will have the same repeated digit. Therefore, the total number of possible numbers is 10 * 4 = 40.

 Case 3: Two pairs of digits are the same.
 In this case, we need to consider the number of ways we can choose two different digits to form the pairs. There are 10 options for the first digit and 9 options for the second digit. However, we divide by 2 to account for the fact that the order of the pairs doesn't matter. So, the number of possible numbers is (10 * 9) / 2 = 45.

 Case 4: Two digits are the same, and the other two digits are different.
 To calculate the number of possible numbers, we need to choose the repeated digit (10 options) and the position for it (4 options). Then, we have two remaining positions for the different digits, which can be filled with any of the 10 available digits in 10 * 10 = 100 ways. Therefore, the total number of possible numbers is 10 * 4 * 100 = 4000.

 Adding up the possible numbers from all four cases, we get:
 10 (Case 1) + 40 (Case 2) + 45 (Case 3) + 4000 (Case 4) = 4095 possible numbers.

 Therefore, for a 4-digit number where there is at least 2 repeated numbers, there are 4095 possible numbers.

    * MY ADDITION: since 0000 cannot exist in our case, we have 4094 possible numbers
*/
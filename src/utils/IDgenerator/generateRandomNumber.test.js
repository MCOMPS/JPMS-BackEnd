const {generateRandomNumber} = require('./generateRandomNumber');

test('generateRandomNumber() returns a 4-digit number', () => {
    const randomNumber = generateRandomNumber();
    expect(randomNumber).toBeGreaterThanOrEqual(1000);
    expect(randomNumber).toBeLessThanOrEqual(9999);
});
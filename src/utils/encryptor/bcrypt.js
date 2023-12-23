const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

const testPassword = async (plaintext)=>{
    const hash = await bcrypt.hash(plaintext, saltRounds);
    const check = await bcrypt.compare(plaintext, hash);
    return check;
}
async function someAsyncFunction() {
    const result = await testPassword('password');
    console.log(result); 
}

someAsyncFunction();


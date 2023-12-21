const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

const generateHash = async (plaintext)=>{
    try {
        const hash = await bcrypt.hash(plaintext, saltRounds);
    } catch (error) {
        console.log(error);
    }
    return hash;
}

const testPassword = async (plaintext,hash)=>{
    try{
        const check = await bcrypt.compare(plaintext, hash);
    }catch(error){
        console.log(error);
    }
    return check;
}



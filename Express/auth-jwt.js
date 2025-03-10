const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const secretkey = 'aea17dd743396596bda7d28793a64153ad134fbfc0f0f95b9a82857c78f9f2f4f70cec384f9e496c3c2ec83df5a38b3b9976dd5637ea62b45ead7717fa05101d69092b6b8a3e3218d6ed3573ead728f04fa4d1fc449d59f2a8d41f3e2ccbc2375f3b2f5cb8f72dd8fd8a05b59db2710fa9c00dfa6cc9f341fbc2903a37f2343214964e1a0325177e359d8daa5fc8836122f38456bd60d289fbe07b5170cfbb3331509bcbe25844a5eda23bb8bda44716545222b6d435903d7abe9f84a5aa2f5ee4141a08f39acf7f9e2eda06506c09e64d1016a2795d53a38b05a3ff7dd5bcf0a3b29bc4100329d8934db64a0f4b90104c312aa53296cfa2a9d25647594ca8eb1820ffe7b7d189510460e7744e23b01cfc880235e0e52865960f2b2fade98dc30423ebb652c60589e5370c319be90ffc44579243df37786f7714055639d3db88f64895d1fa1c2f2bcd6b01ee34b96d3af55aafd0e0e2028c782ddb076061f5def7a785cea1abb14d8802b02f58a52ae0dae56d2aced342c627b9a695050eae617e0767b1fd6b014a732531f6117a4d4fd1c53e785e3a8b8a91e9a402d357e54418ad97f24aef1534e70ba0f16c79651491c0c011349930cb4c5630063a37350126612605021822ead5b9ec2a32cd13651e2282bc9e2ea8ed8d4a57e9301f2b5ef110819ef7077d4686ee1e599e57b15901e1bfa42fa8e5cd0feb0c61006cdca5';

app.use(express.json());

const generateToken = (user = {}) => {
    return jwt.sign(user, secretkey, {expiresIn: '1h'});
};

const authenticationMiddleware = (req, res , next) =>{
    const token = req.headers.authorization;
    if(!token){
        console.log('No token provided');
        return res.status(401).json({message: 'Unauthorized: No token provided'});
    }
    const bearerToken = token.startsWith('Bearer')? token.slice(7) : token;

    jwt.verify(bearerToken, secretkey, (err, decoded) =>{
        if(err){
            console.log('Error verifying token:', err);
            return res.status(401).json({message: 'Unauthorized: Invalid token' })
        }
        req.user = decoded;
        console.log('User authenticated')
        next();
    });
};

app.post('/login', (req, res) => {
    const user = req.body;

    if(!user || Object.keys(user).length ===0){
        return res.status(400).json({message: 'User data is required'});
    }

    const token = generateToken(user);
    res.json({token});
});

app.get('/protected', authenticationMiddleware, (req,res)=>{
    res.json({message: 'Welcome to the protected route'});
});
app.listen(5500, () => {
    console.log('Server running on http://localhost:5500');

});
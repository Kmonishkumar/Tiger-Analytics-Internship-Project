const express=require('express')
const app=express();

const authenticationMiddleware=(req,res,next)=>{
    if(req.headers.authorization==='Valid-token'){
        console.log('User authenticated');
        next();
}

else{
    res.status(401).json({message:'Unauthorized'});
}

}
app.get('/protected', authenticationMiddleware,(req,res)=>{
    res.json({message:'Welcome to the protected route'});
});

app.listen(2500, () => {
    console.log('Server Running on port http://localhost:2500');
});

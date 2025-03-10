const express = require('express');
const app =express()

app.get('/',(req, res) => {
    res.send('Welcome to Page 1');
});
app.get('/path2',(req, res) => {
    res.send('Welcome to Page 2');
});
        
app.listen(5500, () => {
 0});

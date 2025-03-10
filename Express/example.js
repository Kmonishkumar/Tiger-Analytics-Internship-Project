const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')


const app = express()
const port = 3000;

app.use(bodyParser.json());

let users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com',address:"abcd",dept:"cse",degree:"B.E"},
    { id: 2, name: 'John Smith', email: 'john.smith@example.com',address:"fgh",dept:"cse",degree:"B.E" },
    { id: 3, name: 'John Steve', email: 'john.steve@example.com',address:"jkl",dept:"cse",degree:"B.E" },
    { id: 4, name: 'John Head', email: 'john.head@example.com',address:"mno",dept:"cse",degree:"B.E" },
    { id: 5, name: 'John Green', email: 'john.green@example.com',address:"acd",dept:"cse",degree:"B.E" },
    { id: 6, name: 'John Cummins', email: 'john.cummins@example.com',address:"abd",dept:"cse",degree:"B.E" }

];
app.get('/',(req, res) => {
    res.send(users);
});
app.get('/users',(req, res) => {
    res.send(users);
});

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId)
    if (user) {
        res.json(user);
    } else {

        res.status(404).json({ message: 'user not found' });
    }
});
app.get('/username/:name', (req, res) => {
    const userName = req.params.name
    const user = users.find(u => u.name === userName)
    if (user) {
        res.json(user);
    } else {

        res.status(404).json({ message: 'user not found' });
    }
});
app.post('/users' , (req, res) => {
    const newUser = {
        id: users.length+1,
        name:req.body.name,
        email:req.body.email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});
app.put('/users/:id',(req, res) =>{
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if(userIndex !== -1){
        users[userIndex] = {id: userId, ...req.body};
        res.json(users[userIndex]);
    }else{
        res.status(404).json({ message: 'User not found'});
    }
})


console.log('Server running on http://localhost:5500');

app.listen(5500, () => {
});
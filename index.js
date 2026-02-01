require('dotenv').config();

const express = require('express');
const app = express();

const basicAuth = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).send('Authentication required');
    }

    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];

    if (user === process.env.USERNAME && pass === process.env.PASSWORD){
        next();
    }else {
        res.status(401).send('Invalid credentials');
    }
};

app.get('/', (req, res) => {
    res.send('Hello There')
});

app.get('/secret', basicAuth, (req, res) => {
    res.send(process.env.SECRET_MESSAGE);
});
app.listen(process.env.PORT, () => console.log('Server Started!'));
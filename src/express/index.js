const express = require('express');
const myRouter = require('./routes/my');
const offersRouter = require('./routes/offers');

const PORT = 8080;

const app = express();

app.use('/my', myRouter);
app.use('/offers', offersRouter);

app.get('/', (req, res) => res.send(`${req.originalUrl}`));
app.get('/register', (req, res) => res.send(`${req.originalUrl}`));
app.get('/login', (req, res) => res.send(`${req.originalUrl}`));
app.get('/search', (req, res) => res.send(`${req.originalUrl}`));

app.listen(PORT);

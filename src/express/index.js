const express = require('express');
const myRouter = require('./routes/my');
const offersRouter = require('./routes/offers');

const PORT = 8080;

const app = express();

app.use(express.static('markup'));

app.set('views', __dirname + `/templates`);
app.set(`view engine`, `pug`);

app.use('/my', myRouter);
app.use('/offers', offersRouter);

app.get('/', (req, res) => {
  res.render(`index`, {})
});
app.get('/register', (req, res) => {
  res.render(`register`)
});
app.get('/login', (req, res) => res.send(`${req.originalUrl}`));
app.get('/search', (req, res) => res.send(`${req.originalUrl}`));

app.listen(PORT);

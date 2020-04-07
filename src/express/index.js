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
  res.render(`main`, {
    tickets: [1]
  })
});
app.get('/register', (req, res) => {
  res.render(`sign-up`)
});
app.get('/login', (req, res) => {
  res.render(`login`)
});
app.get('/search', (req, res) => {
  res.render(`search-result`, {
    isAuth: true,
    results: [1]
  })
});

app.listen(PORT);

app.use((req, res, next) => {
  res
    .status(404)
    .render(`errors/400`, {
      errorClass: `html-not-found`
    });
});

app.use((err, req, res, next) => {
  res
    .status(500)
    .render(`errors/500`, {
      errorClass: `html-server`
    });
});

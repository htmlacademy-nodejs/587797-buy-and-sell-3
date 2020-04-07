const {Router} = require('express');

offersRouter = Router();

offersRouter.get('/add', (req, res) => res.send(`${req.originalUrl}`));
offersRouter.get('/category/:id', (req, res) => {
  res.render(`offers/category`, {
    isAuth: true
  })
});
offersRouter.get('/edit/:id', (req, res) => res.send(`${req.originalUrl}`));
offersRouter.get('/:id', (req, res) => res.send(`${req.originalUrl}`));

module.exports = offersRouter;

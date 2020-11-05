require('dotenv-flow').config();

const express = require('express');
const app = express();

// Uvoz routera
const homeRouter = require('./routes/home.router');
const accountRouter = require('./routes/account.router');

const port = process.env.PORT || 3000;

//middleware - dekodiranje parametara
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/accounts', accountRouter);
app.use('/', homeRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

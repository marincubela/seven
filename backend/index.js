const express = require('express');
const app = express();

// Uvoz routera
const homeRouter = require('./routes/home.router');

const port = process.env.PORT || 3000;

//middleware - dekodiranje parametara
app.use(express.urlencoded({
  extended: true
}));

app.use('/', homeRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

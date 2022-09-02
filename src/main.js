// @ts-check

const express = require('express');

const app = express();

const PORT = 4000;

app.use('/', (req, res, next) => {
  // res.send('Hello, express world');
  console.log('미들웨어1번');
  next();
});

app.use((req, res, next) => {
  console.log('미들웨어2번');
  next();
});

app.use((req, res, next) => {
  console.log('미들웨어 3번');
  res.send('통 신 종 료');
});

// app.use('/posts', (require, res) => {
//   res.send('Hello, posts!!');
// });

app.listen(PORT, () => {
  console.log(`The express server is runnig at ${PORT}`);
});

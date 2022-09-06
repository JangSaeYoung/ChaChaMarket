// @ts-check

const express = require('express');
// const fs = require('fs');

const app = express();
const PORT = 4000;

// const postsRouter = express.Router();
// const userRouter = express.Router();
const userRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const homeRouter = require('./routes/home');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/users', userRouter);
app.use('/posts', postsRouter);
app.use('/home', homeRouter);

// app.use(express.static('views'));
app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.end(err.message);
});

app.listen(PORT, () => {
  console.log(`The express server is runnig at ${PORT}`);
});
// postsRouter.get('/', (req, res) => {
//   res.send('블로그 글 목록');
// });

// postsRouter.post('/:title', (req, res) => {
//   res.send(`제목이 ${req.params.title}인 글이 등록되었습니다.`);
// });

// app.get('/id/:id/name/:name/gender/:gender', (req, res) => {
//   console.log(req.params);
//   res.send(req.params);
// });

// app.get('/', (req, res) => {
//   console.log(req.query);
//   console.log(req.query.title);
//   console.log(req.query.content);
//   res.send(req.query);
// });

// 메소드 사용
// app.get('/', (res, req) => {
//   res.send('get method');
// });

// app.put('/', (res, req) => {
//   res.send('put method');
// });

// app.delete('/', (res, req) => {
//   res.send('delete method');
// });

// app.post('/', (res, req) => {
//   res.send('post method');
// });

// 본문
// app.get('/:email', (req, res) => {
//   res.send(`email은 ${req.params.email}`);
// });

// app.get('/:password', (req, res) => {
//   res.send(`password은 ${req.params.password}`);
// });

// app.get('/:name', (req, res) => {
//   res.send(`name은 ${req.params.name}`);
// });

// app.get('/:gender', (req, res) => {
//   res.send(`gender은 ${req.params.gender}`);
// });

// app.get('/', (req, res) => {

//   const q = req.query;
//   if (q.email && q.pw && q.name && q.gender) {
//     res.send('Unexpected query');
//   } else {
//     res.send(req.query);
//   }
// });

// @ts-check

const express = require('express');
// const fs = require('fs');

const app = express();
const PORT = 4040;

const userRouter = express.Router();
const postsRouter = express.Router();

app.use('/users', userRouter);
app.use('/posts', postsRouter);

userRouter.get('/', (req, res) => {
  res.send('회원 목록');
});

userRouter.post('/:name', (req, res) => {
  res.send(`이름이 ${req.params.name}인 유저가 등록되었습니다.`);
});

postsRouter.get('/', (req, res) => {
  res.send('블로그 글 목록');
});

postsRouter.post('/:title', (req, res) => {
  res.send(`제목이 ${req.params.title}인 글이 등록되었습니다.`);
});
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

app.listen(PORT, () => {
  console.log(`The express server is runnig at ${PORT}`);
});

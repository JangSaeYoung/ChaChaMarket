// @ts-check

const express = require('express');
// const fs = require('fs');

const app = express();
const PORT = 4000;

const userRouter = express.Router();
const postsRouter = express.Router();

// user 데이터
const USER = [
  {
    id: 'JUDY',
    name: '세영',
    email: 'judy@code.com',
  },
  {
    id: 'DABAL',
    name: '다발이',
    email: 'dabal@code.com',
  },
];

app.use('/users', userRouter);
app.use('/posts', postsRouter);
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('views'));
app.use(express.static('js'));

userRouter.get('/', (req, res) => {
  const userLen = USER.length;
  res.render('index', { USER, userCounts: userLen });
  // res.write('<h1>Hello, Dynamic...</h1>');
  // for (let i = 0; i < USER.length; i++) {
  //   res.write(`<h2>USER ID는 ${USER[i].id}</h2>`);
  //   res.write(`<h2>USER NAMEdms ${USER[i].name}</h2>`);
  // }
  // res.send(USER);
});

userRouter.get('/:id', (req, res) => {
  const userData = USER.find((user) => user.id === req.params.id);

  if (userData) {
    res.send(userData);
  } else {
    res.end('ID not found');
  }
});

// 새로운 회원 추가API
userRouter.post('/', (req, res) => {
  // res.send(`이름이 ${req.params.name}인 유저가 등록되었습니다.`);
  if (req.query.id && req.query.name && req.query.email) {
    const newUser = {
      id: req.query.id,
      name: req.query.name,
      email: req.query.email,
    };
    USER.push(newUser);
    res.send('회원 등록 완료!');
  } else {
    res.send('잘못된 쿼리 입니다.');
  }
});

// 회원 삭제 API
userRouter.delete('/:id', (req, res) => {
  const arrIndex = USER.findIndex((user) => user.id === req.params.id);
  if (arrIndex !== -1) {
    USER.splice(arrIndex, 1);
    res.send('회원정보가 삭제 되었습니다.');
  } else {
    res.end('해당 ID를 가진 회원이 없습니다..');
  }
});

// 회원 수정 API
userRouter.put('/:id', (req, res) => {
  if (req.query.id && req.query.name && req.query.email) {
    const userData = USER.find((user) => user.id === req.params.id);

    if (userData) {
      const arrIndex = USER.findIndex((user) => user.id === req.params.id);
      const modifyUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER[arrIndex] = modifyUser;
      res.send('회원 수정 완료');
    } else {
      res.end('해당 ID를 가진 회원이 없습니다. ');
    }
  } else {
    res.end('부적절한 쿼리 입니다.');
  }
});

// postsRouter.get('/', (req, res) => {
//   res.send('블로그 글 목록');
// });

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

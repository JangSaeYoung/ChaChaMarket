// @ts-check

const express = require('express');

// const fs = require('fs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

require('dotenv').config();
// const LocalStrategy = require('passport-local').Strategy;
// const mongoClient = require('./routes/mongo');
// 위 두 줄은 코드를 모듈화하였기 때문에 서버코드에서는 삭제함. -> localStrategy.js

const app = express();
const PORT = process.env.PORT;

// 몽고디비연결
// const connectDB = require('./routes/connection');

// connectDB();

// parse request to body-parser
// const bodyparser = require('body-parser');
// //=> 기본 기능이여서 불러오지 않아도 됨
// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cookie-parser
app.use(cookieParser('dabal'));

app.use(
  session({
    secret: 'dabal',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

// 패스포트
app.use(passport.initialize());
app.use(passport.session());

// set View engine
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
// const postsRouter = express.Router();
// const userRouter = express.Router();
// 홈 화면 라우터
// const router = require('./routes/index');

const userRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const homeRouter = require('./routes/home');
const signinRouter = require('./routes/signin');
const loginRouter = require('./routes/login');
const chatRouter = require('./routes/chat');
// board
const boardRouter = require('./routes/board');
// localStrategy.js로 분리한 모듈
const passportRouter = require('./routes/passport');

passportRouter();

// load assets
app.use('/', homeRouter);
app.use('/home', homeRouter);
app.use('/users', userRouter);
app.use('/posts', postsRouter);
// app.use('/signin', signinRouter);
app.use('/signin', signinRouter.router);

app.use('/login', loginRouter.router);

app.use('/board', boardRouter);

app.use('/chat', chatRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500);
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

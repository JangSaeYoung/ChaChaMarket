// @te-check
// const { MongoClient } = require('mongodb');

const express = require('express');

const multer = require('multer');

const fs = require('fs');

const router = express.Router();

const mongoClient = require('./mongo');

const login = require('./login');

const dir = './uploads';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now());
  },
});
const limits = {
  fileSize: 1024 * 1028 * 2,
};
const upload = multer({ storage, limits });

// posts 전체 목록 API
router.get('/', login.isLogin, async (req, res) => {
  console.log(req.user);
  const client = await mongoClient.connect();
  const cursor = client.db('chacha_board').collection('notice');
  console.log(cursor);
  const ARTICLE = await cursor.find({}).sort({ _id: -1 }).toArray();
  const articleLen = ARTICLE.length;
  res.render('board', {
    ARTICLE,
    articleCounts: articleLen,
    userId: req.session.userId
      ? req.session.userId
      : req.user?.id
      ? req.user?.id
      : req.signedCookies.user,
  });
});

// 글 쓰기 모드로 이동
router.get('/write', login.isLogin, (req, res) => {
  res.render('boardadd');
});

// 특정 title 조회 API
router.get('/view/title/:title', login.isLogin, async (req, res) => {
  const client = await mongoClient.connect();
  const cursor = client.db('chacha_board').collection('notice');
  const ARTICLE = await cursor.find({}).toArray();
  const arrIndex = ARTICLE.findIndex(
    (article) => article.title === req.params.title
  );
  const selectedArticle = ARTICLE[arrIndex];
  res.render('boardview', { selectedArticle });
});

// 글 추가 기능 수행
router.post('/write', login.isLogin, upload.single('img'), async (req, res) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  console.log('파일=>', req.file);
  if (req.body.title && req.body.content) {
    const date = new Date();
    const today = date.toLocaleDateString();

    const newArticle = {
      id: req.session.userId ? req.session.userId : req.user?.id,
      title: req.body.title,
      userName: req.user?.name ? req.user.name : req.user?.id,
      content: req.body.content,
      date: today,
      img: req.file ? req.file.filename : null,
    };

    const client = await mongoClient.connect();
    const cursor = client.db('chacha_board').collection('notice');
    await cursor.insertOne(newArticle);
    console.log(client);
    res.redirect('/board');
  } else {
    const err = new Error('데이터가 없습니다.');
    err.statusCode = 404;
  }
});

// 글 수정 모드로 이동
router.get('/modify/title/:title', login.isLogin, async (req, res) => {
  const client = await mongoClient.connect();
  const cursor = client.db('chacha_board').collection('notice');
  const selectedArticle = await cursor.findOne({ title: req.params.title });
  console.log(selectedArticle);

  res.render('boardmodify', { selectedArticle });
});

// 글 수정 기능 수행
router.post('/modify/title/:title', login.isLogin, async (req, res) => {
  if (req.body.title && req.body.content) {
    const date = new Date();
    const today = date.toLocaleDateString();
    const client = await mongoClient.connect();
    const cursor = client.db('chacha_board').collection('notice');

    await cursor.updateOne(
      { title: req.params.title },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          date: today,
        },
      }
    );
    res.redirect('/board');
  } else {
    const err = new Error('요청값이 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

// 글 삭제기능 수행

router.delete('/delete/title/:title', login.isLogin, async (req, res) => {
  const client = await mongoClient.connect();
  const cursor = client.db('chacha_board').collection('notice');
  const result = await cursor.deleteOne({ title: req.params.title });

  if (result.acknowledged) {
    res.send('삭제 완료');
  } else {
    const err = new Error('삭제 실패');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;

// @te-check

const express = require('express');

const crypto = require('crypto');

const router = express.Router();
const mongoClient = require('./mongo');

// let salt;

const createHashedPassword = (password) => {
  const salt = crypto.randomBytes(64).toString('base64');
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 10, 64, 'sha512')
    .toString('base64');
  return { hashedPassword, salt };
};

const verifyPassword = (password, salt, userPassword) => {
  const hashed = crypto
    .pbkdf2Sync(password, salt, 10, 64, 'sha512')
    .toString('base64');

  if (hashed === userPassword) return true;
  return false;
};

router.get('/', (req, res) => {
  res.render('signin');
});

router.post('/', async (req, res) => {
  const client = await mongoClient.connect();
  const userCursor = client.db('chacha_board').collection('users');
  const duplicated = await userCursor.findOne({
    id: req.body.id,
  });

  // const hashedPassword = createHashedPassword(req.body.password);
  const passwordData = createHashedPassword(req.body.password);

  if (duplicated === null) {
    const result = await userCursor.insertOne({
      id: req.body.id,
      name: req.body.id,
      email: req.body.email,
      // password: req.body.password,
      password: passwordData.hashedPassword,
      salt: passwordData.salt,
    });
    if (result.acknowledged) {
      res.status(200);
      res.send('회원 가입 성공!<br><a href="/login">로그인 페이지로 이동</a>');
    } else {
      res.status(500);
      res.send(
        '회원 가입 문제 발생.<br><a href="/signin">회원가입 페이지로 이동</a>'
      );
    }
  } else {
    res.status(300);
    res.send(
      '중복된 id 가 존재합니다.<br><a href="/signin>회원가입 페이지로 이동</a>'
    );
  }
});

module.exports = { router, verifyPassword };

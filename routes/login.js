// @te-check

const express = require('express');

const router = express.Router();

const passport = require('passport');
const mongoClient = require('./mongo');

const isLogin = (req, res, next) => {
  if (req.session.login || req.user || req.signedCookies.user) {
    next();
  } else {
    res.status(300);
    res.send(
      '로그인이 필요한 서비스 입니다.<br><a href="/login">로그인 페이지로 이동</a><br><a href="/">메인 페이지로 이동</a>'
    );
  }
};

router.get('/', (req, res) => {
  res.render('login');
});

// passport 적용
router.post('/', async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) {
      return res.send(
        `${info.message}<br><a href="./login">로그인 페이지로 이동</a>`
      );
    }
    // 위에 두 모두를 뚫었다면
    req.logIn(user, (err) => {
      if (err) throw err;
      res.cookie('user', req.body.id, {
        // 쿠키설정값 작성
        expires: new Date(Date.now() + 1000 * 60),
        httpOnly: true,
        signed: true,
      });
      res.redirect('/board');
    });
  })(req, res, next);
});

router.get('/logout', (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
  });
  return res.redirect('/');
  // req.session.destroy((err) => {
  //   if (err) throw err;
  //   res.redirect('/board');
  // });
});

// 네이버로그인
router.get('/auth/kakao', passport.authenticate('kakao'));

router.get(
  '/auth/kakao/callback',
  passport.authenticate('kakao', {
    successRedirect: '/board',
    failureRedirect: '/',
  })
);

module.exports = { router, isLogin };

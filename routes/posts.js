/* eslint-disable comma-dangle */
// @te-check

const express = require('express');

const router = express.Router();

module.exports = router;

// POSTS 데이터
const POSTS = [
  {
    title: '개구리 성장과정',
    content: '개구리의 성장과정을 알아보고 색칠해봅니다.',
  },
  {
    title: '똥이 안나와요!',
    content: '건강한 식습관에 대하여 알아봅니다.',
  },
  {
    title: '인형이 살아있어요!',
    content: '나의 몸을 깨끗하게 해야하는 이유를 알아봅니다.',
  },
  {
    title: '손을 씻어요.',
    content: '나의 몸을 깨끗하게 해야하는 이유를 알아봅니다.',
  },
  {
    title: '손을 씻어요.',
    content: '나의 몸을 깨끗하게 해야하는 이유를 알아봅니다.',
  },
  {
    title: '손을 씻어요.',
    content: '나의 몸을 깨끗하게 해야하는 이유를 알아봅니다.',
  },
];

// posts 전체 목록 API
router.get('/', (req, res) => {
  const postsLength = POSTS.length;
  res.render('posts', { POSTS, postsCounts: postsLength });
});

// 특정 title 조회 API
router.get('/:title', (req, res) => {
  const postData = POSTS.find((user) => user.id === req.params.id);

  if (postData) {
    res.send(postData);
  } else {
    const err = new Error('TITLE NOT FOUND');
    err.statusCode = 404;
    throw err;
  }
});

// 새로운 글 추가 API
router.post('/', (req, res) => {
  if (Object.keys(req.query).length >= 1) {
    if (req.query.title && req.query.content) {
      const newPost = {
        id: req.query.id,
        title: req.query.title,
        content: req.query.content,
      };
      POSTS.push(newPost);
      res.redirect('/posts');
      // res.send('포스트 등록 완료!');
    } else {
      const err = new Error('TITLE NOT FOUND');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    if (req.body.title && req.body.content) {
      const newPost = {
        title: req.body.title,
        content: req.body.content,
      };
      POSTS.push(newPost);
      res.redirect('/posts');
      // res.send('포스트 등록 완료!');
    } else {
      const err = new Error('Unexpected Form data');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('No data');
    err.statusCode = 404;
    throw err;
  }
});

// 특정 title 가진 글 수정 API
router.put('/:title', (req, res) => {
  if (req.query.title && req.query.content) {
    const postData = POSTS.find((post) => post.title === req.params.title);

    if (postData) {
      const arrIndex = POSTS.findIndex(
        (post) => post.title === req.params.title
      );

      const modifyPost = {
        title: req.query.title,
        content: req.query.content,
      };

      POSTS[arrIndex] = modifyPost;
      res.send('title 수정 완료');
    } else {
      const err = new Error('TITLE NOT FOUND');
      err.statusCode = 404;
    }
  } else {
    const err = new Error('TITLE NOT FOUND');
    err.statusCode = 404;
    throw err;
  }
});

// 특정 title 삭제 API
router.delete('/:title', (req, res) => {
  const arrIndex = POSTS.findIndex((post) => post.title === req.params.title);
  if (arrIndex !== -1) {
    POSTS.splice(arrIndex, 1);
    res.send('TITLE 글이 삭제 되었습니다.');
  } else {
    const err = new Error('TITLE NOT FOUND');
    err.statusCode = 404;
    throw err;
  }
});

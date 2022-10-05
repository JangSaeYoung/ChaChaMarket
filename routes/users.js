// @te-check

const express = require('express');

const router = express.Router();

module.exports = router;

// user 데이터
const USER = [
  {
    id: 'JUDY',
    name: '얼굴 그리기',
    email: 'judy@code.com',
    image:
      'https://i.pinimg.com/originals/26/a8/5b/26a85b9fa244686e694f1fd2efeb538a.png',
  },
  {
    id: 'DABAL',
    name: '도마뱀 색칠하기',
    email: 'dabal@code.com',
    image:
      'https://i.pinimg.com/originals/26/a8/5b/26a85b9fa244686e694f1fd2efeb538a.png',
  },
  {
    id: '김쌤',
    name: '전통옷색칠하기',
    email: 'dabal@code.com',
    image:
      'https://i.pinimg.com/originals/26/a8/5b/26a85b9fa244686e694f1fd2efeb538a.png',
  },
  {
    id: '파워쌤',
    name: '운동종류',
    email: 'dabal@code.com',
    image:
      'https://i.pinimg.com/originals/26/a8/5b/26a85b9fa244686e694f1fd2efeb538a.png',
  },
  {
    id: '알럽어린이',
    name: '개미 관찰',
    email: 'dabal@code.com',
    image:
      'https://i.pinimg.com/originals/26/a8/5b/26a85b9fa244686e694f1fd2efeb538a.png',
  },
];

router.get('/', (req, res) => {
  const userLen = USER.length;
  res.render('users', { USER, userCounts: userLen, imgName: 'dabal.png' });
});

router.get('/:id', (req, res) => {
  const userData = USER.find((user) => user.id === req.params.id);

  if (userData) {
    res.send(userData);
  } else {
    // res.end('ID not found');
    const err = new Error('ID NOT FOUND');
    err.statusCode = 404;
    throw err;
  }
});

// 새로운 회원 추가API
router.post('/', (req, res) => {
  // res.send(`이름이 ${req.params.name}인 유저가 등록되었습니다.`);
  if (req.query.id && req.query.name && req.query.email && req.query.image) {
    const newUser = {
      id: req.query.id,
      name: req.query.name,
      email: req.query.email,
      image: req.query.image,
    };
    USER.push(newUser);
    res.send('회원 등록 완료!');
  } else {
    const err = new Error('ID NOT FOUND');
    err.statusCode = 404;
    // res.send('잘못된 쿼리 입니다.');
    throw err;
  }
});

// 회원 삭제 API
router.delete('/:id', (req, res) => {
  const arrIndex = USER.findIndex((user) => user.id === req.params.id);
  if (arrIndex !== -1) {
    USER.splice(arrIndex, 1);
    res.send('회원정보가 삭제 되었습니다.');
  } else {
    const err = new Error('ID NOT FOUND');
    err.statusCode = 404;
    throw err;
  }
});

// 회원 수정 API
router.put('/:id', (req, res) => {
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
      const err = new Error('ID NOT FOUND');
      err.statusCode = 404;
      // res.end('해당 ID를 가진 회원이 없습니다. ');
    }
  } else {
    // res.end('부적절한 쿼리 입니다.');
    const err = new Error('ID NOT FOUND');
    err.statusCode = 404;
    throw err;
  }
});

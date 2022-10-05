// @te-check

const express = require('express');

const router = express.Router();

module.exports = router;

// POSTS 데이터
const NOTICE = [
  {
    id: 1,
    title: '3월 공지사항',
    content: '3월 적응기간 안내입니다.',
    date: '2022.09.05',
  },
  {
    id: 2,

    title: '4월 공지사항',
    content: '봄철 전염병 예방 안내입니다.',
    date: '2022.09.05',
  },
  {
    id: 3,

    title: '5월 공지사항',
    content: '5월 어린이날 행사 안내입니다.',
    date: '2022.09.05',
  },
  {
    id: 4,
    title: '5월 공지사항',
    content: '5월 어린이날 행사 안내입니다.',
    date: '2022.09.05',
  },
  {
    id: 5,

    title: '5월 공지사항',
    content: '5월 어린이날 행사 안내입니다.',
    date: '2022.09.05',
  },
  {
    id: 6,

    title: '5월 공지사항',
    content: '5월 어린이날 행사 안내입니다.',
    date: '2022.09.05',
  },
  {
    id: 7,

    title: '5월 공지사항',
    content: '5월 어린이날 행사 안내입니다.',
    date: '2022.09.05',
  },
  {
    id: 8,

    title: '5월 공지사항',
    content: '5월 어린이날 행사 안내입니다.',
    date: '2022.09.05',
  },
  {
    id: 9,

    title: '5월 공지사항',
    content: '5월 어린이날 행사 안내입니다.',
    date: '2022.09.05',
  },
  {
    id: 10,

    title: '5월 공지사항',
    content: '5월 어린이날 행사 안내입니다.',
    date: '2022.09.05',
  },
];

router.get('/', (req, res) => {
  const noticeLen = NOTICE.length;

  res.render('boardview', { NOTICE, noticeCounts: noticeLen });
});

// posts 전체 목록 API
// router.get('/', login.isLogin, async (req, res) => {
//   console.log(req.user);
//   const client = await mongoClient.connect();
//   const cursor = client.db('chacha_board').collection('notice');
//   console.log(cursor);
//   const ARTICLE = await cursor.find({}).sort({ _id: -1 }).toArray();
//   const articleLen = ARTICLE.length;
//   res.render('boardview', {
//     ARTICLE,
//     articleCounts: articleLen,
//     userId: req.session.userId
//       ? req.session.userId
//       : req.user?.id
//       ? req.user?.id
//       : req.signedCookies.user,
//   });
// });

// router.get('/view/title/:title', login.isLogin, async (req, res) => {
//   const client = await mongoClient.connect();
//   const cursor = client.db('chacha_board').collection('notice');
//   const ARTICLE = await cursor.find({}).toArray();
//   const arrIndex = ARTICLE.findIndex(
//     (article) => article.title === req.params.title
//   );
//   const selectedArticle = ARTICLE[arrIndex];
//   res.render('boardview', { selectedArticle });
// });

// 특정 title 조회 API
router.get('/:id', (req, res) => {
  const noticeData = NOTICE.find((post) => post.id === req.params.id);

  if (noticeData) {
    res.send(noticeData);
  } else {
    const err = new Error('ID NOT FOUND못찾겠어');
    err.statusCode = 404;
    throw err;
  }
});

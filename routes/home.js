// @te-check

const express = require('express');

const router = express.Router();

module.exports = router;

// TOYS 데이터
const TOYS = [
  {
    id: 1,
    title: '백두산 퍼즐',
    region: '서귀포시',
    period: '3개월',
    image: './images/pexels-antoni-shkraba-6219073.jpg',
    badge: '원목',
    age: '3+',
    status: 'HOT',
  },
  {
    id: 2,
    title: '잠수함 퍼즐',
    region: '서울 종로구',
    period: '1년 이상',
    image: './images/pexels-antoni-shkraba-6219095.jpg',
    badge: '원목',
    age: '1+',
    status: 'HOT',
  },
  {
    id: 3,
    title: '무지개 퍼즐',
    region: '서울 동대문구',
    period: '1년 이상',
    image: './images/pexels-antoni-shkraba-6219105.jpg',
    badge: '원목',
    age: '3+',
    status: 'NEW',
  },
  {
    id: 4,
    title: '하마 유니콘',
    region: '대전 유성구',
    period: '6개월 이상',
    image: './images/pexels-karolina-grabowska-4887163.jpg',
    badge: '인형',
    age: '1+',
    status: 'HOT',
  },
  {
    id: 5,
    title: '삑삐빅 게임기',
    region: '서울 양천구',
    period: '2년 이상',
    image: './images/pexels-luis-quintero-2263816.jpg',
    badge: '기계',
    age: '5+',
    status: 'NEW',
  },
  {
    id: 6,
    title: '소형 비행기',
    region: '인천광역시',
    period: '4개월 이상',
    image: './images/pexels-monstera-7411985.jpg',
    badge: '기계',
    age: '4+',
    status: 'NEW',
  },
  {
    id: 7,
    title: '움직이는 아톰',
    region: '충청남도',
    period: '5년 이상',
    image: './images/pexels-ryutaro-tsukata-6249454.jpg',
    badge: '기계',
    age: '4+',
    status: 'NEW',
  },
  {
    id: 8,
    title: '캣잎 고양이 쿠션',
    region: '부산광역시',
    period: '6개월 이상',
    image: './images/pexels-stephanie-ho-994172.jpg',
    badge: '인형',
    age: '2+',
    status: 'HOT',
  },
];

// posts 전체 목록 API
router.get('/', (req, res) => {
  const toyLength = TOYS.length;
  const toyBackgroundImg = TOYS.image;
  res.render('home', {
    TOYS,
    toyCounts: toyLength,
    imgName: toyBackgroundImg,
    popup: req.cookies.popup,
  });
});

router.post('/cookie', (req, res) => {
  res.cookie('popup', 'hide', {
    // expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    expires: new Date(Date.now() + 1000 * 60),
    httpOnly: true,
  });
  res.send('쿠키생성 성공');
});

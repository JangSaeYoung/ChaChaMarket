// @ts-check
/*eslint-disable */

// function addMember() {
//   alert('공지사항 작성');
// }
// // POSTS 데이터
// const NOTICE = [
//   {
//     id: 1,
//     title: '3월 공지사항',
//     content: '3월 적응기간 안내입니다.',
//     date: '2022.09.05',
//   },
//   {
//     id: 2,

//     title: '4월 공지사항',
//     content: '봄철 전염병 예방 안내입니다.',
//     date: '2022.09.05',
//   },
//   {
//     id: 3,

//     title: '5월 공지사항',
//     content: '5월 어린이날 행사 안내입니다.',
//     date: '2022.09.05',
//   },
//   {
//     id: 4,
//     title: '5월 공지사항',
//     content: '5월 어린이날 행사 안내입니다.',
//     date: '2022.09.05',
//   },
//   {
//     id: 5,

//     title: '5월 공지사항',
//     content: '5월 어린이날 행사 안내입니다.',
//     date: '2022.09.05',
//   },
//   {
//     id: 6,

//     title: '5월 공지사항',
//     content: '5월 어린이날 행사 안내입니다.',
//     date: '2022.09.05',
//   },
//   {
//     id: 7,

//     title: '5월 공지사항',
//     content: '5월 어린이날 행사 안내입니다.',
//     date: '2022.09.05',
//   },
//   {
//     id: 8,

//     title: '5월 공지사항',
//     content: '5월 어린이날 행사 안내입니다.',
//     date: '2022.09.05',
//   },
//   {
//     id: 9,

//     title: '5월 공지사항',
//     content: '5월 어린이날 행사 안내입니다.',
//     date: '2022.09.05',
//   },
//   {
//     id: 10,

//     title: '5월 공지사항',
//     content: '5월 어린이날 행사 안내입니다.',
//     date: '2022.09.05',
//   },
// ];

// //한 페이지에 보일 개수
// const rowsPerpage = 3;
// // const rows = document.querySelectorAll('.list tbody tr');
// const rows = NOTICE;
// const rowsCount = rows.length; // 10/3 3.33 -> 4로 만들어야함. 페이지
// // console.log(rows);

// //페이지 나누기
// const pageCount = Math.ceil(rowsCount / rowsPerpage);
// console.log(pageCount);
// const numbers = document.querySelectorAll('#pagination > #numbers');
// // const numbers = document.getElementById('numbers');
// console.log('numbers는 ->', numbers);
// // 페이지네이션 생성
// /*
// 대상.innerHTML =코드  <!-- <li><a href="">1</a></li>
// for(초기값;조건;.증감){}
// */

// for (let i = 1; i <= pageCount; i++) {
//   numbers.innerHTML += `<li><a href="#">${i}</a></li>`;
// }

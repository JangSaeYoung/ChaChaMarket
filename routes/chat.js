// @te-check

const express = require('express');

const router = express.Router();

const WebSocketServer = require('ws').Server;
// 위 -> 웹소켓 서버 가지고옴.
const wss = new WebSocketServer({ port: 4040 });
// 위 -> 사용햐야하므로 담아옴 ({포트가 같아야함.})

wss.on('connection', (ws) => {
  // 클라이언트가 접속하면 뜬다

  // ws.send('저는 서버입니다🐶 들리나요?');

  // ws.on('message', (message) => {
  //   console.log(message.toString());

  wss.clients.forEach((client) => {
    client.send(
      `새로운 유저가 참가 했습니다. 현재 유저 수는 ${wss.clients.size}`
    );
  });

  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      // client.send(message.toString());
      client.send(`${message}`);
    });
  });

  ws.on('close', () => {
    wss.clients.forEach((client) => {
      client.send(`유저 한명이 나갔습니다. 현재 유저 수 ${wss.clients.size}`);
    });
  });
});

router.get('/', (req, res) => {
  res.render('chat');
});

module.exports = router;

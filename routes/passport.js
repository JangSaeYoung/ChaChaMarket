const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// 네이버
// const NaverLocalStrategy = require('passport-naver').Strategy;
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;

const verifyModule = require('./signin');
// 몽고 전략 필요
const mongoClient = require('./mongo');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'id',
        passwordField: 'password',
      },
      async (id, password, cb) => {
        const client = await mongoClient.connect();
        const userCursor = client.db('chacha_board').collection('users');
        const result = await userCursor.findOne({ id });
        if (result !== null) {
          console.log(result.salt);
          if (result.salt !== undefined) {
            const passwordResult = verifyModule.verifyPassword(
              password,
              result.salt,
              result.password
            );
            if (passwordResult) {
              cb(null, result);
            } else {
              cb(null, result);
            }
          } else if (result.password === password) {
            cb(null, result);
          } else {
            cb(null, false, { message: '비밀번호가 다릅니다.' });
          }
        } else {
          cb(null, false, { message: '해당 id 가 없습니다.' });
        }
      }
    )
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser(async (id, cb) => {
    const client = await mongoClient.connect();
    const userCursor = client.db('chacha_board').collection('users');
    const result = await userCursor.findOne({ id });

    if (result != null) cb(null, result);
  });
};

// passport.use(
//   new NaverLocalStrategy(
//     {
//       clientID: process.env.NAVER_Client,
//       clientSecret: process.env.NAVER_Client_SECRET,
//       callbackURL: process.env.NAVER_CB_URL,
//     },
//     async (accessToken, refreshToken, profile, cb) => {
//       console.log('네이버profile->', profile);

//       const client = await mongoClient.connect();
//       const userCursor = client.db('chacha_board').collection('users');
//       const result = await userCursor.findOne({ id: profile.id });

//       if (result !== null) {
//         cb(null, result);
//       } else {
//         const newNaverUser = {
//           id: profile.id,
//           name:
//             profile.displayName !== undefined
//               ? profile.displayName
//               : profile.email[0].value,
//           provider: profile.provider,
//         };
//         const dbResult = await userCursor.insertOne(newNaverUser);
//         // dbResult변수 새로 만들어서 데이터 담음.
//         if (dbResult.acknowledged) {
//           cb(null, newNaverUser);
//         } else {
//           cb(null, false, { message: '회원 생성 에러' });
//         }
//       }
//     }
//   )
// );

// passport.serializeUser((user, cb) => {
//   cb(null, user);
// });

// passport.deserializeUser(async (user, cb) => {
//   cb(null, user);
//   // const client = await mongoClient.connect();
//   // const userCursor = client.db('chacha_board').collection('users');
//   // const result = await userCursor.findOne({ id });

//   // if (result != null) cb(null, result);
// });

// 구글

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_Client,
//       clientSecret: process.env.GOOGLE_Client_SECRET,
//       callbackURL: process.env.GOOGLE_CB_URL,
//     },
//     async (accessToken, refreshToken, profile, cb) => {
//       // console.log('네이버profile->', profile);
//       console.log('구글profile->', profile);

//       const client = await mongoClient.connect();
//       const userCursor = client.db('chacha_board').collection('users');
//       const result = await userCursor.findOne({ id: profile.id });

//       if (result !== null) {
//         cb(null, result);
//       } else {
//         const newUser = {
//           id: profile.id,
//           name:
//             profile.displayName !== undefined
//               ? profile.displayName
//               : profile.emails[0].value,
//           provider: profile.provider,
//         };
//         const dbResult = await userCursor.insertOne(newUser);
//         // dbResult변수 새로 만들어서 데이터 담음.
//         if (dbResult.acknowledged) {
//           cb(null, newUser);
//         } else {
//           cb(null, false, { message: '회원 생성 에러' });
//         }
//       }
//     }
//   )
// );

// passport.serializeUser((user, cb) => {
//   cb(null, user);
// });

// passport.deserializeUser(async (user, cb) => {
//   cb(null, user);
//   // const client = await mongoClient.connect();
//   // const userCursor = client.db('chacha_board').collection('users');
//   // const result = await userCursor.findOne({ id });

//   // if (result != null) cb(null, result);
// });

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_Client,
      callbackURL: process.env.KAKAO_CB_URL,
    },

    async (id, password, cb) => {
      const client = await mongoClient.connect();
      const userCursor = client.db('chacha_board').collection('users');
      const result = await userCursor.findOne({ id });
      if (result !== null) {
        console.log(result.salt);
        if (result.salt !== undefined) {
          const passwordResult = verifyModule.verifyPassword(
            password,
            result.salt,
            result.password
          );
          if (passwordResult) {
            cb(null, result);
          } else {
            cb(null, result);
          }
        } else if (result.password === password) {
          cb(null, result);
        } else {
          cb(null, false, { message: '비밀번호가 다릅니다.' });
        }
      } else {
        cb(null, false, { message: '해당 id 가 없습니다.' });
      }
    }

    // async (accessToken, refreshToken, profile, cb) => {
    //   console.log('카카오profile->', profile);

    //   const client = await mongoClient.connect();
    //   const userCursor = client.db('chacha_board').collection('users');
    //   const result = await userCursor.findOne({ id: profile.id });

    //   if (result !== null) {
    //     if (idResult.salt !== undefined) {
    //       const passwordResult = verifyModule(
    //         password,
    //         idResult.salt,
    //         idResult.password
    //       );

    //       if (passwordResult) {
    //         cb(null, idResult);
    //       } else {
    //         cb(null, false, { message: '비밀번호가 틀렸습니다.' });
    //       }
    //     } else {
    //     }

    //     cb(null, result);
    //   } else {
    //     const newUser = {
    //       id: profile.id,
    //       name:
    //         profile.displayName !== undefined
    //           ? profile.displayName
    //           : profile.emails[0].value,
    //       provider: profile.provider,
    //     };
    //     const dbResult = await userCursor.insertOne(newUser);
    //     // dbResult변수 새로 만들어서 데이터 담음.
    //     if (dbResult.acknowledged) {
    //       cb(null, newUser);
    //     } else {
    //       cb(null, false, { message: '회원 생성 에러' });
    //     }
    //   }
    // }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser(async (user, cb) => {
  cb(null, user);
  // const client = await mongoClient.connect();
  // const userCursor = client.db('chacha_board').collection('users');
  // const result = await userCursor.findOne({ id });

  // if (result != null) cb(null, result);
});

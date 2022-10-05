// const Userdb = require('../model/model');

// exports.create = (req, res) => {
//   // validate request
//   // if (req.body) {
//   //   res.status(400).send({
//   //     message: 'Content can not be emtpy',
//   //   });
//   // }
//   // save user in the database
//   const user = new Userdb({
//     name: req.body.name,
//     title: req.body.title,
//   });

//   user
//     .save(user)
//     .then((data) => {
//       // res.send(data);
//       res.redirect('/boardadd');
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || 'Some err...',
//       });
//     });
// };
// // retrive adn return all users/ retrive and return a single user
// exports.find = (req, res) => {
//   if (req.query.id) {
//     const id = req.query.id;
//     Userdb.findById(id)
//       .then((data) => {
//         if (!data) {
//           res.status(404).send({ message: `Not found user with id${id}` });
//         } else {
//           res.send(data);
//         }
//       })
//       .catch((err) => {
//         res.status(500).send({ message: `Erro retrieving user with id${id}` });
//       });
//   } else {
//     Userdb.find()
//       .then((user) => {
//         res.send(user);
//       })
//       .catch((err) => {
//         res.status(500).send({ message: err.message || 'Error Occurred....' });
//       });
//   }
// };

// // update a new idetifind user by user id
// exports.update = (req, res) => {
//   // if (req.body) {
//   //   return res.status(400).send({ message: 'Data to update can not be empty' });
//   // }
//   const id = req.params.id;
//   Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot updata user with ${id}. Maybe user not found!`,
//         });
//       } else {
//         res.send(data);
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({ message: 'Error Update user information' });
//     });
// };

// // Delete a user with specfied user id in the requeset

// exports.delete = (req, res) => {
//   const id = req.params.id;
//   Userdb.findByIdAndDelete(id)
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({ message: 'Error... ' });
//       } else {
//         res.send({
//           message: 'User was deleted successfully! ',
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: `Could not delete user with id=${id}`,
//       });
//     });
// };

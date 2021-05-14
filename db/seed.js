// const {
//   models: { Med, User },
// } = require("./index");

// const { Sequelize } = require("sequelize");

// module.exports = db;

// const meds = [
//   {
//     id: 1,
//     name: "testMed",
//     quantity: 1,
//     color: "green",
//     instructions: "take by mouth every day",
//     imageUrl:
//       "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/icHF.reI8xTk/v0/-1x-1.jpg",
//     time: "07:00",
//   },
// ];

// const users = [
//   {
//     email: "shellybelly94@yahoo.com",
//     password: "password",
//     phoneNumber: "9788888888",
//     firstName: "michelle",
//     lastName: "martin",
//     DOB: "07/03/1994",
//     ICE: "carol martin",
//     isAdmin: true,
//   },
//   {
//     email: "tim94@yahoo.com",
//     password: "password1",
//     phoneNumber: "4845530716",
//     firstName: "tim",
//     lastName: "carlon",
//     DOB: "02/19/1994",
//     ICE: "carol martin",
//     isAdmin: false,
//   },
// ];

// const syncAndSeed = async () => {
//   try {
//     await db.sync({ force: true });

//     await Promise.all(
//       users.map((user) =>
//         User.create({
//           email: user.email,
//           password: user.password,
//           phoneNumber: user.phoneNumber,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           DOB: user.DOB,
//           ICE: user.ICE,
//           isAdmin: user.isAdmin,
//         })
//       )
//     );
//     await Promise.all(
//       meds.map((med) =>
//         Med.create({
//           id: med.id,
//           name: med.name,
//           quantity: med.quantity,
//           color: med.color,
//           instructions: med.instructions,
//           imageUrl: med.imageUrl,
//           time: med.time,
//         })
//       )
//     );

//     console.log("medications and users seeded into db");
//     await db.close();
//   } catch (er) {
//     console.error(er);
//   }
// // };

// syncAndSeed();

// module.exports = {
//   db,
//   syncAndSeed,
//   models: {
//     User,
//     Med,
//   },
// };

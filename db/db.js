const { Sequelize, DataTypes } = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/thelma",
  { logging: false }
);

const User = db.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get: function () {
      return `${this.firstName} ${this.lastName}`;
    },
  },
  DOB: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  ICE: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      isBool(value) {
        if (value === true || value === false) {
          // console.log('valid isAdmin');
        } else {
          throw new Error("Only boolean values are allowed");
        }
      },
    },
  },
});

const Med = db.define("med", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  instructions: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});
User.hasMany(Med);
Med.belongsTo(User);

const meds = [
  {
    id: 1,
    name: "testMed",
    quantity: 1,
    color: "green",
    instructions: "take by mouth every day",
    imageUrl:
      "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/icHF.reI8xTk/v0/-1x-1.jpg",
    time: "07:00",
  },
];

const users = [
  {
    email: "shellybelly94@yahoo.com",
    password: "password",
    phoneNumber: "9788888888",
    firstName: "michelle",
    lastName: "martin",
    DOB: "07/03/1994",
    ICE: "carol martin",
    isAdmin: true,
  },
  {
    email: "tim94@yahoo.com",
    password: "password1",
    phoneNumber: "4845530716",
    firstName: "tim",
    lastName: "carlon",
    DOB: "02/19/1994",
    ICE: "carol martin",
    isAdmin: false,
  },
];

const syncAndSeed = async () => {
  await db.sync({ force: true });

  await Promise.all(
    users.map((user) =>
      User.create({
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        DOB: user.DOB,
        ICE: user.ICE,
        isAdmin: user.isAdmin,
      })
    )
  );
  await Promise.all(
    meds.map((med) =>
      Med.create({
        name: med.name,
        quantity: med.quantity,
        color: med.color,
        instructions: med.instructions,
        imageUrl: med.imageUrl,
        time: med.time,
      })
    )
  );

  console.log("medications and users seeded into db");
  await db.close();
};

module.exports = {
  models: {
    Med,
    User,
  },
  db,
  syncAndSeed,
};

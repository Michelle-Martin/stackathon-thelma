const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const {
  db,
  syncAndSeed,
  models: { Med, User },
} = require("../db/index");

const router = require("express").Router();

//Body parsing middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

// Static Files

app.use(express.static(path.join(__dirname, "..", "public")));
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, ".", "public", "index.html"));
});

// ReactDOM.render(
//   <Provider store={store}>
//     <GlobalStyle />
//     <Main />
//   </Provider>,

//   document.getElementById("root")
// );

const init = async () => {
  try {
    await syncAndSeed();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server listening on PORT: ${PORT}`);
    });
  } catch (ex) {
    console.log(ex);
  }
};

router.get("/meds", async (req, res, next) => {
  try {
    const meds = await Med.findAll();
    res.send(meds);
  } catch (ex) {
    next(ex);
  }
});

router.post("/meds", async (req, res, next) => {
  try {
    const newMed = await Med.create(req.body);
    res.send(newMed);
  } catch (ex) {
    next(ex);
  }
});
router.put("/meds/:id", async (req, res, next) => {
  try {
    const updatedCampus = await Med.findByPk(req.params.id).update(req.body);
    res.send(updatedMed);
  } catch (ex) {
    next(ex);
  }
});

router.delete("/meds/:id", async (req, res, next) => {
  try {
    const med = Med.findByPk(req.params.id);
    await med.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

router.get("/users", async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (ex) {
    console.log(ex);
  }
  next();
});

router.get("/user/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});

init();

module.exports = { app, router };

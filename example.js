const { Router } = require("./lib");

const router = new Router();
router.attach(Router.buffer, "app");

/**
router.use(middleware());
router.get("/", (req, res) => {
  res.send("Hi");
  res.file("index.html")
  res.middleware();
});
router.attach(Router.buffer, "app");
*/

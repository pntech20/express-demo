module.exports = (app) => {
  const rate = require("../controllers/rate.controller");
  var router = require("express").Router();
  router.post("/:postId/", rate.create);
  router.get("/", rate.findAll);
  router.get("/:postId/average-rate", rate.averageRate);
  app.use("/api/rates", router);
};

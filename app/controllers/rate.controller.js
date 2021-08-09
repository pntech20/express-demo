const db = require("../models");
const Rate = db.rates;
const Post = db.posts;
const response = require("../utils/response");

exports.findAll = async (req, res) => {
  try {
    const result = await Rate.find();
    res.send(result);
  } catch (err) {
    res
      .status(400)
      .send(
        response.sendError(
          err.message || "Some error occurred while retrieving Rate."
        )
      );
  }
};

exports.create = async (req, res) => {
  try {
    await Post.findById(req.params.postId);
    const numberStat = Number(req.body.rate);
    if (1 <= numberStat && numberStat <= 5) {
      const rate = new Rate({
        postId: req.params.postId,
        numberStat: numberStat,
      });
      const rateData = await rate.save();
      res.send(rateData);
    } else {
      res.status(400).send(response.sendError("Invalid rate"));
    }
  } catch (error) {
    res
      .status(400)
      .send(response.sendError("Not found Post with id " + req.params.postId));
  }
};

exports.averageRate = async (req, res) => {
  try {
    await Post.findById(req.params.postId);
    const rateData = await Rate.find({ postId: req.params.postId });
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const resultStart = rateData.map((i) => i.numberStat).reduce(reducer);
    res.send({
      AverageRate: resultStart / rateData.length,
    });
  } catch (error) {
    res
      .status(400)
      .send(response.sendError("Not found Post with id " + req.params.postId));
  }
};

const db = require("../models");
const Post = db.posts;
const validation = require("../utils/validation");
const response = require("../utils/response");

exports.create = async (req, res) => {
  const post = new Post({
    name: req.body.name,
    description: req.body.description,
  });

  try {
    const result = await post.save();
    res.send(result);
  } catch (err) {
    res
      .status(400)
      .send(
        response.sendError(
          err.message || "Some error occurred while creating the Post."
        )
      );
  }
};

exports.findAll = async (req, res) => {
  try {
    const result = await Post.find();
    res.send(result);
  } catch (err) {
    res
      .status(400)
      .send(
        response.sendError(
          err.message || "Some error occurred while retrieving Post."
        )
      );
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Post.findById(id);
    res.send(result);
  } catch (err) {
    res
      .status(400)
      .send(
        response.sendError(err.message || "Error retrieving Post with id=" + id)
      );
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    if (req.body.name && !validation.validationName(req.body.name)) {
      res
        .status(400)
        .send(response.sendError(`Please fill a name min 6 chars`));
    }
    await Post.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    res.send(response.sendSuccess("Post was updated successfully!"));
  } catch (err) {
    res
      .status(400)
      .send(
        response.sendError(err.message || "Error updating Post with id=" + id)
      );
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    await Post.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    res.send(response.sendSuccess("Post was deleted successfully!"));
  } catch (err) {
    res
      .status(400)
      .send(
        response.sendError(err.message || "Error delete Post with id=" + id)
      );
  }
};

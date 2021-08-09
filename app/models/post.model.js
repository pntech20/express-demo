module.exports = (mongoose) => {
  const validation = require("../utils/validation");
  const schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        validate: [validation.validationName, "Please fill a name min 6 chars"],
      },
      description: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Post = mongoose.model("post", schema);
  return Post;
};

module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      postId: { type: String, required: true },
      numberStat: { type: Number, required: true },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Rate = mongoose.model("rate", schema);
  return Rate;
};

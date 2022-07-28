const errorHandler = async (err, req, res, next) => {
  console.log(err);
  return res.status(404).json({ msg: "There is an Error" });
};

module.exports = errorHandler;

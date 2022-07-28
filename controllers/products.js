const getAllProductsStatic = async (req, res) => {
  throw new Error("This is the Error");
  res.status(200).json({ msg: "Products testing Route" });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "Products Route" });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};

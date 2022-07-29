const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  // throw new Error("This is the Error");
  // const search = "woo";
  const product = await Product.find({}).sort("-name price");
  res.status(200).json({ nbhits: product.length, product });
};

const getAllProducts = async (req, res) => {
  // try {
  //   // const product = await Product.find({}).where(name).equals("Saroj");
  //   console.log(req.query);
  //   // res.status(200).json({ product });
  // } catch (error) {
  //   throw new Error("This is the Error");
  // }

  const { featured, company, name, rating, sort } = req.query;

  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (rating) {
    queryObject.rating = { $gte: rating };
  }

  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("-rating");
  }
  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};

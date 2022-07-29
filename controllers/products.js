const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  // throw new Error("This is the Error");
  // const search = "woo";
  const product = await Product.find({ price: { $gte: 30, $lte: 100 } })
    .sort("price")
    .select("price");
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

  const { featured, company, name, sort, fields, numericFilters } = req.query;

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

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "eq",
    };
    const regEx = /\b(<|>|<=|=|>=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: value };
      }
    });
  }

  console.log(queryObject);

  let result = Product.find(queryObject);
  //Sorting
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("-rating");
  }
  //fields
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};

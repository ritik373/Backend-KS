const ProductSummary = require("../Models/IndexModel");
exports.PostProduct = async (req, res, next) => {
  try {
    const sellingPrice = req.body.sellingPrice;
    const productName = req.body.productName;
    const Product = await ProductSummary.create({ sellingPrice, productName });
    res.send(200).json({ data: Product });
  } catch (error) {
    console.log("error:", error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await ProductSummary.findAll();
    res.status(200).json({ product });
    res.send("hello");
  } catch (error) {
    console.log("error:", error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ err: "Define Id" });
    }
    const Id = req.params.id;
    await ProductSummary.destroy({ where: { id: Id } });
    res.send(200);
    next();
  } catch (error) {
    console.log("error:", error);
  }
};

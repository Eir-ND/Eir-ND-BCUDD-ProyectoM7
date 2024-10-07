import Product from "../models/product.model.js";

export const findAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      message: "Products successfully obtained",
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error getting products", error });
  }
};

export const findOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json({
      msg: "Product successfully obtained",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Product not found", error });
  }
};

export const create = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const newProduct = new Product({
      title,
      description,
      price,
    });
    const savedProduct = await newProduct.save();
    res.json({
      message: "Product successfully created",
      data: savedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error creating a product", error });
  }
};

export const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.json({
      message: "Product deleted",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error deleting a product", error });
  }
};

export const update = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { title, description, price },
      { new: true }
    );
    res.json({
      message: "Products successfully updated",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error updating a product", error });
  }
};

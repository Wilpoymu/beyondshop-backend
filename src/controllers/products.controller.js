import Product from '../models/Products';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: 'Products not found' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    const newProduct = new Product({ name, price });

    const productSaved = await newProduct.save();

    res.status(201).json(productSaved);
  } catch (error) {
    res.status(500).json({ message: 'Product not created' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: 'Product not found' });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const upddatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
      },
    );
    res.status(204).json(upddatedProduct);
  } catch (error) {
    res.status(404).json({ message: 'Product not found' });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.status(204).json();
  } catch (error) {
    res.status(404).json({ message: 'Product not found' });
  }
};

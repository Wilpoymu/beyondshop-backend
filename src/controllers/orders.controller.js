import Order from '../models/Order';

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('clientId')
      .populate('productsDetails.productId');
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (req, res) => {
  try {
    const { clientId, productsDetails } = req.body;

    const updatedProductsDetails = productsDetails.map((product) => ({
      ...product,
    }));

    const totalPrice = productsDetails.reduce((acc, product) => {
      return acc + product.price;
    }, 0);

    const newOrder = new Order({
      clientId,
      productsDetails: updatedProductsDetails,
      totalPrice,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('clientId')
      .populate('productsDetails.productId');
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Order not found' });
  }
};

export const getOrderByCustomerId = async (req, res) => {
  try {
    const orders = await Order.find({ clientId: req.params.clientId })
      .populate('clientId')
      .populate('productsDetails.productId');
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
  }
};

export const updateOrderById = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      req.body,
      {
        new: true,
      },
    );
    res.status(204).json(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Order not found' });
  }
};

export const deleteOrderById = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.orderId);
    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Order not found' });
  }
};

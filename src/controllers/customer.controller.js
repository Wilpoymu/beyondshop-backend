import Customer from '../models/Customer';

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.log(error);
  }
};

export const createCustomer = async (req, res) => {
  try {
    const { document, name, address, phone } = req.body;

    const newCustomer = new Customer({
      document,
      name,
      address,
      phone,
    });

    const savedCustomer = await newCustomer.save();

    res.status(201).json(savedCustomer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId);
    res.status(200).json(customer);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Customer not found' });
  }
};

export const updateCustomerById = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.customerId,
      req.body,
      {
        new: true,
      },
    );
    res.status(204).json(updatedCustomer);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Customer not found' });
  }
};

export const deleteCustomerById = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.customerId);
    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Customer not found' });
  }
};

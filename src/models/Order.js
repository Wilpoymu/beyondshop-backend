import { Schema, model } from 'mongoose';

const orderSchema = Schema(
  {
    clientId: { type: Schema.Types.ObjectId, ref: 'Customer' },
    orderDate: { type: Date, default: Date.now },
    productsDetails: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model('Order', orderSchema);

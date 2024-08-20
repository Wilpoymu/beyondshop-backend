import { Schema, model } from 'mongoose';

const customerSchema = Schema(
  {
    document: { type: Number, unique: true },
    name: { type: String },
    address: { type: String },
    phone: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model('Customer', customerSchema);

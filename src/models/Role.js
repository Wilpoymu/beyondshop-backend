import { Schema, model, version } from 'mongoose';

export const ROLES = ['user', 'admin', 'client'];

const roleSchema = new Schema(
  {
    name: String,
  },
  { versionKey: false },
);

export default model('Role', roleSchema);

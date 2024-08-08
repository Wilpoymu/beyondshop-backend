import { Schema, model, version } from 'mongoose';

const roleSchema = new Schema(
  {
    name: String,
  },
  { versionKey: false },
);

export default model('Role', roleSchema);

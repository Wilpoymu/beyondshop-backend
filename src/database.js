import mongoose from 'mongoose';
import { dbURL } from './config';

mongoose
  .connect(dbURL)
  .then((db) => console.log('DB is connected'))
  .catch((error) => console.error('Error ', dbURL, error));

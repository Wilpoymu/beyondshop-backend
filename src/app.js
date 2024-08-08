import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';

import { createRoles } from './libs/initialSetup';

import productsRoutes from './routes/product.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

const app = express();
createRoles(); // Create the roles in the database

app.set('pkg', pkg); // Save the package.json in the app

app.use(/* middleware */ morgan('dev')); // Log requests to the console
app.use(express.json()); // Receive JSON data

app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    description: app.get('pkg').description,
    author: app.get('pkg').author,
    version: app.get('pkg').version,
  });
});

// app.use(requiere('./routes/product.routes'));
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;

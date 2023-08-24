import express from 'express';
import cors from 'cors';

import productsRouter from './api/products/routers.products.js';

import authRoutes from './api/users/routers.users/authRoutes.js';
import userRoutes from './api/users/routers.users/userRoutes.js';

import morgan from 'morgan';

const app = express();
const PORT = 3000;

// middleware for json the body of the request.
app.use(express.json());
// create "middleware"
app.use(morgan('dev'));
app.use(cors());
app.use('/api/products', productsRouter);

app.use('/api/auth', authRoutes); //this is for signing and login.
app.use('/api/users', userRoutes); //this is for manual the data

app.listen(PORT, () => {
    console.log('listening in port: ' + PORT);
})
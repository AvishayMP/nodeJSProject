import express from 'express';
import productsRouter from './api/products/routers.products.js';
import morgan from 'morgan';

const app = express();
const PORT = 3000;

// middleware for json the body of the request.
app.use(express.json());
// create "middleware"
const logger = morgan('combined');


app.use('/api/products', logger, productsRouter);

app.listen(PORT, () => {
    console.log('listening in port: ' + PORT);
})
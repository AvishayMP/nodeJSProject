import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/products', productsRoutes);

app.listen(PORT, () => {
    console.log('listening in port: ' + PORT);
})
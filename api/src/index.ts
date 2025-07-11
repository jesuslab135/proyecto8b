import express, { json, urlencoded, Request } from 'express';
import productsRoutes from './routes/products/index';
import authRoutes from './routes/auth/index';
import ordersRoutes from './routes/orders/index';

const port = 3000;
const app = express();

app.use(urlencoded({ extended: false }));
app.use(
  json({
    verify: (req: Request, res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/products', productsRoutes);
app.use('/auth', authRoutes);
app.use('/orders', ordersRoutes);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


import express from 'express';
import { router } from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(router);

app.listen(port, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
);

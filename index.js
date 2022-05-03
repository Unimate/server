import express from "express";
import bodyParser from "body-parser";

import itemsRouter from './routes/item.route.mjs';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(itemsRouter);

app.listen(7007, () => { console.log('app listening on port 7007') });
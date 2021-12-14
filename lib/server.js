'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const authRouter = require('./router/auth');
const apiRouter = require('./router/api');
const productRouter = require('./router/product');
const categoriesRouter = require('./router/categories');
const cartRouter = require('./router/cart');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRouter);
app.use(apiRouter);
app.use(productRouter);
app.use(categoriesRouter);
app.use(categoriesRouter);
app.use(cartRouter);

app.post('/api/test', (req, res, next) => {
	res.status(200).send("Partner, it's a work in progress.");
});

module.exports = {
	app,
	start: (port) => {
		app.listen(port, () => {
			console.log(`Server running on port ${port}`);
		});
	},
};

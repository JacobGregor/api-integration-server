const express = require('express');
const { Products } = require('../model');
const productRouter = express.Router();

productRouter.get('/products', async (req, res) => {
	try {
		let products = await Products.findAll();
		let response = {
			count: products.length,
			results: products,
		};
		res.status(200).send(response);
	} catch (e) {
		console.log(e);
		res.status(400).send(e.message);
	}
});

productRouter.post('/products', async (req, res) => {
	let {
		productName,
		category,
		description,
		pictureURL,
		cost,
		quantity,
		cartQuantity,
	} = req.body;

	try {
		let product = await Products.create({
			productName,
			category,
			description,
			pictureURL,
			cost,
			quantity,
			cartQuantity,
		});
		res.status(201).send(product);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
});

productRouter.put('/products/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const obj = req.body;
		let record = await Products.findOne({ where: { id } });
		let updatedRecord = await record.update(obj);
		res.status(201).json(updatedRecord);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
});

module.exports = productRouter;

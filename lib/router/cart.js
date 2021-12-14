const express = require('express');
const { Cart } = require('../model');
const cartRouter = express.Router();

cartRouter.get('/cart', async (req, res) => {
	try {
		let cart = await Cart.findAll();
		let response = {
			count: cart.length,
			results: cart,
		};
		res.status(200).send(response);
	} catch (e) {
		console.log(e);
		res.status(400).send(e.message);
	}
});

cartRouter.post('/cart', async (req, res) => {
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
		let cart = await Cart.create({
			productName,
			category,
			description,
			pictureURL,
			cost,
			quantity,
			cartQuantity,
		});
		res.status(201).send(cart);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
});

cartRouter.put('/cart/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const obj = req.body;
		let record = await Cart.findOne({ where: { id } });
		console.log(record);
		let updatedRecord = await record.update(obj);
		res.status(201).send(updatedRecord);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
});

cartRouter.delete('/cart/:id', async (req, res) => {
	let id = req.params.id;
	await Cart.destroy({ where: { id } });
	let deleted = 'Deleted';
	res.status(200).send(deleted);
});

module.exports = cartRouter;

const express = require('express');
const { Categories } = require('../model');
const categoriesRouter = express.Router();

categoriesRouter.post('/categories', async (req, res, next) => {
	try {
		let { displayName, normalizedName, description } = req.body;
		let response = await Categories.create({
			displayName,
			normalizedName,
			description,
		});
		res.status(201).send(response);
	} catch (e) {
		console.log(e);
		res.status(400).send(e.message);
	}
});

categoriesRouter.get('/categories', async (req, res, next) => {
	try {
		let categories = await Categories.findAll();
		let response = {
			count: categories.length,
			results: categories,
		};
		res.status(200).send(response);
	} catch (e) {
		console.log(e);
		res.status(400).send(e.message);
	}
});

module.exports = categoriesRouter;

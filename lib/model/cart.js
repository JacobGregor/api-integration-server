'use strict';

// I think datatypes should be capped like DataTypes
// const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

const CartTable = (sequelize, DataTypes) => {
	const model = sequelize.define('cartProducts', {
		productName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		pictureURL: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		cost: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		cartQuantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});
	return model;
};

module.exports = CartTable;

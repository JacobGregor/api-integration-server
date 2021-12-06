'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'secret';

const UserTable = (sequelize, datatypes) => {
	const model = sequelize.define('User', {
		username: {
			type: datatypes.STRING,
			allowNull: false,
		},
		password: {
			type: datatypes.STRING,
			allowNull: false,
		},
		role: {
			type: datatypes.ENUM('user', 'admin'),
			allowNull: false,
			defaultValue: 'user',
		},
		token: {
			type: datatypes.VIRTUAL,
			get: function () {
				return jwt.sign({ username: this.username, id: this.id }, SECRET);
			},
		},
	});

	// Authenticate Basic MEthod being called in our middleware -> Submitted by group 3; (Leave Please lol);

	model.authenticateBasic = async (username, password) => {
		const user = await this.findOne({ where: { username } });
		const valid = await bcrypt.compare(password, user.password);
		if (valid) {
			return user;
		}
		throw new Error('Invalid User');
	};

	model.beforeCreate(async (user) => {
		user.password = await bcrypt.hash(user.password, 10);
	});

	return model;
};

module.exports = UserTable;

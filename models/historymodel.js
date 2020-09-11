//jshint esversion:6
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var User = require('./usermodel.js');

var sequelize = new Sequelize('web', 'nedazal', 'weboprojektas', {
	host: 'database-1.cg9cbkr2hza5.us-east-1.rds.amazonaws.com',
	dialect: 'mysql',
	define: {
    timestamps: false
  }
});

var History = sequelize.define('History', {
	iduser: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoincrement: true
	},
	title: Sequelize.STRING,
	quantity: Sequelize.STRING,
	date: Sequelize.DATE,
	ticket: Sequelize.DATE,
	time: Sequelize.TEXT
	}, {
	freezeTableName: true
},
{
	timestamps: false
});

History.associate = (models) => {
	History.BelongsTo(User, {foreignKey : 'iduser'});
};

sequelize.sync()
    .then(() => console.log('history table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

module.exports = History;

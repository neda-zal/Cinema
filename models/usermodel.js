//jshint esversion:6
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var History = require('./historymodel.js');

var sequelize = new Sequelize('web', 'nedazal', 'weboprojektas', {
	host: 'database-1.cg9cbkr2hza5.us-east-1.rds.amazonaws.com',
	dialect: 'mysql'
});

	var User = sequelize.define('UserInfo', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoincrement: true
		},
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    name: Sequelize.STRING,
    surname: Sequelize.STRING,
    birth: Sequelize.DATE,
    address: Sequelize.TEXT,
    usertype: {
      type: Sequelize.STRING,
      defaultValue: 'User'
      }
    }, {
    freezeTableName: true,
		hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
  });

User.prototype.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

User.associate = (models) => {
 User.hasMany(History, {as : 'History', foreignKey : 'iduser'});
};

sequelize.sync()
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

module.exports = User;

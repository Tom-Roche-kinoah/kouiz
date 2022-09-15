const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./getConnexion')();

class User extends Model {
    get fullName() {
        return this.firstname + ' ' + this.lastname;
    }
}

User.init(
    {
        email: DataTypes.TEXT,
        password: DataTypes.TEXT,
        firstname: DataTypes.TEXT,
        lastname: DataTypes.TEXT,
        role: DataTypes.TEXT,
        photo: DataTypes.TEXT,
    },
    {
        sequelize: sequelize,
        tableName: 'user',
    }
);

module.exports = User;

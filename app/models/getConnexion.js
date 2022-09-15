const Sequelize = require('sequelize');

function getConnexion() {
    const connexion = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,
        {
            define: {
                createdAt: 'created_at',
                updatedAt: 'updated_at',
            },
            host: process.env.HOST,
            dialect: process.env.DB_ENV,
            // options qui désactive le log des requêtes dans le terminal
            logging: false,
        }
    );

    return connexion;
}

module.exports = getConnexion;

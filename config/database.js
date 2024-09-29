const { default: consola } = require("consola");
const { Sequelize } = require("sequelize");

module.exports = {
    connectDB : async () => {
        const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: "postgres",
            logging: false
        });
        
        try {
            await sequelize.authenticate();
            consola.info('🤝🏽 => Connection has been established successfully.');
        } catch (error) {
            consola.error('❗️=> Unable to connect to the database:', error);
        }
    }
}


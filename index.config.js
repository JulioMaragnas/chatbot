const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    HOST : process.env.HOST || 'localhost',
    PORT : process.env.PORT || 5000,
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    ACCOUNT_SID: process.env.ACCOUNT_SID,
    AUTH_TOKEN: process.env.AUTH_TOKEN
}
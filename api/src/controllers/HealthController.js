/* eslint-disable no-unused-vars */
const { APP_NAME } = require('../configs');

const healthCheck = async (req, res) => {
  try {
    console.info(`${APP_NAME} - ${healthCheck.name}`);

    return res.send(`${APP_NAME} - success`);
  } catch (err) {
    return res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  healthCheck,
};

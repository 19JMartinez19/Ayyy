//This file holds any configuration variables we may need
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
    uri: 'mongodb://CENTEST:CEN3031@ds133875.mlab.com:33875/bootcamp4jmartinez', //place the URI of your mongo database here.
  },
  port: process.env.PORT
};

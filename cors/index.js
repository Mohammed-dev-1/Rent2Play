const cors = require('cors');

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204,
    methods: "GET, PUT, POST, DELETE, OPTION"
  }

module.exports = cors(corsOptions);


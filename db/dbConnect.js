var mongoose = require('mongoose');
if (process.env.ENV == 'Test')
    connectionStr = 'mongodb://localhost/bookAPI_Test';
else
    connectionStr = 'mongodb://localhost/bookAPI';
module.exports = mongoose.connect(connectionStr);
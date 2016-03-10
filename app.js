var express = require('express');
var app = express();
var bodyParser = require ('body-parser');
app.use(bodyParser.json());

var db = require('./db/dbConnect');
var book = require('./models/bookModel');
var booksRoute = require('./routes/bookRoute')(book);
app.use('/api',booksRoute);
// set up the prot
var port = process.env.PORT || 3000;

app.get('/',function(request, response){
    response.send('working all right really')
});


app.listen(port, function(){
    console.log('on ' + port);
});


module.exports = app;
var express = require('express');
var app = express();

// set up the prot
var port = process.env.PORT || 3000;

app.get('/',function(request, response){
    response.send('working all right really')
});

var booksRoute = require('./routes/bookRoute');
app.use('/api',booksRoute);


app.listen(port, function(){
    console.log('on ' + port);
});


module.exports = app;

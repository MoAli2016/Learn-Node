var express = require('express');
var app = express();
var booksRoute = require('./routes/bookRoute');

// set up the prot
var port = process.env.PORT || 3000;

app.get('/',function(request, response){
    response.send('working all right really')
});



app.use('/api',booksRoute);


app.listen(port, function(){
    console.log('on ' + port);
});


module.exports = app;

var express = require('express');
var bookRouter = express.Router();
var connection = require('../db/dbConnect');
var Book = require('../models/bookModel');

bookRouter.route('/books')
    .get(function(request, response){
        var query = {};
        switch(Object.keys(request.query)[0])
        {
            case 'genre': query.genre = request.query.genre;
                break;
            case 'author': query.author = request.query.author;
                break;
            case 'read': query.read = request.query.read;
                break;
            default: query.title = request.query.title;
                break;
        }
        Book.find(query,function(err,books){
            if (err)
                response.send(err);
            else
                response.json(books);
        });
    });

bookRouter.route('/books/:bookid')
    .get(function(request, response){
        var bookId = request.params.bookid;
        if (bookId) {
            Book.findById(bookId, function (err, book) {
                if (err)
                    response.sendStatus(404);
                else
                    response.json(book);
            });
        }
    });

module.exports = bookRouter;
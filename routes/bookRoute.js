var express = require('express');
var bodyParser = require ('body-parser');

app = express();
var jsonParser = bodyParser.json();

routes = function(Book) {
    var bookRouter = express.Router();
    bookRouter.route('/books')
        .get(function (request, response) {
            var query = {};
            switch (Object.keys(request.query)[0]) {
                case 'genre':
                    query.genre = request.query.genre;
                    break;
                case 'author':
                    query.author = request.query.author;
                    break;
                case 'read':
                    query.read = request.query.read;
                    break;
                case 'title':
                    query.title = request.query.title;
                    break;
                default : // return all records
                    Book.find(function (err, books) {
                        if (err)
                            response.send(err);
                        else
                            response.json(books);
                    });
                    return;
            }
            Book.find(query, function (err, books) {
                if (err)
                    response.send(err);
                else
                    response.json(books);
            });
        })
        .post(jsonParser, function (request, response) {
            var book = new Book(request.body);
            if (!request.body)
                return response.sendStatus(400);
            book.save();
            response.status(201).send(book);
        });

    bookRouter.route('/books/:bookid')
        .get(function (request, response) {
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
    return bookRouter;
};
module.exports = routes;
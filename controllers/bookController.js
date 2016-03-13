var bookController = function(Book){
    var post = function (request, response) {
        var book = new Book(request.body);
        if (!request.body.title) {
            response.status(400);
            response.send('Title is required');
        }
        else {
            book.save(function (err) {
                if (err)
                    response.status(500).send(err);
                else
                    response.json(request.book);
            });
            response.status(201);
            response.send(book);
        }
    }

    var get = function (request, response) {
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
    }

    var getById = function (request, response) {
        response.json(request.book);
    };

    var put = function (request, response){
        request.book.title = request.body.title;
        request.book.author = request.body.author;
        request.book.genre = request.body.genre;
        request.book.read = request.body.read;
        request.book.save(function(err){
            if (err)
                response.status(500).send(err);
            else
                response.json(request.book);
        });
    };

    var patch = function(request, response){
        if (request.book._id)
            delete request.book._id;
        for (var item in request.body){
            request.book[item] = request.body[item];
        }
        request.book.save(function(err){
            if (err)
                response.status(500).send(err);
            else
                response.json(request.book);
        });
    };

    var remove = function(request, response){
        request.book.remove(function(err){
            if (err)
                response.status(500).send(err);
            else
                response.status(204).send('removed');
        });
    };

    return {
        post    : post,
        get     : get,
        getById : getById,
        put     : put,
        patch   : patch,
        remove  : remove
    }
};

module.exports = bookController;
var should = require('should'),
    request = require ('supertest'),
    app = require('../app'),
    mongoose = require('mongoose'),
    Book = mongoose.model('Book'),
    agent = request.agent(app);

describe('Book Crud test', function (){
    it('should allow a book to be tested and return read and _id true', function(done){
        var bookPost = {title:'new book', author:'test', genre:'fiction'};

        agent.post('/api/books')
            .send(bookPost)
            .expect(200)
            .end(function(err, results){
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done();
            });
    });

    afterEach(function(done){
        Book.remove().exec();
        done();
    });
});



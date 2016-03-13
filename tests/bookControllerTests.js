var should  = require('should'),
    sinon  = require('sinon');

describe('book controller tests', function (){
   describe('Post', function(){
        it('should not allow an empty title on post', function() {
            var mockBook = function (book) {this.save = function () {}};
            var mockRequest = {
                // mocking no title just author. also mocking status and send
                body: {author: 'mock author'}
            };

            var mockResponse = {
                status: sinon.spy(),
                send: sinon.spy()
            };
            var bookController = require('../controllers/bookController')(mockBook);
            bookController.post(mockRequest, mockResponse);
            mockResponse.status.calledWith(400).should.equal(true, 'Bad status ' + mockResponse.status.args[0][0]);
            mockResponse.send.calledWith('Title is required').should.equal(true);
        });
   });
});
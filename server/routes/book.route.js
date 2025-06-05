const BookController = require('../controllers/book.controller')



module.exports = app => {
    app.get('/api/allbooks', BookController.findAllBooks)
    app.get('/api/test', BookController.testconnection)
    app.post('/api/newbook', BookController.createBook)
    app.get('/api/book/:namex', BookController.findBookByName)
    app.put('/api/update/book/:id', BookController.updateBook)
    app.delete('/api/delete/book/:id', BookController.deleteBook)
    app.get('/api/books/count', BookController.getBookCount);

}
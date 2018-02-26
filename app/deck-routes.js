var path = require('path')
var mongoose = require('mongoose');
var db = require('./models/index');
var bodyParser = require('body-parser')

module.exports = function(app) {
    app.get('/api/cards', function(req, res) {
        console.log("HI")
        db.Card.find({})
        .exec((err, result) => {
            if (err) throw err;
            res.json(result)
        })

    })
}
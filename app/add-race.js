var mongoose = require('mongoose');
var db = require('./models/index');
var cardsData = require('../card-data/cards.json')

mongoose.Promise = Promise;

var developmentUrl = "mongodb://localhost/hearthsearch"

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
} else {
    mongoose.connect(developmentUrl)
}

for (let key in cardsData) {
    cardsData[key].forEach(card => {
        if (card.collectible) {
            db.Card.findOneAndUpdate({'name': card.name}, {'race': card.race})
            .exec((error, result) => {
                console.log(result)
            })
        }
    })
}
// app/routes.js
var path = require('path')
var mongoose = require('mongoose');
var db = require('./models/index');
var bodyParser = require('body-parser')
var deckStrings = require('deckStrings')

var cardsData = require('../card-data/cards.json')

function Deck(name, cards, archetype, user, cost) {
    this.name = name
    this.cards = cards
    this.archetype = archetype
    this.user = user
    this.cost = cost
}

module.exports = function(app, passport) {


    const axios = require('axios')


    app.get('/api/decks/classes', (req, res) => {
        db.Deck.find()
        .exec((err, result) => {
            res.json(result)
        }) 
    })

    // Use this to update lighforge scores for each card
    app.get('/api/lightforge', (req, res) => {
        axios.get('http://thelightforge.com/api/TierList/Latest?locale=us')
        .then(result => {
            result.data.Cards.forEach(card => {
                db.Card.findOneAndUpdate({'name': card.Name}, {'lightForgeScore': card.Scores})
                .exec((error, result2) => {
                    if (error) throw error                    
                })
            })
        })
    }) 

    app.get('/api/decks/populate', function(req, res) {
        db.Deck.find()
        .populate('cards._id')   
        .exec((err, result) => {
            if (err) {
               throw err
            }
            res.json(result)
        })
    })

    // Get all decks
    app.get('/api/decks', function(req, res) {
        db.Deck.find({})     
        .exec((err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

    // Use this to import data through mongoose to database
    app.get('/api/mongoose/import/cards', function(req, res) {

        // let collectible = cardsData.filter(card => card.collectible)

        let newCards = []

        for (let key in cardsData) {
            cardsData[key].forEach(card => {
                if (card.collectible) {
                    newCards.push(card)
                }
            })
        }
        
        db.Card.insertMany(newCards, (error, docs) => res.json(docs))

    })
    
    app.get('/api/import/:deckString', function(req, res) {

        let deckString = req.params.deckString.replace('$', '/')
        const decoded = deckStrings.decode(deckString)
        res.json(decoded)
    })

    // makes a deckString for a deck
    app.get('/api/export/:deckId', function(req, res) {
        db.Deck.findOne({'_id': req.params.deckId})
        .populate('cards._id')
        .exec((err, response) => {
            if (err) throw err;
            let deckStringFormattedCards = response.cards.map(card => {
                return [parseInt(card.dbfId || card._id.dbfId), parseInt(card.quantity || card.cardQuantity)]
            })
            
            let deckStringFormattedHero = response.hero.toLowerCase()

            if (deckStringFormattedHero === 'warlock') {

                deckStringFormattedHero = 893

            }
            if (deckStringFormattedHero === 'hunter') {

                deckStringFormattedHero = 31
                
            }
            if (deckStringFormattedHero === 'mage') {

                deckStringFormattedHero = 637
                
            }
            if (deckStringFormattedHero === 'rogue') {
                deckStringFormattedHero = 930
                
            }
            if (deckStringFormattedHero === 'druid') {
                deckStringFormattedHero = 274
                
            }
            if (deckStringFormattedHero === 'shaman') {
                deckStringFormattedHero = 1066
                
            }
            if (deckStringFormattedHero === 'priest') {
                deckStringFormattedHero = 813
               
            }
            if (deckStringFormattedHero === 'paladin') {
                deckStringFormattedHero = 671
                
            }
            if (deckStringFormattedHero === "warrior") {
                deckStringFormattedHero = 7
            }



            const deckStringObject = {
                cards: deckStringFormattedCards,
                heroes: [deckStringFormattedHero],
                format: 1
            }


            res.json(deckStrings.encode(deckStringObject));
        })
    })

    // Logout
    app.get('/profile/logout', function(req, res){
        req.logout();
        res.redirect('/');
      });

    // Get one deck
    app.get('/api/deck/:deckId', function(req,res) {
        
        db.Deck.findOne({'_id': req.params.deckId})
        .populate('cards._id')
        .exec((err, response) => {
            if (err) throw err;
            res.json(response)
        })
    })

    

    // Get card by dbfId
    app.get('/blah/:dbfId', function(req, res) {
        
        db.Card.findOne({'dbfId': req.params.dbfId}, (err, response) => {
            if (err) throw err;

            res.json(response)
        })
        
    })

    // app.get('/blah'), function(req, res) {
    //     console.log(req.params.dbfId)
    //     res.json('blah')
    //     db.Card.findOne({"dbfId": '1740'})
    //     .exec((err, result) => {
    //         if (err) throw err;
    //         res.json(result)
    //     })
    // }

    // Get all cards
    app.get('/api/cards', function(req, res) {
        db.Card.find({})
        .exec((err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

    // Get all collectible cards
    app.get('/api/cards/collectible', function(req, res) {
        db.Card.find({'collectible': true}, function(err, docs) {
            if (err) throw err
            res.json(docs)
        })
        
    })

    // Get All collectible non-hero cards
    app.get('/api/cards/collectible/noheroes', function(req, res) {
        db.Card.find({
            $and: [
                {'collectible': true}, 
                {'type': {$ne: 'Hero'}}
            ]
        }, function(err, docs) {
            if (err) throw err
            res.json(docs)
        })
    })

    // Get all decks by one user
    app.get('/api/user/decks/:userId', function(req, res) {
        db.Deck.find({ 'user': req.params.userId}, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
        
    })


    // Updates a deck. Used for deck details form.
    app.post('/deck/update', function(req, res) {

        db.Deck.findOneAndUpdate({'_id': req.body.deckId}, {
            archetype: req.body.archetype,
            description: req.body.description,
            name: req.body.name
        }).exec((error, result) => res.json(result))
    })

    // Check if user is logged in and reurn info about user
    app.get('/test', function(req, res) {
        res.json(req.user)
    })

    // Upvote a deck
    // Not tested, assumed wokring (2/11)
    app.post('/deck/upvote/:deckId', function(req, res) {
        db.Deck.findOneAndUpdate({ '_id': req.params.deckId}, {$inc: {upvotes: 1}, $push: {'upvoters': 'niceguy'}}).exec((res) => {
        })
    })

    // Not tested, assumed wokring (2/11)    
    app.post('/deck/downvote/:deckId', function(req, res) {
        db.Deck.findOneAndUpdate({ '_id': req.params.deckId}, {$inc: {downvotes: 1}, $push: {'downvoters': 'meanie'}}).exec((res) => {
        })
    })

    // Upvote a card
    // Tested: Confirmed working (2/11)  
    // ***************** USE CARD ID, NOT MONGO OBJECT ID *****************
    app.post('/card/upvote/:cardId', function(req, res) {
        db.Card.findOneAndUpdate({ 'cardId': req.params.cardId}, {$inc: {upvotes: 1}, $push: {'upvoters': 'guy'}}).exec((err, res) => {
            if (err) throw err;
        })
    })

    // downvote a card
    // Tested: Confirmed working (2/11)
    // ***************** USE CARD ID, NOT MONGO OBJECT ID *****************
    app.post('/card/downvote/:cardId', function(req, res) {
        db.Card.findOneAndUpdate({ 'cardId': req.params.cardId}, {$inc: {downvotes: 1}, $push: {'downvoters': 'guy'}}).exec((err, res) => {
            if (err) throw err;
        })
    })

    // Delete a deck comment
    // Untested
    app.post('/deck/comment/delete'), function(req, res) {
        db.DeckComment.findOneAndRemove({ '_id': req.body.id})
    }

    // Delete a card comment
    // Untested
    app.post('/card/comment/delete'), function(req, res) {
        db.CardComment.findOneAndRemove({ '_id': req.body.id})
    }

    // Signup
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    // Login
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/', 
        failureRedirect: '/login',
        failureFlash: true
    }));

    
    app.post('/update/hearthpwn', (req, res) => {
        db.Deck.find({'source': 'HearthPwn', 'cardsAdded': false})
        .exec((error, result) => {
            console.log('found', result)
            
            result.forEach(deck => {
                db.Deck.findOneAndUpdate({'_id': deck._id}, {'cardsAdded': true})
                .exec((error, result) => {
                    if (error) throw error
                })
            })

            result.forEach(deck => {
                db.Deck.findOneAndUpdate({'_id': deck._id}, {'cardsAdded': true})
                const hero = deck.hero
                const format = deck.format


                deck.cards.forEach(card => {
                    const id = card._id
                    const quantity = card.cardQuantity                    

                    if (format === 'wild') {
                        
                        // db.Card.findOneAndUpdate({ '_id': id}, {$inc: {heroQuery: 1}}).exec((err, result) => {
                        //     if (err) throw err;
                        //     console.log(result)
                        //     res.json(result)
                        // })
            
                        if (hero.toLowerCase() === 'druid') {
                            
                            db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsWild.druid': quantity}}).exec((err, result) => {
                                if (err) throw err;
                                
                            })
                        }
                
                        if (hero.toLowerCase() === 'hunter') {
                            db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsWild.hunter': quantity}}).exec((err, result) => {
                                if (err) throw err;
                                
                            })
                        }
                
                        if (hero.toLowerCase() === 'mage') {
                            db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsWild.mage': quantity}}).exec((err, result) => {
                                if (err) throw err;
                                
                            })
                        }
                
                        if (hero.toLowerCase() === 'paladin') {
                            db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsWild.paladin': quantity}}).exec((err, result) => {
                                if (err) throw err;
                                
                                
                            })
                        }
                
                        if (hero.toLowerCase() === 'priest') {
                            db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsWild.priest': quantity}}).exec((err, result) => {
                                if (err) throw err;
                                
                                
                            })
                        }
                
                        if (hero.toLowerCase() === 'rogue') {
                            db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsWild.rogue': quantity}}).exec((err, result) => {
                                if (err) throw err;
                                
                                
                            })
                        }
                
                        if (hero.toLowerCase() === 'shaman') {
                            db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsWild.shaman': quantity}}).exec((err, result) => {
                                if (err) throw err;
                                
                                
                            })
                        }
                
                        if (hero.toLowerCase() === 'warlock') {
                            db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsWild.warlock': quantity}}).exec((err, result) => {
                                if (err) throw err;
                                
                                
                            })
                        }
                
                        if (hero.toLowerCase() === 'warrior') {
                            db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsWild.warrior': quantity}}).exec((err, result) => {
                                if (err) throw err;
                                
                                
                            })
                        }
                    }
            
                    if (format === 'standard') {
                        if (hero.toLowerCase() === 'druid') {
                            db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsStandard.druid': quantity}}).exec((err, result) => {
                                if (err) throw err;
                                
                                
                            })
                        }
                
                        if (hero.toLowerCase() === 'hunter') {
                            db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsStandard.hunter': quantity}}).exec((err, result) => {
                                if (err) throw err;
                                
                                
                            })
                        }
                
                        if (hero.toLowerCase() === 'mage') {
                            db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsStandard.mage': quantity}}).exec((err, result) => {
                                if (err) throw err;
                                
                                
                            })
                        }
                
                        if (hero.toLowerCase() === 'paladin') {
                            db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsStandard.paladin': quantity}}).exec((err, result) => {
                                if (err) throw err;
                                
                                
                            })
                        }
                
                        if (hero.toLowerCase() === 'priest') {
                            db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsStandard.priest': quantity}}).exec((err, result) => {
                                if (err) throw err;
                                
                                
                            })
                        }
                
                        if (hero.toLowerCase() === 'rogue') {
                            db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsStandard.rogue': quantity}}).exec((err, result) => {
                                if (err) throw err;
                                
                                
                            })
                        }
                
                        if (hero.toLowerCase() === 'shaman') {
                            db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsStandard.shaman': quantity}}).exec((err, result) => {
                                if (err) throw err;
                                
                                
                            })
                        }
                
                        if (hero.toLowerCase() === 'warlock') {
                            db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsStandard.warlock': quantity}}).exec((err, result) => {
                                if (err) throw err;
                                
                                
                            })
                        }
                
                        if (hero.toLowerCase() === 'warrior') {
                            db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsStandard.warrior': quantity}}).exec((err, result) => {
                                if (err) throw err;
                                
                                
                            })
                        }
                    }


                })
            })
            res.end()
        })
    })

    

    // Post a new deck
    app.post('/newdeck', function(req, res) {
        db.Deck.create({
            name: req.body.name,
            archetype: req.body.archetype,
            cost: req.body.cost,
            cards: req.body.cards,
            format: req.body.format,
            user: req.body.user,
            source: req.body.source,
            hero: req.body.hero
        }, function(err, result) {
            if (err) throw err
            console.log('done?')
            res.json(result)
        })
    })

    // Update card inclusion
    // Unecessarily dry. Wouldn't work using {$inc: {query: 1}
    // idk dude
    app.post('/api/card/update', (req, res) => {

        const heroQuery = `inclusions.${req.body.hero.toLowerCase()}`
        const cards = req.body.cards
        const format = req.body.format

        cards.forEach(id => {
            if (format === 'wild') {
                // const heroQuery = `inclusionsWild.${req.body.hero.toLowerCase()}`
    
                // db.Card.findOneAndUpdate({ '_id': card.id}, {$inc: {heroQuery: 1}}).exec((err, result) => {
                //     if (err) throw err;
                //     console.log(result)
                // })
    
                if (req.body.hero.toLowerCase() === 'druid') {
                    db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsWild.druid': 1}}).exec((err, result) => {
                        if (err) throw err;
                        console.log(result)
                    })
                }
        
                if (req.body.hero.toLowerCase() === 'hunter') {
                    db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsWild.hunter': 1}}).exec((err, result) => {
                        if (err) throw err;
                        console.log(result)
                    })
                }
        
                if (req.body.hero.toLowerCase() === 'mage') {
                    db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsWild.mage': 1}}).exec((err, result) => {
                        if (err) throw err;
                        console.log(result)
                    })
                }
        
                if (req.body.hero.toLowerCase() === 'paladin') {
                    db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsWild.paladin': 1}}).exec((err, result) => {
                        if (err) throw err;
                        console.log(result)
                    })
                }
        
                if (req.body.hero.toLowerCase() === 'priest') {
                    db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsWild.priest': 1}}).exec((err, result) => {
                        if (err) throw err;
                        console.log(result)
                    })
                }
        
                if (req.body.hero.toLowerCase() === 'rogue') {
                    db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsWild.rogue': 1}}).exec((err, result) => {
                        if (err) throw err;
                        console.log(result)
                    })
                }
        
                if (req.body.hero.toLowerCase() === 'shaman') {
                    db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsWild.shaman': 1}}).exec((err, result) => {
                        if (err) throw err;
                        console.log(result)
                    })
                }
        
                if (req.body.hero.toLowerCase() === 'warlock') {
                    console.log(id)
                    db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsWild.warlock': 1}}).exec((err, result) => {
                        if (err) throw err;
                        console.log('?')
                        console.log(result)
                    })
                }
        
                if (req.body.hero.toLowerCase() === 'warrior') {
                    db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsWild.warrior': 1}}).exec((err, result) => {
                        if (err) throw err;
                        console.log(result)
                    })
                }
            }
    
            if (format === 'standard') {
                if (req.body.hero.toLowerCase() === 'druid') {
                    db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsStandard.druid': 1}}).exec((err, result) => {
                        if (err) throw err;
                        console.log(result)
                    })
                }
        
                if (req.body.hero.toLowerCase() === 'hunter') {
                    db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsStandard.hunter': 1}}).exec((err, result) => {
                        if (err) throw err;
                        console.log(result)
                    })
                }
        
                if (req.body.hero.toLowerCase() === 'mage') {
                    db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsStandard.mage': 1}}).exec((err, result) => {
                        if (err) throw err;
                        console.log(result)
                    })
                }
        
                if (req.body.hero.toLowerCase() === 'paladin') {
                    db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsStandard.paladin': 1}}).exec((err, result) => {
                        if (err) throw err;
                        console.log(result)
                    })
                }
        
                if (req.body.hero.toLowerCase() === 'priest') {
                    db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsStandard.priest': 1}}).exec((err, result) => {
                        if (err) throw err;
                        console.log(result)
                    })
                }
        
                if (req.body.hero.toLowerCase() === 'rogue') {
                    db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsStandard.rogue': 1}}).exec((err, result) => {
                        if (err) throw err;
                        console.log(result)
                    })
                }
        
                if (req.body.hero.toLowerCase() === 'shaman') {
                    db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsStandard.shaman': 1}}).exec((err, result) => {
                        if (err) throw err;
                        console.log(result)
                    })
                }
        
                if (req.body.hero.toLowerCase() === 'warlock') {
                    db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsStandard.warlock': 1}}).exec((err, result) => {
                        if (err) throw err;
                        console.log(result)
                    })
                }
        
                if (req.body.hero.toLowerCase() === 'warrior') {
                    db.Card.findOneAndUpdate({ '_id': id}, {$inc: {'inclusionsStandard.warrior': 1}}).exec((err, result) => {
                        if (err) throw err;
                        console.log(result)
                    })
                }
            }
        })
    })

    // Upvote an existing deck comment
    app.post('/newdeckcommentupvote', function(req, res) {
        console.log(req.body.commentId)
        db.DeckComment.findOneAndUpdate({ '_id' : req.body.commentId }, {$inc: {upvotes: 1}, $push: {'upvoters': 'guy'}}).exec((result) => {
            console.log(result)
        })    
    })

    // Post a new deck comment
    app.post('/newdeckcomment', function(req, res) {
        db.DeckComment.create({
            user: req.body.userId,
            comment: req.body.comment,
            deckId: req.body.deckId,
            date: new Date(),
        })
    })

    // ***************** USE CARD ID, NOT MONGO OBJECT ID *****************
    // Tested: Confirmed working (2/11)
    app.post('/newcardcomment', function(req, res) {
        db.CardComment.create({
            user: req.body.user,
            comment: req.body.comment,
            cardId: req.body.cardId,
            date: new Date(),
        })
    })

    app.get('/api/user/:username', (req, res) => {
        db.User.find({username: username})
        .exec((error, result) => {
            if (error) throw error
            res.json(result)
        })
    })

    app.post('/api/user/email/', (req, res) => {
        db.User.findOneAndUpdate({_id: req.body.id}, {email: req.body.email})
        .exec((error, result) => {
            if (error) throw error
            res.json(result)
        })
    })

    // Get all comments for a deck
    app.get('/api/deck/comments/:deckId', function(req, res) {
        console.log(req.params.deckId)
        db.DeckComment.find({'deckId': req.params.deckId})
        .populate('user')
        .exec((error, result) => {
            console.log('hey', result)
            res.json(result)
        })
    });

    // Route for posting a new card. Not needed for anything, but since I made it already, left it here.
    app.post('/newcard', function(req, res) {
        db.Card.create({
            artist: req.body.artist,       
            attack: req.body.attack,
            cardId: req.body.cardId,
            cardSet: req.body.cardSet,
            collectible: req.body.collectible,
            cost:req.body.cost,
            dbfId:req.body.dbfId,
            flavor:req.body.flavor,
            health: req.body.health,
            img: req.body.img,
            name:req.body.name,
            playRequirements: req.body.playRequirements,
            playerClass: req.body.playerClass,
            rarity: req.body.rarity,
            text: req.body.text,  
            type: req.body.type
        })
    })

    // Serves react stuff.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/react/build/index.html'))
      });
};



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    // res.redirect('/');
    res.json("Not logged in");
}
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CardSchema = new Schema({
    
    
    artist: {
        type: String,
    },

    attack: {
        type: Number
    },

    cardId: {
        type: String
    },

    cardSet: {
        type: String
    },

    collectible: {
        type: Boolean
    },

    comments: {
        type: Array,
        default: []
    },

    cost: {
        type: Number
    },

    dbfId: {
        type: String
    },

    flavor: {
        type: String
    },

    health: {
        type: Number
    },

    inclusionsStandard: {
        druid: {
            type: Number,
            default: 0,
            required: true
        },
        
        hunter: {
            type: Number,
            default: 0,
            required: true
        },
        
        mage: {
            type: Number,
            default: 0,
            required: true
        },
        
        paladin: {
            type: Number,
            default: 0,
            required: true
        },
        
        priest: {
            type: Number,
            default: 0,
            required: true
        },
        
        rogue: {
            type: Number,
            default: 0,
            required: true
        },
        
        shaman: {
            type: Number,
            default: 0,
            required: true
        },
        
        warlock: {
            type: Number,
            default: 0,
            required: true
        },
        
        warrior: {
            type: Number,
            default: 0,
            required: true
        }
    },

    inclusionsWild: {
        druid: {
            type: Number,
            default: 0,
            required: true
        },
        
        hunter: {
            type: Number,
            default: 0,
            required: true
        },
        
        mage: {
            type: Number,
            default: 0,
            required: true
        },
        
        paladin: {
            type: Number,
            default: 0,
            required: true
        },
        
        priest: {
            type: Number,
            default: 0,
            required: true
        },
        
        rogue: {
            type: Number,
            default: 0,
            required: true
        },
        
        shaman: {
            type: Number,
            default: 0,
            required: true
        },
        
        warlock: {
            type: Number,
            default: 0,
            required: true
        },
        
        warrior: {
            type: Number,
            default: 0,
            required: true
        }
    },

    img: {
        type: String
    },

    name: {
        type: String
    },

    playRequirements: {
        type: Array
    },

    playerClass: {
        type: String
    },

    rarity: {
        type: String
    },

    race: {
        type: String
    },

    text: {
        type: String
    },

    type: {
        type: String
    },

    upvotes: {
        type: Number,
        default: 0
    }, 

    upvoters: {
        type: Array
    },

    downvotes: {
        type: Number,
        default: 0
    },

    downvoters: {
        type: Array
    },

    lightForgeScore: {
        type: Array
    }

});

var Card = mongoose.model("Card", CardSchema);

module.exports = Card;
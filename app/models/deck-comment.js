var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DeckCommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    comment: {
        type: String,
        required: true
    },

    deckId: {
        type: String,
        // required: true
    },

    date: {
        type: Date,
        required: true
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
    }

});

var DeckComment = mongoose.model("DeckComment", DeckCommentSchema);

module.exports = DeckComment;
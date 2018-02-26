var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CardCommentSchema = new Schema({
    user: {
        type: String,
        required: true
    },

    comment: {
        type: String,
        required: true
    },

    cardId: {
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
    }
});

var CardComment = mongoose.model("CardComment", CardCommentSchema);

module.exports = CardComment;
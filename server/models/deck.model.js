const mongoose = require('mongoose');

const DeckSchema = new mongoose.Schema({
    deckName: { type: String,
        minLength: [3,"The deck name should be at least three characters"],
        required: [true,"A deck name is required"]},
    deckSize: { type: Number,
        min: 40,
        max: 60,
        required: [true,"The deck size is required"]},
    deckType: { type: String,
        required: [true,"The deck type is required"]},
    user: {type: String},
    cards: {type: Array}
    },
    {timestamps: true},
);

const Deck = mongoose.model('Deck', DeckSchema);

module.exports = Deck;
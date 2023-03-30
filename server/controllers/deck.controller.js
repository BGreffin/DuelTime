const Deck = require('../models/deck.model');

module.exports.findAllDecks = (req,res) => {
    Deck.find({})
        .then((AllDecks) => res.json(AllDecks))
        .catch((err) => res.status(400).json({err}))
}

module.exports.findOneDeck = (req,res) => {
    Deck.findOne({_id:req.params.id})
        .then((oneDeck) => res.json(oneDeck))
        .catch((err) => res.status(400).json({err}))
}

module.exports.createDeck = (req,res) => {
    Deck.create(req.body)
        .then((newDeck) => res.json(newDeck))
        .catch((err) => res.status(400).json({err}))
}

module.exports.updateDeck = (req,res) => {
    Deck.findByIdAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true})
        .then(OneUpdate => res.json(OneUpdate))
        .catch((err) => res.status(400).json({err}))
}

module.exports.deleteDeck = (req,res) => {
    Deck.deleteOne({_id:req.params.id})
        .then(result => res.json(result))
        .catch((err) => res.status(400).json({err}))
}
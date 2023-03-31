const DuelistController = require('../controllers/duelist.controller');
const DeckController = require('../controllers/deck.controller');
const { auth } = require('../config/jwt.config');


module.exports = (app) => {

    app.post('/api/login',DuelistController.login);
    app.post('/api/register',DuelistController.register); 
    app.post('/api/duelists/:userName/logout',DuelistController.logout);
    app.get('/api/duelists/:userName',DuelistController.findOneDuelist); 
    app.post('/api/duelists/:userName/create',DeckController.createDeck);
    app.get('/api/duelists/:userName/:id',DeckController.findOneDeck);
    app.get('/duelists/decks',DeckController.findAllDecks);
    app.put('/api/duelists/:userName/edit/:id',DeckController.updateDeck);
    app.get('/api/duelists/:userName/clib',DuelistController.findOneDuelist);
    app.delete('/api/deck/:id',DeckController.deleteDeck);
    
    //unused routes
    app.get('/duelists/get',DuelistController.findAllDuelists);
    app.delete('/duelists/delete/:userName',DuelistController.deleteDuelist);
    app.delete('/duelists/delete/:id',DuelistController.deleteDuelist2);
} 
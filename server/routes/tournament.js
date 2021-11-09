
let express = require('express');
let router = express.Router();
let tournamentControllers = require('../controllers/tournaments')


/* GET tournament list */
router.get('/', tournamentControllers.displayTournamentList) 

/* CREATE tournament list */
router.post('/create', tournamentControllers.createNewTournament);

module.exports = router;

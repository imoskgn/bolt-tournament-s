
let express = require('express');
let router = express.Router();
let tournamentControllers = require('../controllers/tournaments')


/* GET tournament list */
router.get('/', tournamentControllers.displayTournamentList); 

/* GET torunament by id */
router.get('/:id', tournamentControllers.displayTournament);

/* CREATE tournament*/
router.post('/create', tournamentControllers.createNewTournament);

/* UPDATE tournament */
router.post('/update/:id', tournamentControllers.updateTournament);

/* DELETE tournament */
router.delete('/delete/:id', tournamentControllers.deleteTournament);

module.exports = router;

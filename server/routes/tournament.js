
let express = require('express');
let router = express.Router();
let tournamentControllers = require('../controllers/tournaments')
const requiresAuth = require('../middleWare/authMiddleware')



/* GET tournament list */
router.get('/', tournamentControllers.displayTournamentList); 

/* GET torunament by id */
router.get('/:id', tournamentControllers.displayTournament);

/* CREATE tournament*/
router.post('/create' ,requiresAuth, tournamentControllers.createNewTournament);

/* UPDATE tournament */
router.post('/update/:id',requiresAuth, tournamentControllers.updateTournament);

/* DELETE tournament */
router.delete('/delete/:id',requiresAuth, tournamentControllers.deleteTournament);

module.exports = router;

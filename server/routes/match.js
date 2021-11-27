
let express = require('express');
let router = express.Router();
let matchControllers = require('../controllers/matches');
const requiresAuth = require('../middleWare/authMiddleware')



/* GET matches */
router.get('/', matchControllers.displayMatches);

/* GET matches by tournament id */
router.get('/tournament/:id', matchControllers.displayMatchesByTournament);

/* GET matche by id */
router.get('/:id', matchControllers.displayMatch);

/* CREATE first matches*/
router.post('/create/first/:tournamentId',requiresAuth , matchControllers.createMatchesPerTournament);

/* CREATE matches*/
router.post('/update-match/:tournamentId',requiresAuth, matchControllers.updateMatchByTournamentId);

/* UPDATE match */
router.post('/update/:id',requiresAuth, matchControllers.updateMatch);

/* DELETE match 
router.post('/delete/:id', matchControllers.deleteTournament);
*/

module.exports = router;

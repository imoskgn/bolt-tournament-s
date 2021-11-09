
let express = require('express');
let router = express.Router();
let matchControllers = require('../controllers/matches')


/* GET matches */
router.get('/', matchControllers.displayMatches);

/* GET matches by tournament id */
router.get('/tournament/:id', matchControllers.displayMatchesByTournament);

/* GET matche by id */
router.get('/:id', matchControllers.displayMatch);

/* CREATE matches*/
router.post('/create/:id', matchControllers.createMatchesPerTournament);

/* UPDATE match */
router.post('/update/:id', matchControllers.updateMatch);

/* DELETE match 
router.post('/delete/:id', matchControllers.deleteTournament);
*/

module.exports = router;

let express = require('express');
let router = express.Router();

let indexControllers = require('../controllers/index')

/* GET home page. */
router.get('/', indexControllers.displayHomePage);
router.get('/home', indexControllers.displayHomePage);

module.exports = router;

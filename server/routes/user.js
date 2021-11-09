
let express = require('express');
let router = express.Router();
let userControllers = require('../controllers/users')


/* GET users list */
router.get('/', userControllers.displayUserList); 

/* GET user by id */
router.get('/:id', userControllers.displayUser);

/* CREATE user*/
router.post('/create', userControllers.createNewUser);

/* UPDATE user */
router.post('/update/:id', userControllers.updateUser);

/* DELETE user */
router.get('/delete/:id', userControllers.deleteUser);

module.exports = router;

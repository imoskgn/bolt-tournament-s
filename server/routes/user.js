
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
router.delete('/delete/:id', userControllers.deleteUser);


// LOGIN 
router.post('/login', userControllers.loginUser);





module.exports = router;

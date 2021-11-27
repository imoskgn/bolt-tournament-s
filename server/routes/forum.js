
let express = require('express');
let router = express.Router();
let forumController = require('../controllers/forum')
const requiresAuth = require('../middleWare/authMiddleware')



/* GET post list */
router.get('/post', forumController.displayPostList); 

/* GET post by id */
router.get('/post/:id',forumController.displayPostById );

// GET posts by tournament
router.get('/post/by-tournament/:id',forumController.displayPostsByTournament);

/* CREATE post*/
router.post('/post/create' , forumController.createNewPost );

/* UPDATE post */
router.post('/post/update/:id', forumController.updatePost);

/* DELETE post */
router.delete('/post/delete/:id',forumController.deletePost );



// COMMENTS

/* GET comment by  id */
router.get('/comment/:id',forumController.displayComment );

/* GET comment by post id */
router.get('/comment-by-post/:id',forumController.displayCommentsByPost );

/* CREATE comment*/
router.post('/comment/create/:postId' ,forumController.createCommentsOnPost );

/* UPDATE comment */
router.post('/comment/update/:id', forumController.updateComment);

/* DELETE comment */
router.delete('/comment/delete/:id' ,forumController.deleteComment);

module.exports = router;

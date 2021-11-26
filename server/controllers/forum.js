let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Post = require('../models/post');
let Comment = require('../models/comment');
const lodash = require('lodash');


/* GET Post list */
module.exports.displayPostList = (req, res, next) => {
    Post.find().exec((err, postList) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.json(postList);
        }
    });
};

/* GET Post by Id */
module.exports.displayPostById = (req, res, next) => {
    let id = req.params.id
    Post.findById(id).exec((err, post) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.json(post);
        }
    });
};

/* CREATE Post */
module.exports.createNewPost = (req, res, next) => {
   
    let newPost = Post({
        "title": req.body.title,
        "text" : req.body.text,
        "tournamentId" : req.body.tournamentId || "",
        "authorId" : req.user._id,
        "authorName" : req.user.name,
        "authorPhone":req.user.phoneNumber,
    });
    console.log(newPost)
    // Add new Post to the Database
    Post.create(newPost, (err, Post) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.json({ success: true, msg: 'New Post Successfully Created' });
        }
    });
}

/* UPDATE Post by Id*/
module.exports.updatePost = async (req, res, next) => {
    let id = req.params.id
    let post = await Post.findById(id)
    if (!post) {
        res.json(post);
    }
    else {
        post.title = req.body.title,
        post.text = req.body.text,
        post.save()
        res.json({ status: true, msg: "Post succesfully updated" })
    }
}


/* Delete post by id */
module.exports.deletePost = (req, res, next) => {
    let id = req.params.id;
    Post.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json({ success: true, msg: 'Post Successfully Deleted' });
        }
    })
}


/* GET Post by Tournament Id */
module.exports.displayPostsByTournament = (req, res, next) => {
    console.log("displayPostsByTournament")
    let id = req.params.id;
    Post.find({ tournamentId: id }).sort({ level: 1, order: 1 }).exec((err, postList) => {
        if (err) {
            return console.error(err);
        }
        else {
            postList = lodash.chain(postList).groupBy("level").values()
            res.status(200).json(postList);
        }
    });
};




//========================= COMMENTS =====================



/* GET comment by Post Id */
module.exports.displayCommentsByPost = (req, res, next) => {
    let id = req.params.id;
    Comment.find({ postId: id }).sort({ level: 1, order: 1 }).exec((err, commentList) => {
        if (err) {
            return console.error(err);
        }
        else {
            commentList = lodash.chain(commentList)
            
            .groupBy("level").values()
           
            
            res.status(200).json(commentList);
        }
    });
};

/* GET comment by Id */
module.exports.displayComment = (req, res, next) => {
    let id = req.params.id;
    Comment.findById(id, (err, comment) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.json(comment);
        }
    });
};




/* UPDATE comment by Id*/
module.exports.updateComment = (req, res, next) => {
    // console.log(req.params.id)
    let id = req.params.id
    updatedInfo = {
       "text" : req.body.text
    }
    Comment.findByIdAndUpdate(id, updatedInfo, (err) => {
        if (err) {
            console.log(err);
            res.json(err);
        }
        else {
            res.json({ success: true, msg: 'Comment Successfully Updated' });
        }
    })
}



/* CREATE comments on a post  */
module.exports.createCommentsOnPost = async (req, res, next) => {
    let id = req.params.postId;
    Post.findById(id, (err, post) => {
        if (!post) {
            return res.json({ success: false, msg: 'Post with id: ' + id + "not found" });
        }
        if (err) {
            return console.error(err);
        } else {
             //    create comment here
             let newComment = Comment({
                "text" : req.body.text,
                "postId" : req.params.postId,
                "authorId": req.user._id ,
                "authorName": req.user.name,
                "authorPhone": req.user.phoneNumber,
            });

            Comment.create(newComment, (err, User) => {
                if (err) {
                    console.log(err);
                    res.end(err);
                }
                else {
                    return res.json({ success: true, msg: 'Comments Succesfully Created' });
                }
            })
        }
    })
}


/* Delete tournament by id */
module.exports.deleteComment = (req, res, next) => {
    let id = req.params.id;
    Comment.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json({ success: true, msg: 'Comment Successfully Deleted' });
        }
    })
}


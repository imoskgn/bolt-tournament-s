const mongoose = require('mongoose');

        const commentSchema = new mongoose.Schema({
         text: {
              type: String,
              trim: true,
              required: true
           },
        date: {
              type: Date,
              default: Date.now
           },
        postID : String, // --- parent post id
        authorId : {
         type : String,
         required : true
       },
       authorName : {
         type:String,
         required : true
       }
         })

        module.exports = mongoose.model('Comment', commentSchema);
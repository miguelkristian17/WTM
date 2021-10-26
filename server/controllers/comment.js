const mongoose = require("mongoose");
const User = mongoose.model("User");
const Event = mongoose.model("Event");
const Comment = mongoose.model("Comment");

module.exports = {
    viewComments: (req, res) =>{
        Comment.find()
        .then(comments => res.json(comments))
        .catch(err => res.json(err))
    },

    createComment: (req, res) => {
        Event.findOne({_id : req.params.e_id}, (err,thisEvent) => {
            if(err){
                res.json(err);
            } else {
                User.findOne({_id : req.params.u_id}, (err, thisUser) => {
                    if(err){
                        res.json(err);
                    } else {
                        Comment.create({
                            name: thisUser,
                            event: thisEvent,
                            content: req.body.content
                        })
                        .then(comment => {res.json(comment)})
                        .catch(err => res.json(err))
                    }
                })
                }
        })
    },
    deleteComment: (req, res) => {
        Comment.findByIdAndDelete(req.params.c_id)
        .then(() => res.json({status : 'deleted!'})) 
        .catch(err => res.json(err));
    }
}
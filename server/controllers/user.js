const mongoose = require("mongoose");
const User = mongoose.model("User");
const Event = mongoose.model("Event");
const bcrypt = require('bcrypt');


module.exports = {

    viewUsers: (req, res) =>{
        User.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
    },

    // Handles Registration and session
    register: (req, res) =>{
        bcrypt.hash(req.body.password, 8)
        .then(hashedPW => {
            User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPW
            })
            .then(user => {
                req.session.user_id = user._id;
                res.json(user);
            })
        .catch(err => res.json(err))
        })
    },

    // Handles Login and Session
    login : (req, res) => {
        User.findOne({ email : req.body.email})
        .then(user => {
            if(user){ 
                bcrypt.compare(req.body.password, user.password)
                .then(result => {
                    if(result){
                    req.session.user_id = user._id;
                    res.json({status : 'Successfully Logged In!'});
                    } else {
                        res.json({status : "Incorrect Password!"})
                    }
                })
            } else {
            res.json({status : "error"})
            }
        })
    },
    // Gets Logged User Information
    viewLoggedUser: (req, res) =>{
        const user_id = req.session.user_id;
        if(user_id){ 
        User.findById(user_id)
            .then(user => 
                res.json({
                    user : {
                        firstName : user.firstName,
                        lastName : user.lastName,
                        email : user.email
                    }
                }))
            .catch(err => res.json(err));
        } else {
            res.json({user : "failed"})
        }
    },

    viewUser: (req, res) =>{
        const user_id = req.body.user_id;
        User.findById(user_id)
            .then(user => 
                res.json({
                    user : {
                        firstName : user.firstName,
                        lastName : user.lastName,
                        email : user.email
                    }
                }))
            .catch(err => res.json(err));
    },

    logout: (req,res) => {
        req.session.destroy();
        res.json({status : "Successfully Logged Out!"})
    },

    editUser: (req, res) =>{
        User.findByIdAndUpdate(
            req.params.id,
            {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
        },
        {
            runValidators : true
        })
        .then((data) => res.json(data))
        .catch(err => res.json(err));
    },  
    
    deleteUser: (req, res) =>{
        let userID = req.params.id;
        User.findByIdAndDelete(userID)
        .then(() => res.json({status : 'deleted!'})) 
        .catch(err => res.json(err));
        },

}

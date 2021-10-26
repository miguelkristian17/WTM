const mongoose = require("mongoose");
const User = mongoose.model("User");
const Event = mongoose.model("Event");

module.exports = {
viewEvents: (req, res) =>{
    Event.find()
    .then(events => res.json(events))
    .catch(err => res.json(err))
},

createEvent: (req, res) => {
    Event.create(req.body, (err, event) => {
        if(err){
        res.json(err)
        } else {
            User.findOneAndUpdate({_id: req.params.id}, {$push: {hosting: event}}, (err, data) => {
                if(err) {
                    res.json(err)
                } else {
                    res.json(data)
                }
            })
        }
    })
},


viewEvent: (req, res) =>{
    const eventID = req.body._id;
    Event.findOne({_id : eventID})
        .then(event => 
        res.json(event))
        .catch(err => res.json(err));
},
editEvent: (req, res) =>{
    Event.findByIdAndUpdate(
        req.params.id,
        {
        name : req.body.name,
        description : req.body.description,
        location : req.body.location,
    },
    {
        runValidators : true
    })
    .then((data) => res.json(data))
    .catch(err => res.json(err));
},  
attendEvent: (req, res) => {
    Event.findOne({_id : req.params.e_id}, (err,event) => {
    if(err){
        res.json(err)
    } else {
        User.updateOne({_id : req.params.u_id}, {$push: {attending: event}}, (err,data)=> {
            if(err) {
                res.json(err)
            } else {
                res.json(data)
            }
        })
    }
    })
},

deleteEvent: (req, res) =>{
    User.updateOne({_id : req.params.u_id}, {$pull: {hosting: {_id: req.params.e_id}}}, (err,data)=> {
    if(err) {
        res.json(err)
    } else {
        res.json(data)
    }
})},

testDelete: (req, res) =>{
    let eventID = req.params.id;
    Event.findByIdAndDelete(eventID)
    .then(() => res.json({status : 'deleted!'})) 
    .catch(err => res.json(err));
},

}

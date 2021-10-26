const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
// Event
const EventSchema = new mongoose.Schema({
    name: {
        type: String, required: [
            true, 
            'Please include a name!',
        ],
        minlength : [3, "Name must be at least 3 characters!"]
    },
    description: {
        type: String, 
        required: [
            true, 
            'Please include a description!',
        ],
    },
    likes: {
        type: Number, 
        default : 0
    },
    location: {
        type: String, required: [
            true, 
            'Please include a location!',
        ],
        minlength : [3, "Location must be at least 3 characters!"]
    },
    startTime: Date,
    endTime: Date,
}, { timestamps: true });

mongoose.model('Event', EventSchema);

// User
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String, required: [
            true, 
            'Please include a first name!',
        ],
        minlength : [2, "First Name must be at least 2 characters!"]
    },
    lastName: {
        type: String, 
        required: [
            true, 
            'Please include a last name!',
        ],
        minlength : [2, "Last Name must be at least 2 characters!"]
    },
    email: {
        type: String, 
        required: [
            true, 
            'Please include your email!', 
        ],
        unique: true
    },
    password: {
        type: String, required: [
            true, 
            'Please include a password!',
        ],
        minlength : [8, "Password must be at least 8 characters!"]
    },
    hosting : [EventSchema],
    attending : [EventSchema]

}, { timestamps: true });
mongoose.model('User', UserSchema);

// Comment to Events
const CommentSchema = new mongoose.Schema({
    name: UserSchema, 
    event : EventSchema,
    content: {
        type: String, 
        required: [
            true, 
            'Please include a comment!',
        ],
    },
    likes: {
        type: Number, 
        default : 0
    }, 

}, { timestamps: true });
mongoose.model('Comment', CommentSchema);

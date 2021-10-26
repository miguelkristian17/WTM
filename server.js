var express = require("express");
const session = require('express-session')
var app = express();
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(express.static( __dirname + '/public/dist/public' ));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect("mongodb://localhost/mean", { useNewUrlParser: true ,  useUnifiedTopology: true , useFindAndModify : false} );
require("./server/config/mongoose");

require("./server/config/routes")(app);
app.all('*', (req,res) => res.sendFile(__dirname + '/public/dist/public/index.html'));
app.listen(4200);

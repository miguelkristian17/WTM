const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/product',{ useUnifiedTopology: true , useNewUrlParser: true, useFindAndModify : false, useCreateIndex: true});

require('../models/user')
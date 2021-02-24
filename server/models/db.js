const mongoose = require("mongoose");
require('../config/config')

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true  },(err)=>{

    if(!err){
        console.log('Mongo db connection succeeded')}
        else
        {console.log("Error in Mongodb connection " + JSON.stringify(err));
    }
});


require('./user.model')
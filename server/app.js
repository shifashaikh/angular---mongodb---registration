require('./config/config');
require('./models/db');

const express = require ('express');
const bodyParser =require('body-parser');
const cors =require('cors');



const rtsIndex = require('./routes/index.router');

var app =express();
// middleware 
app.use(bodyParser.json());
app.use(cors());
app.use('/api' ,rtsIndex);

// error handling error validations
app.use((err,req,res,next)=>{

    if (err.name ===  "ValidationError"){
        var ValError =[];
        Object.keys(err.errors).forEach(key => ValError.push(err.errors[key].message));
        res.status(422).send(ValError)
    }
})

// start server
app.listen(process.env.PORT,()=>console.log(`server started at port : ${process.env.PORT}`));


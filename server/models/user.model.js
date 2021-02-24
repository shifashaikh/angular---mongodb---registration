const  mongoose = require('mongoose');
const bcrypt =require('bcryptjs');

var userSchema = new mongoose.Schema({

    fullName :{
        type :String,
        required:"Fullname cannot be empty"
    },
    email :{
        type :String,
        required:"Email id cannot be empty",
        unique :true
    },
    password :{
        type :String,
        required:"Password cannot be empty",
        minlength:[4,"Password must be atleast 4 characters long"]
    },
    saltSecret :{
        type :String,
    },
});

// validate email
userSchema.path('email').validate((val)=>{
    emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(val);
}, 'Invalid Email');

// Events
userSchema.pre('save',function(next){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(this.password,salt,(err,hash)=>{
            this.password =hash;
            this.saltSecret =salt;
            next();
        })
    })
})

mongoose.model('User',userSchema);

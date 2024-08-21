const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { type } = require("../schema");
const passportLocalMongoose=require("passport-local-mongoose");


//Here we planned to defined the username ,email and password but PASSPORT-MONGOOSE will automatically define an username
//and password with added salt and hashed value and store it in our database

//and t make the passport-mongoose able to do this we need to pass this as a plugin
const userschema=new Schema({
    email:{
        type:String,
        required:true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    }
});


userschema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userschema);

module.exports = User; 
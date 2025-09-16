const { name } = require("ejs");
const mongoose=require("mongoose");
const { applyTimestamps } = require("./url");

const userSchema= mongoose.Schema(
    {
        name:{
            type:String,
            required:false,
        },
        email:{
            type: String ,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
            
        },
    },{ timestamps:true,})

    const User=mongoose.model("User",userSchema);
     module.exports=User;

const mongoose=require("mongoose");



//schema

const chatSchema=new mongoose.Schema({

    from:{
        type:String,
        required:true
    },
    to:{
        type :String,
        required:true
    },

    message:{
        type:String,
        
    },
    created_at:{
        type:Date,
        required:true
    }
});

//model

const chat=mongoose.model("chat",chatSchema);

module.exports=chat;

const mongoose =require("mongoose");

const chat=require("./models/chat.js");


main().then(()=>{
    console.log("connection successful")

}).catch((err)=>{
    console.log(err)
})

async function main(){

    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp")
}

let allChats=[

{
    from:"arbaz khan",
    to:'salman khan',
    message:"send me your picture",
    created_at:new Date()
},
{
    from:"faiza  khan",
    to:'arbaz  khan',
    message:"send me your resume",
    created_at:new Date()
},
{
    from:"adnan khan",
    to:'faiza khan',
    message:"bring  one kg mangoes",
    created_at:new Date()
},
{
    from:"aman raza",
    to:'adnan khan',
    message:"please help me",
    created_at:new Date()
},
{
    from:"aman raza",
    to:'arbaz khan',
    message:"solve my this question",
    created_at:new Date()
},
{
    from:"arpit",
    to:'akash',
    message:"take my documents from college",
    created_at:new Date()
},
{
    from:"anuj",
    to:'aman jaiswal',
    message:"give me some money brothers",
    created_at:new Date()
},

{
    from:"ankit pandey",
    to:'amna kaluwa',
    message:"fuck you",
    created_at:new Date()
}

]

chat.insertMany(allChats);
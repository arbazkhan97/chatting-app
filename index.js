
const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const  methodOverride = require('method-override')
const app=express();
const chat=require("./models/chat.js");
const port=8080;

const ExpressError=require("./ExpressError")


app.set("view engine ","views")
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));




main()
.then(()=>{
    console.log("connection successfull")
})

.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');

}


// index route

app.get("/chats", asyncWrap (async (req,res)=>{
   
        let chats=await chat.find();

        res.render('index.ejs',{chats})
        


   

}))

// new add chat route

app.get('/chats/new',(req,res)=>{

    

    res.render("new.ejs");
})

app.post('/chats', asyncWrap (async (req,res,next)=>{
   
        let {from,to,message}=req.body;

        let newChat=new chat({
            from:from,
            to:to,
           message:message,
           created_at:new Date()
        })
    
        await newChat.save()
        
    
        res.redirect("/chats")

}));

// edit route

app.get('/chats/:id/edit', asyncWrap (async(req,res)=>{
 
        let {id}=req.params;

        let Chats= await chat.findById(id)
       
    
        res.render('edit.ejs',{Chats} )


   
}))

//update route


app.put("/chats/:id",asyncWrap( async(req,res)=>{
    

        let {id}=req.params;
    
        let {message:newMessage}=req.body;
    
        
        await chat.findByIdAndUpdate(id, {message:newMessage},{runValidators:true,new:true})
    
       
       res.redirect('/chats')

}))


// show route

app.get('/chats/:id',asyncWrap( async(req,res,next)=>{

    
        let {id}=req.params;

        const Chats=await chat.findById(id);
    
        if(!Chats){
          next(new ExpressError(404,"chat not found"))   
        }
    
        res.render('edit.ejs',{Chats});





}))


app.delete("/chats/:id", asyncWrap (async (req,res)=>{
    
        let {id}=req.params;

        await chat.findByIdAndDelete(id);
   
       
       res.redirect('/chats')
   

   
}))

app.get('/',(req,res)=>{
    res.send("server is working well");
})

// asyncWarp error handler


function asyncWrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch((err)=>{
            next(err);
        })
    }
}

const handleValidationError=(err)=>{

    console.log(" this is a valudation error please follow the rule")
    console.dir(err.message)
        return err;

};

app.use( (req,res,next,err)=>{

    console.log(err.name);
    if(err.name==="validationError"){
        err=handleValidationError(err)
       

    }
    next(err)
})

//error handling middlewares

app.use((err,req,res,next)=>{

    let {status=500,message='some error occured'}=err;

    res.status(status).send(message);
})

app.listen(port,()=>{
    console.log("server is listening on port",port);
})
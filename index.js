const express= require("express");
const mongoose=require("mongoose");

const app= express();

const dbConnect=async()=>{

    try{
        await mongoose.connect("mongodb+srv://amananurag20:ZBdNKY4UUtAcciyt@cluster0.5prn1dy.mongodb.net/");

        console.log("database connected");

    }catch(e){
        console.log(e);
    }
}

dbConnect()

const m1=(req,res,next)=>{
    
    req.game=["cricket","football","hockey"];
    console.log("m1 called");   
    next();
   
}

const m2=(req,res,next)=>{
    console.log("m2 called");    
    next();
}

app.get("/user",m1,m2,(req,res)=>{
    console.log("After m1")
    console.log(req.game)
    res.send("hello world");

});     

app.post("/user",(req,res)=>{
    res.send("post request");
});

app.delete("/user",(req,res)=>{
    res.send("delete request");
});

app.patch("/user",(req,res)=>{
    res.send("patch request");
});

app.listen(5000,()=>{
    console.log("server is listening on port 5000")
})



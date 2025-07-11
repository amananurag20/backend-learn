const express= require("express");
const app= express();

app.get("/home",(req,res)=>{
  
    res.send("hello working")
})

app.get("/",function(req,res){
    res.send("<h1>welcome back...</h1>")
})

app.listen(8000,()=>{
    console.log("Server is running on port 8000")
})

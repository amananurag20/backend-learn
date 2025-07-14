const express= require("express");

const app= express();

app.get("/user",(req,res)=>{
    res.send("hello world");
});

app.post("/user",(req,res)=>{
    res.send("post request");
});

app.delete("/user",(req,res)=>{
    res.send("delete request");
});

app.listen(5000,()=>{
    console.log("server is listening on port 5000")
})
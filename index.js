const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();

app.use(express.json()); //json->js object
app.use(express.urlencoded({ extended: false }));

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://amananurag20:ZBdNKY4UUtAcciyt@cluster0.5prn1dy.mongodb.net/studyplanner"
    );

    console.log("database connected");
  } catch (e) {
    console.log(e);
  }
};

dbConnect();

app.get("/user", (req, res) => {
  console.log("routeeee get");
  console.log(req.query);
  res.send("hello world");
});

app.post("/user", async(req, res) => {
  const { name, password, email } = req.body;

  try{
      const user= await User.create({
        name,
        email,
        password,   
      });
    
      res.status(201).json({success:true,user})
  }catch(e){
    console.log(e);
    res.status(400).json({success:false,message:"something went wrong"})
  } 
     

});

app.delete("/user", (req, res) => {
  res.send("delete request");
});

app.patch("/user", (req, res) => {
  res.send("patch request");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});

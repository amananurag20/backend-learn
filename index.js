const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require('cors');
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const Movie = require("./models/Movie");
const verifyToken = require("./middleware/verifyToken");
require('dotenv').config();

const app = express();

app.use(express.json()); //json->js object
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin:["http://localhost:5173","http://localhost:5174"], 
 
}))

const dbConnect = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL
    );

    console.log("database connected");
  } catch (e) {
    console.log(e);
  }
};

dbConnect();

app.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, message: "something went wrong" });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ success: true, user });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, message: "something went wrong" });
  }
});

app.post("/user/signup", async (req, res) => {
  const { name, password, email } = req.body;

  if (!password || !email) {
    res.json({ success: false, message: "password and email are required" });
  }
  console.log(req.body)

  const user = await User.findOne({ email: email });

  if (user) {
    return res.json({ success: false, message: "user already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword);

  try {
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(201).json({ success: true, user });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, message: "something went wrong" });
  }
});

app.post("/user/login", async (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res.json({
      success: false,
      message: "password and email are required",
    });
  }

  const user = await User.findOne({ email: email });
  

  if (!user) {
    return res.json({ success: false, message: "user does not exists" });
  }

  console.log(password, user.password);
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.json({ success: false, message: "wrong credentials" });
  }

  const token = jwt.sign(
    { email: user.email, id: user._id, game: "cricket" },
   process.env.JWT_SECRET,
    {
      expiresIn: "30m",
    }
  );

  res.setHeader("x-movie", "abcd");

  res.json({ success: true, user, message: "login successful", token });
});

app.delete("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, user });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "something went wrong" });
  }
});

app.patch("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);

    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, user });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, message: "something went wrong" });
  }
});

app.get("/movie", verifyToken,async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({ success: true, movies });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "something went wrong" });
  }
});

app.post("/movie", async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(200).json({ success: true, movie });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, message: "something went wrong" });
  }
});

app.get("/get-current-user",verifyToken,async(req,res)=>{

  const user=await User.findOne({email:req.user.email});
  res.json({success:true,user})
})


app.get("/check-token/:token",async(req,res)=>{

  const token=req.params.token;
  
  try{
    const data= jwt.verify(token, process.env.JWT_SECRET);
    res.json({success:true,message:"token is valid",})
  }catch(e){
   
    res.json({success:false,message:"invalid token"});

  }


})

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});

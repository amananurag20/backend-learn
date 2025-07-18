const express = require("express");
const mongoose = require("mongoose");
const bcrypt= require("bcrypt");
const User = require("./models/User");
const jwt= require("jsonwebtoken");
const Movie = require("./models/Movie");


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

app.get("/user", async(req, res) => {
   
    try{
        const users= await User.find();
        res.status(200).json({success:true,users})
    }catch(e){
       console.log(e);
       res.status(400).json({success:false,message:"something went wrong"}) 
    }
});

app.get("/user/:id", async(req, res) => {
   
    try{
        const user= await User.findById(req.params.id);
        res.status(200).json({success:true,user})
    }catch(e){
       console.log(e);
       res.status(400).json({success:false,message:"something went wrong"}) 
    }
});

app.post("/user/signup", async(req, res) => {
  const { name, password, email } = req.body;

  if(!password || !email){
      res.json({success:false,message:"password and email are required"})
  }

  const user=await User.find({email:email});

  if(user){
    return res.json({success:false,message:"user already exists"});
  }


  const hashPassword= await bcrypt.hash(password,10);
  console.log(hashPassword);

  try{
      const user= await User.create({
        name,
        email,
        password:hashPassword,   
      });
    
      res.status(201).json({success:true,user})
  }catch(e){
    console.log(e);
    res.status(400).json({success:false,message:"something went wrong"})
  } 
     

});

app.post("/user/login", async(req, res) => {

  const { password, email } = req.body;
  


  if(!password || !email){
    return res.json({success:false,message:"password and email are required"})
  }

  const user=await User.findOne({email:email});
  console.log(user);


  if(!user){
    return res.json({success:false,message:"user does not exists"});
  }
  
  console.log(password,user.password)
  const isPasswordCorrect= await bcrypt.compare(password,user.password);

  if(!isPasswordCorrect){
    return res.json({success:false,message:"wrong credentials"});

  };

  const token= jwt.sign({email:user.email,id:user._id,game:"cricket"},"secret",{
    expiresIn:"10m"
  })

  res.setHeader("x-movie","abcd")

  res.json({success:true,user,message:"login successful",token});
})



app.delete("/user/:id", async(req, res) => {
   
  try{
    const id=req.params.id;    
    const user= await User.findByIdAndDelete(id);
    res.status(200).json({success:true,user});   

  }catch(e){
    console.log(e);
    res.json({success:false,message:"something went wrong"})
  }
 
});

app.patch("/user/:id", async(req, res) => {

   try{
        const id=req.params.id;
        console.log(req.body)
    
        const user= await User.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({success:true,user})
    }catch(e){
       console.log(e);
       res.status(400).json({success:false,message:"something went wrong"}) 
    }
      
});


app.get("/movie",(req,res)=>{
    
   const token= req.headers.authorization.split(" ")[1];
   console.log(token);   

});



app.post("/movie",async (req,res)=>{

  
    try{
        const movie= await Movie.create(req.body);
        res.status(200).json({success:true,movie})
    }catch(e){
       console.log(e);
       res.status(400).json({success:false,message:"something went wrong"});

    }

})















app.listen(5000, () => {
  console.log("server is listening on port 5000");
});

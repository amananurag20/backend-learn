
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


const getAllUsers= async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, message: "something went wrong" });
  }
}

const getUserById=async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ success: true, user });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, message: "something went wrong" });
  }
}

const createUser=async (req, res) => {
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
}

const loginUser=async (req, res) => {
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
}

const deleteUser=async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, user });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "something went wrong" });
  }
}


const updateUserById=async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);

    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, user });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, message: "something went wrong" });
  }
}

const getCurrentUser=async(req,res)=>{

  const user=await User.findOne({email:req.user.email});
  res.json({success:true,user})
}

const checkToken=async(req,res)=>{

  const token=req.params.token;
  
  try{
    const data= jwt.verify(token, process.env.JWT_SECRET);
    res.json({success:true,message:"token is valid",})
  }catch(e){
   
    res.json({success:false,message:"invalid token"});

  }


}

module.exports={getAllUsers,getUserById,createUser,loginUser,deleteUser,updateUserById,getCurrentUser,checkToken};


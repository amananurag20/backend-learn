const express = require("express");
const cors = require('cors');
const nodemailer = require('nodemailer');
const dbConnect = require("./db/dbConnect");
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");
require('dotenv').config();

const app = express();

app.use(express.json()); //json->js object
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin:["http://localhost:5173","http://localhost:5174"], 
 
}))



dbConnect();

app.use("/user",userRouter);
app.use("/movie",movieRouter);


app.post("/send-mail",async(req,res)=>{
   const {email}=req.body;

   let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'amananurag.20@gmail.com',
    pass: process.env.APP_PASSWORD
  }
});

try{

  await transporter.sendMail({
    from: 'amananurag.20@gmail.com',
    to: email,
    subject: 'your verfication code is ',
    text: '<h1>your code is 2112</h1>'
  });  

  res.json({success:true,message:"email sent successfully"});
}catch(e){
  console.log(e);
  res.json({success:false,message:"something went wrong"})
}






})


app.listen(5000, () => {
  console.log("server is listening on port 5000");
});

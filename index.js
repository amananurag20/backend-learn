const express = require("express");
const cors = require('cors');
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
app.use("/movie",movieRouter)


app.listen(5000, () => {
  console.log("server is listening on port 5000");
});

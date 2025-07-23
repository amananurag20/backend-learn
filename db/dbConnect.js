const mongoose=require("mongoose")

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

module.exports = dbConnect;
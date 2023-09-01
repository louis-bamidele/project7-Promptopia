import mongoose from "mongoose";

let isConnected = false; // to track the cnnection to the database

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("DB is already connected");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("db is connected");
  } catch (error) {
    console.log("db", error);
  }
};

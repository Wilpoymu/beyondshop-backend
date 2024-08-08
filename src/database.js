import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/beyondshopdb")
    .then(db => console.log("DB is connected"))
    .catch(error => console.error("Error ", error));
const mongoose = require("mongoose");

mongoose.set('strictQuery', false);


mongoose.connect("mongodb://localhost:27017/Web_Whispers").then(()=>{
    console.log("connected!");
}).catch((err)=>{
    console.log(err);
})
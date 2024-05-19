const mongoose = require("./db.js");


const ecomSchema = new mongoose.Schema({
    itemName: String,  
    price:Number,
    image:String
});


const Laptop = mongoose.model("Laptop", ecomSchema);


module.exports = Laptop;
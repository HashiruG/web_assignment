const mongoose = require("./db.js");

const ecomSchema = new mongoose.Schema({
    itemName: String,  
    price:Number,
    image:String
});

const Phone = mongoose.model("Phone", ecomSchema);


module.exports = Phone;
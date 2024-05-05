const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');


const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect('mongodb://127.0.0.1:27017/recipe');

const recipeSchema = new mongoose.Schema({
    recipeName: String,  
    price:Number
});

const Recipe = mongoose.model("Recipe", recipeSchema);

app.get('/', (req, res) => {
    res.render("home");
});

app.get('/signup', (req, res) => {
    res.render("signup");
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
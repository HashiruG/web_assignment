const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');


const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect('mongodb://127.0.0.1:27017/ecom');

const ecomSchema = new mongoose.Schema({
    itemName: String,  
    price:Number,
    image:String
});

const Ecom = mongoose.model("Ecom", ecomSchema);


async function addItems(){
    try {
        await Ecom.insertMany([
            {
                itemName: "iphone 11",
                price: 149000,
                image: "https://appleasia.lk/wp-content/uploads/2023/03/iPhone-11-Price-in-Srilanka-Apple-Asia-Black-1-430x430.jpg"
            },
            {
                itemName: "ihone 12",
                price: 172000,
                image: "https://appleasia.lk/wp-content/uploads/2023/03/iPhone-12-Blue-SriLanka-Apple-Asia-1-430x430.jpg"
            },
            {
                itemName: "iPhone 13",
                price: 199000,
                image: "https://appleasia.lk/wp-content/uploads/2023/03/iphone-13-Pink-Price-in-Srilanka-Apple-Asia-1-430x430.jpg"
            },
            {
                itemName: "iphone 13 mini",
                price: 185000,
                image: "https://appleasia.lk/wp-content/uploads/2023/03/iphone-13-mini-midnight-Price-in-Srilanka-Apple-Asia-1-430x430.jpg"
            },
            {
                itemName: "iphone 13 pro",
                price: 329000,
                image: "https://appleasia.lk/wp-content/uploads/2023/03/iphone-13-pro-Graphite-Price-in-Srilanka-430x430.jpg"
            },
            {
                itemName: "iphone 14",
                price: 214000,
                image: "https://appleasia.lk/wp-content/uploads/2023/03/iPhone-14-Starlight-Price-in-Srilanka-Apple-Asia-1.webp"
            },
            {
                itemName: "iphone 14 pro max",
                price: 379000,
                image: "https://appleasia.lk/wp-content/uploads/2023/03/iPhone-14-Pro-Max-Apple-Asia-Srilanka-Silver-1-1024x1024.webp"
            },
            {
                itemName: "iphone SE3",
                price: 132000,
                image: "https://appleasia.lk/wp-content/uploads/2023/03/iPhone-SE-3-Price-in-Sri-lanka-Apple-Asia-Red-1-430x430.webp"
            },
        ])
    } catch (error) {
        console.log(error);
    }
}

// addItems();

app.get('/', (req, res) => {
    res.render("home");
});

app.get('/signup', (req, res) => {
    res.render("signup");
})

app.get("/phones", async(req, res) => {
    const items = await Ecom.find({});
    console.log(items);
    res.render("products", {IL1:items[0].image, IL2:items[1].image, IL3:items[2].image, IL4:items[3].image, IL5:items[4].image, IL6:items[5].image, IL7:items[6].image, IL8:items[7].image, 
        IN1:items[0].itemName, IN2:items[1].itemName, IN3:items[2].itemName, IN4:items[3].itemName, IN5:items[4].itemName, IN6:items[5].itemName, IN7:items[6].itemName, IN8:items[7].itemName,
        IP1:items[0].price, IP2:items[1].price, IP3:items[2].price, IP4:items[3].price, IP5:items[4].price, IP6:items[5].price, IP7:items[6].price, IP8:items[7].price
     });      
    });



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
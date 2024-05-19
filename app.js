require('dotenv').config()  
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');
const Laptop = require('./laptop.js');
const Phone = require('./phone.js');
const User = require('./user.js');




const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }))

app.use(passport.initialize());
app.use(passport.session());


passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

async function addPhones(){
    try {
        await Phone.insertMany([
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

// addPhones();

async function addLaptops(){
    try {
        await Laptop.insertMany([
            {
                itemName: "Macbook Air M2",
                price: 380000,
                image: "https://appleasia.lk/wp-content/uploads/2023/07/Untitled-design-4-430x430.png"
            },
            {
                itemName: "Macbook Air M1",
                price: 260000,
                image: "https://appleasia.lk/wp-content/uploads/2023/04/Apple-MacBook-Air-M1-Silver-Latest-Price-In-Sri-Lanka-1-430x430.webp"
            },
            {
                itemName: "Macbook Air M3",
                price: 504000,
                image: "https://appleasia.lk/wp-content/uploads/2024/01/M3-CHIP-14inch-Silver-4-430x430.jpg"
            },
            {
                itemName: "Macbook M1 Pro",
                price: 539000,
                image: "https://appleasia.lk/wp-content/uploads/2023/04/MacBook-Pro-14inch-Space-Grey-2021-Apple-Asia-2-430x430.webp"
            },
            {
                itemName: "Macbook M2 Pro",
                price: 689000,
                image: "https://appleasia.lk/wp-content/uploads/2023/04/MacBook-Pro-14inch-Silver-2023-Apple-Asia-1-430x430.webp"
            }
            
        ])
    } catch (error) {
        console.log(error);
    }
}

// addLaptops();

app.get('/', (req, res) => {
    res.render("home");
});

app.get('/signup', (req, res) => {
    res.render("signup");
})

app.post('/signup', async(req, res) => {
    User.register({username:req.body.email, active: false}, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
        }
      
        const authenticate = User.authenticate();
        authenticate(req.body.email, req.body.password, function(err, result) {
          if (err) {
            console.log(err);
          }else{
            res.redirect('/phones');
          }
      
         
        });
      });
})

app.get("/phones", async(req, res) => {
    const items = await Phone.find({});
    console.log(items);
    res.render("phones", {IL1:items[0].image, IL2:items[1].image, IL3:items[2].image, IL4:items[3].image, IL5:items[4].image, IL6:items[5].image, IL7:items[6].image, IL8:items[7].image, 
        IN1:items[0].itemName, IN2:items[1].itemName, IN3:items[2].itemName, IN4:items[3].itemName, IN5:items[4].itemName, IN6:items[5].itemName, IN7:items[6].itemName, IN8:items[7].itemName,
        IP1:items[0].price, IP2:items[1].price, IP3:items[2].price, IP4:items[3].price, IP5:items[4].price, IP6:items[5].price, IP7:items[6].price, IP8:items[7].price
     });      
    });

app.get("/laptops", async(req, res) => {
    const items = await Laptop.find({});
    console.log(items);
    res.render("laptops", {IL1:items[0].image, IL2:items[1].image, IL3:items[2].image, IL4:items[3].image, IL5:items[4].image, 
            IN1:items[0].itemName, IN2:items[1].itemName, IN3:items[2].itemName, IN4:items[3].itemName, IN5:items[4].itemName, 
            IP1:items[0].price, IP2:items[1].price, IP3:items[2].price, IP4:items[3].price, IP5:items[4].price
        });      
    });    



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
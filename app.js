// We have to perform "npm init" command
// Then we have to install express (npm i express) and pug (npm i pug).
const express =require("express");
const path=require("path");
const app=express();

//Connecting mongo database ("contactDance") to the mongodb compass
const mongoose=require('mongoose');
const bodyparser=require("body-parser");// we have not used it.
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser:true});
const port=80;

// Define mongoose schema
var contactSchema=new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
    desc:String
});

var Contact =mongoose.model("Contact",contactSchema);

// Express specific stuff
app.use('/static',express.static("static")); // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine','pug'); // Set the template engine as a Pug
app.set('views',path.join(__dirname,'views')) // Set the views directory

// ENDPOINTS
app.get('/',(req,res)=>{
    const params={};
    res.status(200).render('home.pug',params);
});

app.get('/contact',(req,res)=>{
    const params={};
    res.status(200).render('contact.pug',params);
});

app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("Item not saved to the database");
    });
    // res.status(200).render('contact.pug');
});

// START THE SERVER
app.listen(port,()=>{
    console.log(`The application started on successfully on port ${port}`);
});
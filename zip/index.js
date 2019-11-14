const express = require('express');
const app = new express(); 
const bodyParser = require('body-parser');
const urlEncoded = bodyParser.json();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://heidy:root@cluster0-qkgvi.mongodb.net/test?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://root:root@cluster0-qkgvi.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


const User = mongoose.model('user', {
    name: {         
        type: String,         
        require: true,  
        unique: true   
    },     
    age: {         
        type: Number,         
        require: true     
    }
}); 


app.use(express.static(__dirname + '/dist/app'));

app.get('/',(req, res)=>{
    res.sendFile(__dirname + '/dist/app/index.html');
});

//Retrieve all users.
app.get('/users', (req, res)  => {     
    User.find({}, (err, data) => {         
        if (err) throw err;         
        res.json(data);     
    }); 
});

//Add new user document.
app.post('/user', urlEncoded, (req, res) => {     
    var user = new User({   
        name: req.body.name,         
        age: req.body.age,
    });     
    user.save((err) => { 
        if(err) res.json({msg:'Invalid Request!'});         
        res.json({msg:'Record saved!'})     
    }); 
}); 

const PORT = process.env.PORT || 80;

app.listen(PORT,()=>{
    console.log(`Server running at PORT $(PORT)`);
});
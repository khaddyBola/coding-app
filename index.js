var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mydb',{useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', () => console.log('Error in connecting to Database'));
db.once('open', () => console.log('Connected to Database'));

app.post('/sign_up', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var state = req.body.state;
    var gender = req.body.gender;
    var education = req.body.education;
    var birth = req.body.birth;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email": email,
        "state": state,
        "gender": gender,
        "education": education,
        "birth": birth,
        "phno": phno,
        "password": password
    }

    db.collection('users').insertOne(data,(err,collection) => {
        if(err) {
            throw err
        }
        console.log("Successfully created user")
    });

    return res.redirect('signup_success.html')

})

app.get('/', (req, res) => {
    res.set({
        "Allow-access-Allow-origin": "*",
    });
    return res.redirect('index.html');
}).listen(5000);

console.log('Listening on port 5000');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const mongoUrl = "mongodb://mongo:27017/docker-node-mongo-usergenerator";


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: false
}));

var connectWithRetry = function () {
  return mongoose.connect('mongodb://mongo:27017/docker-node-mongo-usergenerator', {
      // return mongoose.connect('mongodb://localhost:27017/docker-node-mongo-usergenerator', {
      useNewUrlParser: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))
};

connectWithRetry();

const User = require('./models/User');


app.get('/', (req, res) => {
  console.log('connection attempted')

  User.find()
    .then(users => {
      res.render('index', {
        users
      })
    })
    .catch(err => res.status(404).json({
      msg: 'No users found',
      error: err
    }));
});

app.get('/userlist', (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json({
        users
      })
    })
    .catch(err => res.status(404).json({
      msg: 'No users found',
      error: err
    }));
})

app.post('/user/add', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    birthdate: req.body.birthdate,
    country: req.body.country
  })
  newUser.save().then(user => res.redirect('/'))
})



const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
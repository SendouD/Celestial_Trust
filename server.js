const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Mailsender = require('./email_backend');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/your_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database successfully');
});

const donationSchema = new mongoose.Schema({
  donationAmount: Number,
  paymentMethod: String,
  name: String,
  email: String,
  phone: String,
  country: String,
  address: String,
  city: String,
  anonymous: Boolean,
  consent: Boolean
});

const usersSchema = new mongoose.Schema({
  username: String,
  email: String,
  phonenumber: Number,
  password: String
});

const User = mongoose.model('User', usersSchema); // Create a model from the users schema

const Donation = mongoose.model('Donation', donationSchema);

app.get('/', (req, res) => {

  return res.redirect('login-sign.html');
});




// register

app.post('/register', async (req, res) => {


  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    // If the email already exists, send a response indicating the conflict
    return res.status(409).send('Email already exists');
  }
 const hashedpassword=await bcrypt.hash(req.body.newpassword,10);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    phonenumber: req.body.phno,
    password: hashedpassword
  });
  try {
    console.log(newUser);
    const newuserdetail = await newUser.save();
    return res.status(200).send();
  } catch (err) {
    console.log(err);
  }
});


// login
app.post('/login', async (req, res) => {
  const { email,pswd} = req.body;
  console.log(req.body);

  try {
      // Find the user by email
      const user = await User.findOne({ email });

      if (user) {
          const passwordMatch = await bcrypt.compare(pswd,user.password);

          if (passwordMatch) {
            return res.status(200).redirect('donation.html');
          } else {
              res.status(401).json({ message: 'Incorrect email or password' });
          }
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});










// donate-form
app.post('/donate', async (req, res) => {
  console.log(req.body);
  const newDonation = new Donation({
    donationAmount: req.body.donationAmount,
    paymentMethod: req.body.paymentMethod,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    country: req.body.country,
    address: req.body.address,
    city: req.body.city,
    anonymous: req.body.anonymous === 'on',
    consent: req.body.consent === 'on'
  });

  try {
    const savedDonation = await newDonation.save();
    console.log(savedDonation);
    Mailsender.success(savedDonation.email, savedDonation.donationAmount);
    console.log("success");
    res.status(200).redirect('confirmation.html');
  } catch (error) {
    console.error(error);
    console.log("error");
    res.status(500).send('Error saving donation');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Mailsender=require('./email_backend')


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
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


const Donation = mongoose.model('Donation', donationSchema);

app.get('/',(req,res)=>{
 
   
  res.set({
    "Allow-Control-Allow-origin":'*'
})
return res.redirect('donation.html')
})

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
    Mailsender.success(savedDonation.email,savedDonation.donationAmount);
    console.log("success");
    res.status(200).send('Donation saved successfully');
  } catch (error) {
    console.error(error);
    console.log("error");
    res.status(500).send('Error saving donation');
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Mailsender = require('./controller/email_backend');
const cors = require('cors');
const bcrypt = require('bcrypt');
const donate=require('./controller/donate');
const login=require('./controller/login');
const register=require('./controller/register')
const volunteer=require('./controller/volunteer_form')





const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));
app.use(bodyParser.json());





// database connection
mongoose.connect('mongodb://127.0.0.1:27017/your_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database successfully');
});





app.get('/', (req, res) => {
  return res.redirect('/volunteer.html');
});



// routes
app.use("/donate",donate)
app.use("/login",login)
app.use("/register",register)
app.use("/volunteer",volunteer)



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

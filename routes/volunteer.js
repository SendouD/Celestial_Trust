const express=require("express");
let volunteer= express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');


const formDataSchema = new mongoose.Schema({
    full_name: String,
    email: String,
    phone_number: String,
    address: String,
    message: String
});

const FormData = mongoose.model('VolunteerData', formDataSchema);

// Route to handle form submission
volunteer.route('/').post( async (req, res) => {
    try {
        // Create a new instance of FormData model with data from the request body
        const newFormData = new FormData({
            full_name: req.body.full_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            address: req.body.address,
            message: req.body.message
        });

        // Save the new form data to the database
        const savedFormData = await newFormData.save();
        console.log('Form data saved:', savedFormData);

        // Respond with a success message
        res.status(200).send('Form submitted successfully');
    } catch (error) {
        // If an error occurs, log the error and respond with an error message
        console.error('Error saving form data:', error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports=volunteer
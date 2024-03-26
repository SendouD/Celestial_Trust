const express=require("express");
let volunteer= express.Router();
const bcrypt = require('bcrypt');
const volunteerdata=require('../Models/volunteer_schema')

// Route to handle form submission
volunteer.route('/').post( async (req, res) => {
    try {
        // Create a new instance of volunteerdata model with data from the request body
        const newvolunteerdata = new volunteerdata({
            full_name: req.body.full_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            address: req.body.address,
            message: req.body.message
        });

        // Save the new form data to the database
        const savedFormData = await newvolunteerdata.save();
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
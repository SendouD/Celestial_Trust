const express = require('express');
const router = express.Router();
const user = require("../Models/User_schema");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

router.get('/', (req, res) => {
    res.render('forgot-password');
});

router.post('/', async (req, res) => {
    const { email } = req.body;

    if (await user.findOne({ email: email })) {
        const secret = process.env.JWT_SECRET;
        const payload = {
            email: user.email,
            id: user.id
        }

        const token = jwt.sign(payload, secret, { expiresIn: "1d" });
        res.redirect(`/forgotpassword/reset/${email}/${token}`);




    }


});

router.get('/reset/:userId/:token', (req, res) => {
    const { userId, token } = req.params;
    console.log(req.params);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.render('reset-password', { email: userId });
    } catch (error) {
        console.error('Error validating token:', error);
        res.status(400).send('Invalid or expired token');
    }
});

router.post('/reset-password', async (req, res) => {
    const { user_email, password, password2 } = req.body;
    console.log(req.body);

    if (password !== password2) {
        return res.status(404).redirect("/");
    } else {
        const bcryted_thing = await bcrypt.hash(password, 10);
        console.log(bcryted_thing);
        const details = await user.findOneAndUpdate({ email: req.body.email }, { $set: { password: bcryted_thing } });
        console.log(details);
        return res.status(200).redirect("/");
    }
})
module.exports = router;

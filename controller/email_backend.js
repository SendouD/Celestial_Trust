const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.EMAIL_ID}`,
    pass: `${process.env.EMAIL_PASS}`,
  },
});

async function success(recieverID,amount) {
  
  const info = await transporter.sendMail({
    from: `"ik " <${process.env.EMAIL_ID}>`, 
    to:`${recieverID}`, 
    subject: "Confirmation of Donation ", 
    text: `Your Donation of RS ${amount} is successful the receipt is attached with this Mail . Thank You for being a part of making a change :>`,
  });
  

  console.log("Message sent: %s", info.messageId);
}


async function newsletter() {
  
  const info = await transporter.sendMail({
    from: `"ik " <${process.env.EMAIL_ID}>`, 
    to: 'jananathan.m22@iiits.in',
    subject: "Hello ✔", 
    text: "Congratulation You Will be receiving a newsletter from our side, based on our ongoing projects", // plain text body
  });

  console.log("Message sent: %s", info.messageId);
}
// newsletter();

async function failure() {
  const info = await transporter.sendMail({
    from: `"ik " <${process.env.EMAIL_ID}>`,
    to:'jananathan.m22@iiits.in',
    subject: "Hello ✔",
    text: "Your Payment has not been accepted due to some circumstancial issues. Please try again",
  });

  console.log("Message sent: %s", info.messageId);
}
// failure();
module.exports = { success,failure,newsletter};
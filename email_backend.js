const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "inthrakumar.a22@iiits.in",
    pass: "wvef uhhv enyk thop",
  },
});

async function success() {
  
  const info = await transporter.sendMail({
    from: '"ik " <inthrakumar.a22@iiits.com>', 
    to:'jayaram.v22@iiits.in', 
    subject: "Hello ✔", 
    text: "",
  });
  success();

  console.log("Message sent: %s", info.messageId);
}
success();

async function newsletter() {
  
  const info = await transporter.sendMail({
    from: '"ik " <inthrakumar.a22@iiits.com>', 
    to: 'jananathan.m22@iiits.in',
    subject: "Hello ✔", 
    text: "Congratulation You Will be receiving a newsletter from our side, based on our ongoing projects", // plain text body
  });

  console.log("Message sent: %s", info.messageId);
}
// newsletter();

async function failure() {
  const info = await transporter.sendMail({
    from: '"ik 👻" <inthrakumar.a22@iiits.com>',
    to:'jananathan.m22@iiits.in',
    subject: "Hello ✔",
    text: "Your Payment has not been accepted due to some circumstancial issues. Please try again",
  });

  console.log("Message sent: %s", info.messageId);
}
// failure();
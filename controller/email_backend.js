const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `inthrakumar.a22@iiits.in`,
    pass: `ssoe xolm vssm hcwc`,
  },
});

async function donation_success(recieverID, amount) {

  const info = await transporter.sendMail({
    from: `"ik " <${process.env.EMAIL_ID}>`,
    to: `${recieverID}`,
    subject: "Confirmation of Donation ",
    text: `Your Donation of RS ${amount} is successful the receipt is attached with this Mail . Thank You for being a part of making a change :>`,
  });
  

}

async function volunteer(recieverID,amount) {
  
  const info = await transporter.sendMail({
    from: `"ik " <${process.env.EMAIL_ID}>`, 
    to:`${recieverID}`, 
    subject: "volunteer application status", 
    text: `your volunteer application is under review. Thank You for being a part of making a change :>`,
  });
  

}


async function newsletter(mail_id) {

  const info = await transporter.sendMail({
    from: `"ik " inthrakumar.a22@iiits.com`,
    to: `${mail_id}`,
    subject: "News Letter",
    text: "Congratulation You Will be receiving a newsletter from our side, based on our ongoing projects", // plain text body
  });


}
// newsletter();

async function donation_failure() {
  const info = await transporter.sendMail({
    from: `"ik " <${process.env.EMAIL_ID}.com>`,
    to: 'jananathan.m22@iiits.in',
    subject: "Hello ✔",
    text: "Your Payment has not been accepted due to some circumstancial issues. Please try again",
  });

}

async function donation_failure() {
  const info = await transporter.sendMail({
    from: `"ik " <${process.env.EMAIL_ID}.com>`,
    to: 'jananathan.m22@iiits.in',
    subject: "Hello ✔",
    text: "Your Payment has not been accepted due to some circumstancial issues. Please try again",
  });

} 

async function weekly_newsletter(to, week, sub, text) {
  const info = await transporter.sendMail({
    from: `"ik " <${process.env.EMAIL_ID}.com>`,
    to: `${to}`,
    subject: `${sub}`,
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <div
          class="mail"
          style="
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
          "
        >
          <div
            class="week_no"
            style="
              color: #222020;
              margin: 0.3rem;
              font-size: 1.5rem;
              padding: 0.5rem;
              padding-left: 1rem;
              font-family: 'Times New Roman', Times, serif;
            "
          >
            <p>Week no ${week}</p>
          </div>
          
          <div class="text" style="width:70vw; font-size:1rem; font-family:Arial, Helvetica, sans-serif">
            <p>
              ${text}
            </p>
          </div>
        </div>
      </body>
    </html>
    `,
  });
}

async function report(recieverID) {
  const mailOptions = await transporter.sendMail({
    from: `"ik " <${process.env.EMAIL_ID}.com>`,
    to: `${recieverID}`, 
    subject: 'Notification of Reported Trust',
    text: 'This mail is to inform you that, you have reported concerns regarding potential misconduct within [Trust Name]. We ensure you appropriate action will be taken to address these concerns. Thank you for your attention to this matter.'
  });
}


// donation_failure();
module.exports = { donation_success,donation_failure,newsletter,weekly_newsletter,volunteer};
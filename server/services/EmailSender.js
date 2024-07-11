const nodemailer = require("nodemailer");

const EMAIL_USER = process.env.NODEMAIL_USER;
const EMAIL_PASS = process.env.NODEMAIL_PASS;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const EmailSender = ({
  appointment,
  appointmentDate,
  appointmentTime,
  doctorName,
  meetingLink,
}) => {
  const d = new Intl.DateTimeFormat("en-us", {
    dateStyle: "long",
  });
  const t = new Intl.DateTimeFormat("en-us", {
    timeStyle: "short",
  });
  console.log("==================");
  console.log("updated Appointments");
  console.log(appointment);
  console.log("==================");

  const mailOptions = {
    from: {
      name: "DocStream",
      address: EMAIL_USER,
    },
    to: appointment.email,
    subject: "Your Appointment is Booked!",
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      background-color: #f7f7f7;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .header {
      background-color: #159eec;
      color: #fff;
      padding: 20px;
      text-align: center;
      border-bottom: 1px solid #ddd;
    }
    .content {
      padding: 20px;
     color: rgb(127, 133, 138)!important;
    }
    .content p {
      margin: 10px 0;
    }
    .content .appointment-details {
      background-color: #f1f1f1;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
      box-shadow: 0 0 5px rgba(0,0,0,0.1);
    }
    .content .appointment-details strong {
      color: #159eec;
    }
    .content .appointment-details p {
      margin: 5px 0;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      margin: 20px 0;
      background-color: #1f2b6c;
      color: #fff!important;
      text-decoration: none;
      border-radius: 5px;
      text-align: center;
      transition: background-color 0.3s ease;
    }
    .button:hover {
      background-color: #159eec;
    }
    .meeting-link {
      word-break: break-all;
    }
    .footer {
      background-color: #159eec;
      padding: 10px;
      text-align: center;
      border-top: 1px solid #ddd;
      color: #fff;
      font-size: 12px;
    }
    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <header class="header">
      <h1>Your Appointment is Confirmed</h1>
    </header>
    <section class="content">
      <p>Dear ${appointment.firstName} ${appointment.lastName},</p>
      <p>We are pleased to inform you that your appointment has been confirmed. Here are the details:</p>
      <div class="appointment-details">
        <p><strong>Date:</strong> ${d.format(new Date(appointmentDate))}</p>
        <p><strong>Time:</strong> ${t.format(new Date(appointmentTime))}</p>
        <p><strong>Treatment:</strong> ${appointment.treatment}</p>
        <p><strong>Doctor:</strong> ${doctorName}</p>
      </div>
      <p>Please click the link below to join the video meeting at the scheduled time:</p>
      <a href="${meetingLink}" class="button">Join Video Meeting</a>
      <p>If the button above doesn't work, please click the link below:</p>
      <p class="meeting-link">
        <a href="${meetingLink}">Video Meeting Link</a>
      </p>
      <p>If you have any questions or need to reschedule, please contact us at info@docstream.gmail.com.</p>
      <p>Thank you,<br />DocStream</p>
    </section>
    <footer class="footer">
      <p>&copy; ${new Date().getFullYear()} DocStream. All rights reserved.</p>
      <p>Adiss Ababa, Ethiopia</p>
    </footer>
  </div>
</body>
</html>
`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  EmailSender,
};

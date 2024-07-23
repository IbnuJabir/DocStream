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

const EmailToClient = ({
  appointment,
  appointmentDate,
  appointmentTime,
  doctorName,
  meetingLink,
}) => {
  const t = new Intl.DateTimeFormat("en-us", {
    timeStyle: "short",
  });

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
      background-color: #159eec;
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
        <p><strong>Date:</strong> ${appointmentDate}</p>
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
      console.log("Email sent to client");
    }
  });
};

const EmailToDoctor = ({
  appointment,
  appointmentDate,
  appointmentTime,
  doctorName,
  docEmail,
  meetingLink,
}) => {
  const t = new Intl.DateTimeFormat("en-us", {
    timeStyle: "short",
  });

  const mailOptions = {
    from: {
      name: "DocStream",
      address: EMAIL_USER,
    },
    to: docEmail,
    subject: "Your have a new  Appointment!",
    html: `<!DOCTYPE html>
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
      color: rgb(127, 133, 138) !important;
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
      background-color: #159eec;
      color: #fff !important;
      text-decoration: none;
      border-radius: 5px;
      text-align: center;
      transition: background-color 0.3s ease;
    }
    .button:hover {
      background-color: #128bcc;
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
      <h1>Upcoming Appointment</h1>
    </header>
    <section class="content">
      <p>Hello ${doctorName},</p>
      <p>You have an upcoming appointment scheduled. Here are the details:</p>
      <div class="appointment-details">
        <p><strong>Date:</strong> ${appointmentDate}</p>
        <p><strong>Time:</strong> ${t.format(new Date(appointmentTime))}</p>
        <p><strong>Patient:</strong> ${appointment.firstName} ${
      appointment.lastName
    }</p>
        <p><strong>Treatment:</strong> ${appointment.treatment}</p>
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
      <p>Addis Ababa, Ethiopia</p>
    </footer>
  </div>
</body>
</html>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent to Doctor ");
    }
  });
};

const SuspendedEmail = ({ updatedAppointment }) => {
  const t = new Intl.DateTimeFormat("en-us", {
    timeStyle: "short",
  });

  const mailOptions = {
    from: {
      name: "DocStream",
      address: EMAIL_USER,
    },
    to: updatedAppointment.email,
    subject: "Your Appointment is Suspended!",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
            background-color: #ff6666; /* Red color to indicate suspension */
            color: #fff;
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid #ddd;
        }
        .content {
            padding: 20px;
            color: rgb(127, 133, 138) !important;
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
            background-color: #159eec;
            color: #fff !important;
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
            <h1>Appointment Suspended</h1>
        </header>
        <section class="content">
           <p>Dear ${updatedAppointment.firstName} ${
      updatedAppointment.lastName
    },</p>
            <p>We regret to inform you that your appointment has been suspended because we are unable to provide the service at the scheduled time you selected. We sincerely apologize for any inconvenience this may cause.</p>
            <div class="appointment-details">
                <p><strong>Transaction Reference:</strong> ${
                  updatedAppointment.tx_ref
                } </p>
            </div>
            <p>You can reschedule your appointment by using your transaction reference on the DocStream website in the suspended appointments page. Alternatively, you can also use the following link:</p>
            <a href="https://docstream-frontend.onrender.com/my-appointments" class="button">Reschedule Appointment</a>
            <p>If you have any questions or need assistance, please contact us at info@docstream.gmail.com.</p>
            <p>Thank you,<br />DocStream Team</p>
        </section>
        <footer class="footer">
            <p>&copy; ${new Date().getFullYear()} DocStream. All rights reserved.</p>
            <p>Addis Ababa, Ethiopia</p>
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
      console.log("Suspended Email sent to client");
    }
  });
};

const ContactEmail = ({ currentAppointment, contactMessage }) => {
  const t = new Intl.DateTimeFormat("en-us", {
    timeStyle: "short",
  });

  const mailOptions = {
    from: {
      name: "DocStream",
      address: EMAIL_USER,
    },
    to: currentAppointment.email,
    subject: "Message from DocStream!",
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
          <h1>Message from DocStream</h1>
        </header>
        <section class="content">
          <p>Dear ${currentAppointment.firstName} ${currentAppointment.lastName},</p>
          <p>${contactMessage}</p>
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
      console.log("Contact Email sent to client");
    }
  });
};

module.exports = {
  EmailToClient,
  EmailToDoctor,
  SuspendedEmail,
  ContactEmail,
};

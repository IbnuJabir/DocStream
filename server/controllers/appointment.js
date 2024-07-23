const Appointment = require("../models/Appointment");
const axios = require("axios");
const {
  EmailToClient,
  EmailToDoctor,
  SuspendedEmail,
  ContactEmail,
} = require("../services/EmailSender");
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({
      createdAt: -1,
    });

    if (!appointments || appointments.length === 0) {
      return res.status(404).send("Appointment not found");
    }

    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

const getAllAppointmentsWithInterval = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });

    if (!appointments || appointments.length === 0) {
      return res.status(404).send("Appointments not found");
    }

    // Initialize the result object with 5-hour intervals
    const result = {
      "00-05": 0,
      "05-10": 0,
      "10-15": 0,
      "15-20": 0,
      "20-24": 0,
    };

    // Helper function to get the hour from a date
    const getHourOfDay = (dateStr) => {
      return new Date(dateStr).getUTCHours();
    };

    // Iterate over each appointment
    appointments.forEach((appointment) => {
      const hour = getHourOfDay(appointment.createdAt);

      if (hour >= 0 && hour < 5) {
        result["00-05"]++;
      } else if (hour >= 5 && hour < 10) {
        result["05-10"]++;
      } else if (hour >= 10 && hour < 15) {
        result["10-15"]++;
      } else if (hour >= 15 && hour < 20) {
        result["15-20"]++;
      } else if (hour >= 20 && hour < 24) {
        result["20-24"]++;
      }
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

const getUsersAppointments = async (req, res) => {
  const { userEmail } = req.body;

  try {
    const userAppointments = await Appointment.find({ email: userEmail }).sort({
      createdAt: -1,
    });

    if (!userAppointments || userAppointments.length === 0) {
      return res.status(404).send("You have No Appointments!");
    }

    return res.status(200).json(userAppointments);
  } catch (error) {
    return res.status(500).send("Server error");
  }
};
const getSingleAppointment = async (req, res) => {
  // const appointments = await Appointment.findOne({ _id: appointmentId });
};

const addAppointment = async (req, res) => {
  const newAppointmet = await Appointment.create(req.body);
  return res.status(200).json(newAppointmet);
};

const getBookedAppointments = async (req, res) => {
  try {
    const bookedAppointments = await Appointment.find({ status: "booked" })
      .sort({
        createdAt: -1,
      })
      .limit(5);
    if (!bookedAppointments || bookedAppointments.length === 0) {
      return res.status(404).send("No Booked Appointments found");
    }
    return res.status(200).json(bookedAppointments);
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

const approve = async (req, res) => {
  const {
    appointment,
    appointmentDate,
    appointmentTime,
    doctorName,
    meetingLink,
    docEmail,
  } = req.body;

  try {
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { _id: appointment._id },
      { $set: { status: "booked" } },
      { new: true }
    );

    if (updatedAppointment) {
      await EmailToClient({
        appointment,
        appointmentDate,
        appointmentTime,
        doctorName,
        meetingLink,
      });
      await EmailToDoctor({
        appointment,
        appointmentDate,
        appointmentTime,
        doctorName,
        docEmail,
        meetingLink,
      });
    } else {
      throw new Error("No appointment found to update");
    }

    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update appointments" });
  }
};

const suspend = async (req, res) => {
  const appointment = req.body;
  console.log("appointment", appointment);
  try {
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { _id: appointment._id },
      { $set: { status: "suspended" } },
      { new: true } // Ensure we get the updated document
    );
    await SuspendedEmail({
      updatedAppointment,
    });
    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to suspend the appointment" });
  }
};

const contact = async (req, res) => {
  const { currentAppointment, contactMessage } = req.body;
  try {
    await ContactEmail({
      currentAppointment,
      contactMessage,
    });
    res.json({ message: contactMessage });
  } catch (error) {
    res.status(500).json({ error: "Failed to update appointments" });
  }
};
module.exports = {
  getAllAppointments,
  getAllAppointmentsWithInterval,
  getUsersAppointments,
  getBookedAppointments,
  getSingleAppointment,
  addAppointment,
  approve,
  suspend,
  contact,
};

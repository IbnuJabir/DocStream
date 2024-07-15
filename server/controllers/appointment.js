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
      console.log("No Appointments");
      return res.status(404).send("Appointment not found");
    }

    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return res.status(500).send("Server error");
  }
};

const getAllAppointmentsWithInterval = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });

    if (!appointments || appointments.length === 0) {
      console.log("No Appointments");
      return res.status(404).send("Appointments not found");
    }

    // Helper function to get the day of the month from a date
    const getDayOfMonth = (dateStr) => {
      return new Date(dateStr).getUTCDate();
    };

    // Initialize the result object with intervals
    const result = {
      '1-5': 0,
      '6-10': 0,
      '11-15': 0,
      '16-20': 0,
      '21-25': 0,
      '26-30': 0,
    };

    // Iterate over each appointment
    appointments.forEach(appointment => {
      const day = getDayOfMonth(appointment.createdAt);
      
      if (day >= 1 && day <= 5) {
        result['1-5']++;
      } else if (day >= 6 && day <= 10) {
        result['6-10']++;
      } else if (day >= 11 && day <= 15) {
        result['11-15']++;
      } else if (day >= 16 && day <= 20) {
        result['16-20']++;
      } else if (day >= 21 && day <= 25) {
        result['21-25']++;
      } else if (day >= 26 && day <= 30) {
        result['26-30']++;
      }
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return res.status(500).send("Server error");
  }
};


const getSingleAppointment = async (req, res) => {
  console.log("from getSingleAppointment");
  console.log(req.params);
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
      console.log("No Booked Appointments");
      return res.status(404).send("No Booked Appointments found");
    }
    return res.status(200).json(bookedAppointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
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
    console.error("Error while updating appointments:", error);
    res.status(500).json({ error: "Failed to update appointments" });
  }
};

const suspend = async (req, res) => {
  const selectedRows = req.body;
  try {
    // Use Promise.all() to wait for all updates to complete
    const updatedAppointments = await Promise.all(
      selectedRows.map(async (id) => {
        const updatedAppointment = await Appointment.findOneAndUpdate(
          { _id: id },
          { $set: { status: "suspended" } },
          { new: true } // Ensure we get the updated document
        );
        await SuspendedEmail({
          updatedAppointment,
        });
        console.log("updatedAppointment", updatedAppointment);
        return updatedAppointment;
      })
    );
    res.json(updatedAppointments);
  } catch (error) {
    console.error("Error while updating appointments:", error);
    res.status(500).json({ error: "Failed to update appointments" });
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
    console.error("Error while updating appointments:", error);
    res.status(500).json({ error: "Failed to update appointments" });
  }
};
module.exports = {
  getAllAppointments,
  getAllAppointmentsWithInterval,
  getBookedAppointments,
  getSingleAppointment,
  addAppointment,
  approve,
  suspend,
  contact,
};

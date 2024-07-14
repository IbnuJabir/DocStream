const Appointment = require("../models/Appointment");
const axios = require("axios");
const { EmailToClient, EmailToDoctor } = require("../services/EmailSender");
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
        return updatedAppointment;
      })
    );

    res.json(updatedAppointments);
  } catch (error) {
    console.error("Error while updating appointments:", error);
    res.status(500).json({ error: "Failed to update appointments" });
  }
};

module.exports = {
  getAllAppointments,
  getBookedAppointments,
  getSingleAppointment,
  addAppointment,
  approve,
  suspend,
};

const fs = require("fs");
const path = require("path");
const Doctor = require("../models/Doctor");

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({
      createdAt: -1,
    });

    if (!doctors || doctors.length === 0) {
      console.log("No Doctor Found");
      return res.status(404).send("No Doctor Found");
    }

    return res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching Doctors:", error);
    return res.status(500).send("Server error");
  }
};

const addDoctor = async (req, res) => {
  try {
    // Log the file and body data
    // console.log("File:", req.file);
    // console.log("Body:", req.body);

    let avatar = null;
    if (req.file) {
      const filePath = req.file.path;
      avatar = {
        data: fs.readFileSync(filePath),
        contentType: req.file.mimetype,
      };
    } else {
      console.log("image file not found");
      return false;
    }

    const newDoctor = new Doctor({
      ...req.body,
      avatar: avatar,
    });

    await newDoctor.save();
    return res.status(200).json(newDoctor);
  } catch (error) {
    console.error("Error while adding a doctor:", error);
    res.status(500).json({ error: "Failed to add a doctor" });
  }
};

const deleteDoctor = async (req, res) => {
  console.log("doctor deleted");
};
module.exports = { addDoctor, getAllDoctors, deleteDoctor };

const Departments = require("../models/Departments");

const getAllDepartments = async (req, res) => {
  try {
    const departments = await Departments.find().sort({ createdAt: -1 });

    if (!departments || departments.length === 0) {
      return res.status(404).send("No departments found");
    }

    return res.status(200).json(departments);
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

const addDepartment = async (req, res) => {
  try {
    const newDepartment = new Departments({
      ...req.body,
    });

    await newDepartment.save();
    return res.status(200).json(newDepartment);
  } catch (error) {
    res.status(500).json({ error: "Failed to add department" });
  }
};

const deleteDepartment = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedDepartment = await Departments.findOneAndDelete({ _id: id });
    if (!deletedDepartment) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete department" });
  }
};

const updateDepartment = async (req, res) => {
  const { id, name, description, head, contactEmail, phoneNumber, location, doctors } = req.body;

  try {
    const updatedDepartment = await Departments.findOneAndUpdate(
      { _id: id },
      { name, description, head, contactEmail, phoneNumber, location, doctors },
      { new: true }
    );

    if (!updatedDepartment) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update department" });
  }
};

module.exports = {
  getAllDepartments,
  addDepartment,
  deleteDepartment,
  updateDepartment,
};

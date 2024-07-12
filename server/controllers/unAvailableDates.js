const UnavailableDay = require("../models/UnavailableDay");

const getAllUnAvailableDates = async (req, res) => {
  try {
    const days = await UnavailableDay.find().sort({ createdAt: -1 });

    if (!days || days.length === 0) {
      return res.status(404).send("No Un-Available dates found");
    }

    return res.status(200).json(days);
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

const addUnAvailableDates = async (req, res) => {
  try {
    const newUnvDate = new UnavailableDay({
      ...req.body,
    });

    await newUnvDate.save();
    return res.status(200).json(newUnvDate);
  } catch (error) {
    res.status(500).json({ error: "Failed to add un-available date" });
  }
};

const deleteUnAvailableDate = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedDate = await UnavailableDay.findOneAndDelete({ _id: id });
    if (!deletedDate) {
      return res.status(404).json({ error: "Un-available date not found" });
    }
    res.status(200).json({ message: "Un-available date deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete un-available date" });
  }
};
const updateUnAvailableDate = async (req, res) => {
  const { id, date, description } = req.body;

  try {
    const updatedUnavailableDay = await UnavailableDay.findOneAndUpdate(
      { _id: id },
      { date, description },
      { new: true }
    );

    if (!updatedUnavailableDay) {
      return res.status(404).json({ error: "Unavailable date not found" });
    }

    res.status(200).json(updatedUnavailableDay);
  } catch (error) {
    console.error("Error updating unavailable date:", error);
    res.status(500).json({ error: "Failed to update unavailable date" });
  }
};

module.exports = {
  getAllUnAvailableDates,
  addUnAvailableDates,
  deleteUnAvailableDate,
  updateUnAvailableDate,
};

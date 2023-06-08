const VaccinationCentreModel = require("../models/VaccinationCenterSchema");

const addCentre = async (req, res) => {
  const data = {
    place: req.body.place,
    workingHours: req.body.workingHours,
    slotsAvailable: req.body.slotsAvailable,
  };
  // save new vaccination center to the database
  const centre = new VaccinationCentreModel(data);
  try {
    const output = await centre.save();
    res.send(output);
  } catch (error) {
    console.log(error);
    res.send("Error in adding centre to DB");
  }
};

const deleteCentre = async (req, res) => {
  // delete the vaccination center form the database
  try {
    await VaccinationCentreModel.deleteOne({
      _id: req.body.id,
    });
    res.send("Vaccination centre deleted successfully");
  } catch (error) {
    console.log(error);
    res.send("Error in deleteing centre to DB");
  }
};

const getDetails = async (req, res) => {
  // delete the vaccination center form the database
  try {
    const centers = await VaccinationCentreModel.find({});
    res.send(centers);
  } catch (error) {
    console.log(error);
    res.send("Error in getting centre from DB");
  }
};

module.exports = {
  addCentre,
  deleteCentre,
  getDetails,
};

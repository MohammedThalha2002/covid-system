const VaccinationCentreModel = require("../models/VaccinationCenterSchema");

const searchCentre = async (req, res) => {
  // search the vaccination center from the database
  try {
    const centers = await VaccinationCentreModel.find({});
    const value = centers.map((val) => {
      return {
        centreId: val._id,
        place: val.place,
        timingSlot: val.workingHours,
        slotsAvailable: val.slotsAvailable,
      };
    });
    res.send(value);
  } catch (error) {
    console.log(error);
    res.send("Error in getting centre from DB");
  }
};

const bookSlot = async (req, res) => {
  const data = {
    username: req.body.username,
    email: req.body.email,
  };
  // console.log(data);
  // add user to the slots
  try {
    const checkingCentre = await VaccinationCentreModel.findById({
      _id: req.body.centreId,
    });
    // console.log(checkingCentre.dosageDetails.length);
    // decrease the slot availability by one
    // and book the slot for the user by adding to the dosage details array
    if (
      (checkingCentre.dosageDetails.length < 10) &
      (checkingCentre.slotsAvailable != 0)
    ) {
      const centers = await VaccinationCentreModel.findOneAndUpdate(
        {
          _id: req.body.centreId,
        },
        {
          $addToSet: { dosageDetails: data },
        }
      ).then(async (res) => {
        console.log(res);
        let lengthVal;
        if (res.dosageDetails.length != 0) {
          lengthVal = res.dosageDetails.length + 1;
        } else {
          lengthVal = 1;
        }
        await VaccinationCentreModel.findOneAndUpdate(
          {
            _id: req.body.centreId,
          },
          {
            $set: {
              slotsAvailable: 10 - lengthVal,
            },
          }
        );
      });

      res.send(centers);
    } else {
      res.status(400).send("Slots were full");
    }
  } catch (error) {
    console.log(error);
    res.send("Error in adding centre to DB");
  }
};

module.exports = {
  searchCentre,
  bookSlot,
};

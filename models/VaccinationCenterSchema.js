const mongoose = require("mongoose");

const vaccinationCentreSchema = mongoose.Schema(
  {
    place: {
      type: String,
      require: true,
    },
    workingHours: {
      type: String,
      require: true,
    },
    slotsAvailable: {
      type: Number,
      require: true,
    },
    dosageDetails: {
      type: Array,
    },
  },
  {
    timeStramps: true,
  }
);

const VaccinationCentres = mongoose.model("centers", vaccinationCentreSchema);

module.exports = VaccinationCentres;

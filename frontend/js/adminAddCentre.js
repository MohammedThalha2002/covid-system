const addCentreForm = document.getElementById("addCentreForm");
const place = document.getElementById("place");
const workingHours = document.getElementById("workingHours");
const AMPM = document.getElementById("AMPM");
const slotsAvailable = document.getElementById("slotsAvailable");

addCentreForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    (place.value != "") &
    (workingHours.value != "") &
    (AMPM.value != "") &
    (slotsAvailable.value != "")
  ) {
    postData(place.value, workingHours.value, AMPM.value, slotsAvailable.value);
  } else {
    alert("Fill all the details");
  }
});

async function postData(place, workingHours, AMPM, slotsAvailable) {
  const data = {
    place: place,
    workingHours: workingHours + AMPM,
    slotsAvailable: slotsAvailable,
    key: "adminsecretkey",
  };
  console.log(data);
  axios
    .post("http://localhost:3000/admin/add-centre", data)
    .then((res) => {
      console.log(res.data);
      alert("Vaccination Added successfully");
    })
    // .then(() => (window.location = "/admin-centre-details"))
    .catch((err) => {
      console.log(err);
      alert(err.response.data.errors);
    });
}

function seeCentreDetails(){
    window.location = "/admin-centre-details";
}
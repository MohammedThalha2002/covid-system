const centreDetails = document.getElementById("centreDetails");

async function getData() {
  axios
    .post(
      "https://covid-vaccination-booking-system-ur4e.onrender.com/admin/get-details",
      { key: "adminsecretkey" }
    )
    .then((res) => {
      console.log(res.data);
      showRecords(res.data);
    })
    .catch((err) => console.log(err));
}

getData();

function showRecords(data) {
  data.forEach((val, index) => {
    centreDetails.innerHTML += `
        <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">${
                    index + 1
                  }</td>
                  <td class="whitespace-nowrap px-6 py-4">${val.place}</td>
                  <td class="whitespace-nowrap px-6 py-4">${
                    val.workingHours
                  }</td>
                  <td class="whitespace-nowrap px-6 py-4">${
                    val.slotsAvailable
                  }</td>
                  <td class="users whitespace-nowrap px-6 py-4"></td>
                  <td class="whitespace-nowrap px-4 py-4">
                    <button class="delete-btn bg-red-500 px-10 py-3 rounded-lg text-white">
                      DELETE SLOT
                    </button>
                  </td>
                </tr>`;
  });
  const slotbtns = document.querySelectorAll(".delete-btn");
  slotbtns.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      deleteCentre(data[index]._id);
    });
  });
  const users = document.querySelectorAll(".users");
  users.forEach((user, index) => {
    data[index].dosageDetails.forEach((val) => {
      user.innerHTML += `
          <div class="px-3 py-1 my-1 border-2 border-black rounded">
            <h3>Name :  ${val.username}</h3>
            <h3>Email :  ${val.email}</h3>
          </div>
          `;
    });
  });
}

function deleteCentre(centreId) {
  const data = {
    id: centreId,
    key: "adminsecretkey",
  };
  console.log(data);
  axios
    .post(
      "https://covid-vaccination-booking-system-ur4e.onrender.com/admin/delete-centre",
      data
    )
    .then((res) => {
      console.log(res.data);
      alert("Vaccination Centre Deleted successfully");
    })
    .then((res) => window.location.reload())
    .catch((err) => {
      console.log(err);
      alert(err.response.data.errors);
    });
}

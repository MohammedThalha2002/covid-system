const slots = document.getElementById("bookslot-parent");

async function getData() {
  axios
    .get("http://localhost:3000/search")
    .then((res) => {
      console.log(res.data);

      showRecords(res.data);
    })
    .catch((err) => console.log(err));
}

getData();

function showRecords(data) {
  data.forEach((val, index) => {
    slots.innerHTML += `
        <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">${
                    index + 1
                  }</td>
                  <td class="whitespace-nowrap px-6 py-4">${val.place}</td>
                  <td class="whitespace-nowrap px-6 py-4">${val.timingSlot}</td>
                  <td class="whitespace-nowrap px-6 py-4">${
                    val.slotsAvailable
                  }</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <button class="bookslot-btn bg-red-500 px-10 py-3 rounded-lg text-white">
                      BOOK SLOT
                    </button>
                  </td>
                </tr>`;
  });
  const slotbtns = document.querySelectorAll(".bookslot-btn");
  slotbtns.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      bookSlot(data[index].centreId);
    });
  });
}

function bookSlot(centreId) {
  console.log(centreId);
  const data = {
    centreId: centreId,
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
  };
  console.log(data);
  axios
    .post("http://localhost:3000/book-slot", data)
    .then((res) => {
      console.log(res.data);
      alert("Slot booked successfully");
    })
    .then((res) => (window.location = "/bookSlot"))
    .catch((err) => {
      console.log(err);
      alert(err.response.data.errors);
    });
}

function Logout() {
  axios
    .post("http://localhost:3000/auth/logout")
    .then((res) => {
      console.log(res.data);
      alert("Logout successfully");
    })
    .then((res) => (window.location = "/"))
    .catch((err) => {
      console.log(err);
      alert(err.response.data.errors);
    });
}

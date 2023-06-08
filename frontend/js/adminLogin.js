const login = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");

login.addEventListener("submit", (e) => {
  e.preventDefault();

  if ((email.value != "") & (password.value != "")) {
    postData(email.value, password.value);
  } else {
    alert("Fill all the details");
  }
});

async function postData(email, password) {
  const data = {
    email: email,
    password: password,
    key: "adminsecretkey",
  };
  console.log(data);
  axios
    .post("https://covid-system.vercel.app/admin/login", data)
    .then((res) => {
      console.log(res.data);
      alert("Logged in successfully");
    })
    .then(() => (window.location = "/admin-add-centre"))
    .catch((err) => {
      console.log(err);
      alert(err.response.data.errors);
    });
}

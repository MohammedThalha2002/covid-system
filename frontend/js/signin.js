const signin = document.getElementById("signinForm");
const username = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");

signin.addEventListener("submit", (e) => {
  e.preventDefault();

  if ((email.value != "") & (password.value != "") & (username.value != "")) {
    postData(email.value, password.value, username.value);
  } else {
    alert("Fill all the details");
  }
});

async function postData(email, password, name) {
  const data = {
    name: name,
    email: email,
    password: password,
  };
  axios
    .post(
      "https://covid-vaccination-booking-system-ur4e.onrender.com/auth/signup",
      data
    )
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("email", email);
      localStorage.setItem("username", name);
      alert("Signed in successfully");
    })
    .then(() => (window.location = "/bookslot"))
    .catch((err) => {
      console.log(err);
      alert(err.response.data.errors);
    });
}

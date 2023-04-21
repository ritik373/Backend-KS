let from = document.getElementById("signUp").addEventListener("submit", SignUp);

async function SignUp(e) {
  e.preventDefault();
  let name = e.target.name.value;
  let email = e.target.email.value;
  let password = e.target.password.value;
  let obj = {
    name,
    email,
    password,
  };
  try {
    const res = await axios.post("http://localhost:4000/user/sign", obj);
    if (res.status === 200) {
      window.location.href = "../Login/login.html";
    }
    alert("User Signed Up");
    console.log(res);
  } catch (error) {
    alert("Failed");
    console.log("error:", error);
  }
}

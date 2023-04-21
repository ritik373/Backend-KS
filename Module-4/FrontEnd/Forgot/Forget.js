let form = document.getElementById("forget").addEventListener("submit", forget);

async function forget(e) {
  e.preventDefault();
  let email = e.target.email.value;
  let obj = {
    email,
  };
  try {
    let res = await axios.post(
      "http://localhost:4000/password/forgotpassword",
      obj
    );
    console.log(res);
  } catch (error) {
    console.log("error:", error);
  }
}

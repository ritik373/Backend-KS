let form = document.querySelector("form").addEventListener("submit", myfun);
async function myfun(e) {
  e.preventDefault();
  let inputName = document.querySelector("#name").value;
  let inputEmail = document.querySelector("#email").value;
  let inputNumber = document.querySelector("#number").value;

  let obj = {
    name: inputName,
    email: inputEmail,
    phoneNo: inputNumber,
  };

  if (inputName === "" || inputEmail === "" || inputNumber === "") {
    alert("Please Fill All credentials");
  } else {
    try {
      let res = await axios.post("http://localhost:4000/user/addUser", obj);
      console.log("res:", res);
      alert("User Created");
      location.reload();
    } catch (error) {
      console.log("error:", error);
    }
  }
}

async function getdata() {
  try {
    let res = await axios.get("http://localhost:4000/user/getUser");
    ShowData(res.data.allUsers);
  } catch (error) {
    console.log("error:", error);
  }
}

getdata();

function ShowData(data) {
  const container = document.getElementById("container");
  data.forEach((item) => {
    let div = document.createElement("div");
    div.dataset.id = `${item.id}`;
    let name = document.createElement("p");
    name.innerHTML = item.name;
    let email = document.createElement("p");
    email.innerHTML = item.email;
    let phoneNo = document.createElement("p");
    phoneNo.innerHTML = item.phoneNo;
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "delete";
    deleteButton.addEventListener("click", delet);
    div.append(name, email, phoneNo, deleteButton);
    container.append(div);
  });
}

async function delet(e) {
  if (e.target.classList.contains("delete")) {
    const deleteElem = e.target.parentElement;
    let id = deleteElem.dataset.id;
    try {
      let res = await axios.delete(
        `http://localhost:4000/user/deleteUser/${id}`
      );
      console.log(res);
      location.reload();
    } catch (error) {
      console.log("error:", error);
    }
  }
}

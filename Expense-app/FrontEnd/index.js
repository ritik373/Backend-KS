let expenseAmount = document.querySelector("#amount");
let description = document.querySelector("#description");
let category = document.querySelector("#category");

let form = document
  .querySelector("form")
  .addEventListener("submit", addExpenseFun);

async function addExpenseFun(e) {
  e.preventDefault();
  const obj = {
    amount: expenseAmount.value,
    description: description.value,
    category: category.value,
  };
  if (
    expenseAmount.value === "" ||
    description.value === "" ||
    category.value === ""
  ) {
    alert("Please Fill All Feilds");
  } else {
    try {
      let res = await axios.post("http://localhost:4000/user/addExp", obj);
      location.reload();
    } catch (error) {
      console.log("error:", error);
    }
    expenseAmount.value = "";
    description.value = "";
    category.value = "";
  }
}

async function getExpenses() {
  try {
    const res = await axios.get("http://localhost:4000/user/getExp");
    ShowData(res.data.userExpense);
  } catch (error) {
    console.log("error:", error);
  }
}

getExpenses();

function ShowData(data) {
  const expenselist = document.getElementById("expense-list");
  data.forEach((expense) => {
    let div = document.createElement("div");
    div.dataset.id = `${expense.id}`;
    let amount = document.createElement("p");
    amount.innerHTML = expense.amount;
    let description = document.createElement("p");
    description.innerHTML = expense.description;
    let category = document.createElement("p");
    category.innerHTML = expense.category;
    let button = document.createElement("button");
    button.innerHTML = "Delete";
    button.className = "delete";
    button.addEventListener("click", delet);
    let button2 = document.createElement("button");
    button2.innerHTML = "Edit";
    button2.className = "edit";
    button2.addEventListener("click", async () => {
      console.log(expense.amount, expense.description, expense.category);
      document.querySelector("#amount").value = expense.amount;
      document.querySelector("#description").value = expense.description;
      document.querySelector("#category").value = expense.category;
      try {
        let res = await axios.delete(
          `http://localhost:4000/user/deleteExp/${expense.id}`
        );
        console.log(res);
      } catch (error) {
        console.log("error:", error);
      }
    });
    div.append(amount, description, category, button, button2);
    expenselist.append(div);
  });
}

async function delet(e) {
  if (e.target.classList.contains("delete")) {
    const deleteElem = e.target.parentElement;
    let id = deleteElem.dataset.id;
    try {
      let res = await axios.delete(
        `http://localhost:4000/user/deleteExp/${id}`
      );
      location.reload();
    } catch (error) {
      console.log("error:", error);
    }
  }
}

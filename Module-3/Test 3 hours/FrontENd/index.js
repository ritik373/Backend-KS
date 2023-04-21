let form = document.getElementById("form").addEventListener("submit", myfunc);
async function myfunc(e) {
  e.preventDefault();
  const sellingPrice = e.target.price.value;
  const productName = e.target.name.value;
  const obj = {
    sellingPrice,
    productName,
  };
  try {
    let res = await axios.post("http://localhost:4000/user/product", obj);
    console.log(res);
    location.reload();
  } catch (error) {
    console.log("error:", error);
  }
}

async function getData() {
  try {
    const res = await axios.get("http://localhost:4000/user/product");

    console.log(res);
    showData(res.data.product);
  } catch (error) {
    console.log("error:", error);
  }
}

getData();

function showData(data) {
  let container = document.getElementById("container");
  let total = document.getElementById("total");
  const initialValue = 0;
  const sumWithInitial = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue.sellingPrice,
    initialValue
  );
  total.innerHTML = `Your Total amount is : <h1>${sumWithInitial} Rs </h1>`;
  data.forEach((items) => {
    let div = document.createElement("div");
    let price = document.createElement("p");
    price.innerHTML = items.sellingPrice;
    let name = document.createElement("p");
    name.innerHTML = items.productName;
    let btn = document.createElement("button");
    btn.innerHTML = "Delete";
    btn.addEventListener("click", async () => {
      try {
        let res = await axios.delete(
          `http://localhost:4000/user/product/${items.id}`
        );
        location.reload();
      } catch (error) {
        console.log("error:", error);
      }
    });
    div.append(price, name, btn);
    container.append(div);
  });
}

import { io } from "socket.io-client";

const message = document.getElementById("message");
const form = document.querySelector("form").addEventListener("submit", myfun);
let container = document.getElementById("container");

const socket = io("http//localhost:3000");
socket.on();

function myfun(e) {
  e.preventDefault();
  let value = message.value;
  let div = document.createElement("div");
  div.append(value);
  container.append(div);
  message.value = "";
}

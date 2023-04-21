import express from "express";
import { Todo } from "../Models/Todos";
const router = express.Router();

let todos: Todo[] = [];

router.get("/", (req, res, next) => {
  return res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: req.body.text,
  };
  todos.push(newTodo);
  return res.status(200).json({ todos: todos });
});

router.put("/todo/:todoId", (req, res, next) => {
  const id = req.params.todoId;
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
    return res.status(200).json({ todos: todos });
  }
  res.status(404).json("Done");
});

router.delete("/todo/:todoId", (req, res, next) => {
  todos = todos.filter((todo) => todo.id !== req.params.todoId);
  res.status(200).json("DONE");
});

export default router;

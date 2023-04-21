import express from "express";
import todoRoutes from "./Routes/Todos";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.listen(3000);

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const adminRouter = require("./Routes/admin");
const shopRouter = require("./Routes/shop");
const contactRouter = require("./Routes/contact");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(adminRouter);
app.use(shopRouter);
app.use(contactRouter);

app.listen(4000);

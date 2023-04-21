const products = [];
const path = require("path");
const fs = require("fs");
module.exports = class Product {
  constructor(t) {
    this.title = t;
  }
  save() {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );
    fs.readFile(p, (err, filecontent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(filecontent);
      }
      products.push(this);
      fs.write(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }
  static fetchAll(cb) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );
    fs.readFile(p, (err, filecontent) => {
      if (err) {
        cb([]);
      }
      cb(JSON.parse(filecontent));
    });
  }
};

const fs = require("fs");

const Requeshandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    fs.readFile("meaasage.text", { encoding: "utf-8" }, (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(data);
      res.write("<html>");
      res.write(`<body>${data}</body>`);
      res.write(
        '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
      );
      res.write("</html>");
      return res.end();
    });
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFileSync("meaasage.text", message);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
  if (url === "/home") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body><h1>Welcome home</h1></body>");
    res.write("</html>");
    res.end();
  }
  if (url === "/about") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body><h1>Welcome to About Us page</h1></body>");
    res.write("</html>");
    res.end();
  }
  if (url === "/node") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body><h1>Welcome to my Node js Project</h1></body>");
    res.write("</html>");
    res.end();
  }
};

module.exports = Requeshandler;

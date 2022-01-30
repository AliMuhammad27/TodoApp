const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;

    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;

    //for redirecting about-me
    // case "/about-me":
    //   res.statusCode = 301;
    //   res.setHeader('Location','/about')
    //   res.end()
    //   break;

    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }
  res.setHeader("Content-Type", "text/html");
  fs.readFile(path, (err, data) => {
    if (err) {
      res.write(err);
      res.end();
    } else {
      res.end(data);
    }
  });
});
server.listen(3000, "localhost", () => {
  console.log("server is running on port 3000");
});

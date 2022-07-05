const fs = require("fs");
const http = require("http");

const errorHtml = fs.readFileSync("assets/html/error.html");

const sendFileOrError = (path, response) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      response.end(errorHtml);
      return;
    }
    response.end(data);
  });
};

const server = http.createServer((request, response) => {
  console.log("new request:", request.method, request.url);
  if (request.url === "/") {
    sendFileOrError("index.html", response);
  } else {
    sendFileOrError("assets" + request.url, response);
  }
});

const PORT = 9000;
server.listen(PORT, () => console.log("Server is listening to port", PORT));

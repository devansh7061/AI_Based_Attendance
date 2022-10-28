const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const http = require("http");
var cors = require("cors");

const loginRouter = require("./routes/login");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});
app.get("/hello", function (req, res) {
  res.send("Hello");
});
app.use("/", loginRouter);
const PORT = process.env.PORT || 5000;
app.set("PORT", PORT);
const server = http.createServer(app);
server.listen(PORT);
server.on("listening", () => {
  console.log("Listening on " + PORT);
});

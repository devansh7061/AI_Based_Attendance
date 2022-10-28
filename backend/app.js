import express from "express";
import path from "path";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import loginRouter from "./routes/login.js";
import adminRouter from "./routes/admin.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
app.use("/admin", adminRouter);
const PORT = process.env.PORT || 5000;
app.set("PORT", PORT);
const server = http.createServer(app);
server.listen(PORT);
server.on("listening", () => {
  console.log("Listening on " + PORT);
});

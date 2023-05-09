import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { authenticate } from "./modules/auth";
import { createUser, signIn } from "./handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "hello world" });
});

app.use("/api", authenticate, router);
app.post("/user", createUser);
app.post("/signin", signIn);
app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status("401");
    res.json({ message: "unauthorised" });
  } else if (err.type === "input") {
    res.status(400);
    res.json({ message: "invalid input" });
  } else {
    res.status(500);
    res.json({ message: "ooops... that's on us" });
  }
});

export default app;

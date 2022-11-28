import express, { Application } from "express";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import logger from "morgan";

const app: Application = express();

if (app.get("env") === "development") {
  dotenv.config();
}
app.use(logger("dev"));
import config from "./config";
import "./config/db";

import authRoutes from "./components/auth/routes";
import passportMiddleware from "./middlewares/passport";
import loggedIn from "./middlewares/loggedIn";

//Config
app.use(
  cors({
    methods: ["GET", "POST", "PUT"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: config.jwt.secret,
    saveUninitialized: true,
    resave: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(passportMiddleware);

//Routes

app.use("/auth", authRoutes);

const port = config.api.PORT;
app.listen(port, () => {
  console.log("Server listening in PORT", port);
});

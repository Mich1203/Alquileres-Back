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
import placesRoutes from "./components/places/routes";
import accountRoutes from "./components/accounts/routes";
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
passport.use(passportMiddleware);

//Routes

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/places", loggedIn, placesRoutes);
router.use("/accounts", loggedIn, accountRoutes);

app.use("/api", router);

const port = config.api.PORT;
app.listen(port, () => {
  console.log("Server listening in PORT", port);
});

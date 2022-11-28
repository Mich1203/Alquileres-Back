import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import config from "../config";
import { IUser } from "../interfaces/user";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret,
};

export default new JwtStrategy(opts, function (jwtPayload, done) {
  if (jwtPayload) {
    return done(null, jwtPayload);
  } else {
    return done(null, false);
  }
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // User.findById(
  //   id,
  //   "_id name email username phoneNumber profileImg",
  //   (err: any, user: IUser) => {
  //     done(err, user);
  //   },
  // );
});

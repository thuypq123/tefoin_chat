const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { ExtractJwt } = require("passport-jwt");
const { JWT_SECRET, auth } = require("../config/jwt");
const User = require("../models/register");
const bcrypt = require("bcryptjs");
require('dotenv').config();
const GooglePlusTokenStratery = require("passport-google-plus-token");

//  TOKEN => DATA
passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
      secretOrKey: "AuthenticationJWT",
    },
    async function (payload, done) {
      try {
        const user = await User.findById(payload.sub);
        if (!user) return done(null, false);

        console.log("payload ", payload);
        console.log(user);
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

//PASSPORT GOOGLE
passport.use(
  new GooglePlusTokenStratery(
    {
      clientID: auth.CLIENT_ID,
      clientSerect: auth.CLIENT_SECRECT,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log("accessToken", accessToken);
        // console.log("refreshToken", refreshToken);
        // console.log("profile", profile);
        // console.log("Hello");

        // CHECK USER EXISTS
        const user = await User.findOne({
          authGoogleID: profile.id,
          authType: "google",
        });

        if (user) return done(null, user);

        const newUser = new User({
          email: profile.emails[0].value,
          authGoogleID: profile.id,
          authType: "google",
        });

        await newUser.save();
        console.log("newUser Goodle :", newUser);

        done(null, newUser);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

// CHECK ACCOUNT
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) return done(null, false, { message: "Incorrect email" });

        const isCorrectPassword = await user.isValidPassword(password);

        if (!isCorrectPassword) return done(null, false);

        done(null, user);
        console.log(user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

// module.exports = {
//   local,
//   jwt,
// };

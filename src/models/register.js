const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Register = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  authGoogleID: {
    type: String,
    default: null,
  },
  authType: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
  // isVerify: {
  //   type: Boolean,
  //   default: false,
  // },
  // isPaid: {
  //   type: Boolean,
  //   default: false,
  // },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

Register.pre("save", async function (next) {
  try {
    if (this.authType !== "local") next();
    console.log("password", this.password);
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(this.password, salt);
    console.log(passwordHashed);
    this.password = passwordHashed;
    next();
  } catch (err) {
    next(err);
  }
});

Register.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

const signUp = mongoose.model("register", Register);
module.exports = signUp;

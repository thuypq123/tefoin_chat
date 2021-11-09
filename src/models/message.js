const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const texts = new Schema({
  id: ObjectId,
  text: String,
  email: String,
  conversationId:String,
  createdAt: Number,
})
module.exports = mongoose.model("message", texts)

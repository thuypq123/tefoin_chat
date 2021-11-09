const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const conversationUser = new Schema({
  id: String,
  conversationId: String,
  userId: String,
  createdAt: Number,
})
module.exports = mongoose.model("conversationUser", conversationUser)

const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const conversation = new Schema({
  id: ObjectId,
  name: String,
  status: String,
  createdAt: Number,
  isGruop: Boolean,
})
module.exports = mongoose.model("conversation", conversation)

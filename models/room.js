import mongoose from "mongoose"

let Types = mongoose.Schema.Types

let roomSchema = new mongoose.Schema({
  hoster: String,
  records: [{
    recordId: String,
    openid: String,
  }]
})

export default mongoose.model("Room", roomSchema)

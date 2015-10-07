import mongoose from "mongoose"

let Types = mongoose.Schema.Types

let roomSchema = new mongoose.Schema({
  hoster: String,
  records: [{
    recordId: String,
    user: {
      subscribe: Number,
      openid: String,
      nickname: String,
      sex: Number,
      language: String,
      city: String,
      province: String,
      country: String,
      headimgurl: String,
      subscribe_time: Date,
      unionid: String,
      remark: String,
      groupid: String
    }
  }]
})

export default mongoose.model("Room", roomSchema)

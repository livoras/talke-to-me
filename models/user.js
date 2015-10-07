import mongoose from "mongoose"

let userSchema = mongoose.Schema({
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
})

export default mongoose.model("User", userSchema)

import mongoose from "mongoose"
import Room from "./room"
import User from "./user"

mongoose.connect('mongodb://localhost/talk-to-me')

User.create({openid: "fuck"}, function(err, result) {
  console.log(err, result)
})

export default {}


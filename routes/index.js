var express = require('express');
var router = express.Router();
import request from "superagent"
import config from "../public/src/scripts/common/config"
import common from "../common"
import accessToken from "../access-token"
import User from "../models/user"
import Room from "../models/room"

/* GET home page. */
router.get('/index.html', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  let title = "没睡的唱歌给我听～"
  let TOKEN_URL = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.APPID}&secret=${config.AppSecret}&code=${req.query.code}&grant_type=authorization_code`
  request
    .get(TOKEN_URL)
    .end(function(err, resp) {
      let data = JSON.parse(resp.text)
      let infoUrl = getInfoURL(data)
      request
        .get(infoUrl)
        .end(function(err, resp) {
          let data = JSON.parse(resp.text)
          let url = `http://${req.headers.host}${req.originalUrl}`
          let signatureInfo = accessToken.signature(url)
          console.log("OK")
          createUserIfNotExist(data)
          getRoomInfoOrCreate({openid: req.query.state}, function(room) {
            console.log(room)
            res.render('index', {
              room,
              title, 
              data, 
              common, 
              signatureInfo
            })
          })
        })
    })
});

router.put("/users/:id/records", function(req, res) {
  let data = req.body // {recordId, openid}
  let hoster = req.params.id
  Room.update({hoster}, {$pushAll: {records: [data]}}, {upsert: true}, function(err) {
    if (err) {
      return res.json({
        result: "fail",
        msg: err
      })
    } else {
      return res.json({
        result: "success",
        msg: "Update successfully!"
      })
    }
  })
})

function createUserIfNotExist(data) {
  var query = User.findOne({openid: data.openid})
  query.exec(function(err, result) {
    if (err) {
      return console.log(err)
    }
    if (!result) {
      let user = User(data)
      user.save(function(err, res) {
        console.log("save user", user)
      })
    }
  })
}

function getRoomInfoOrCreate(data, cb) {
  console.log(1, "walking...", data)
  Room.findOne({hoster: data.openid}, function(err, result) {
    console.log(2, "walking...", result)
    if (err) return cb(err)
    if (result) return cb(result.toJSON())
    console.log("walking...", result)
    let room = new Room({hoster: data.openid, records: []})
    room.save(function(err, result) {
      if (err) return cb(err)
      cb(room.toJSON())
    })
  })
}

function getInfoURL(data) {
  return `https://api.weixin.qq.com/sns/userinfo?access_token=${data.access_token}&openid=${data.openid}&lang=zh_CN`
}

module.exports = router;

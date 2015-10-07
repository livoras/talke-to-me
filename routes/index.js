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
          createUserIfNotExist(data) // 当用户登陆，创建用户
          getRoomInfoOrCreate({openid: req.query.state}, function(room) {
            User.findOne({openid: room.hoster}, function(err, hoster) {
              if (err) res.status(500).send("Server error")
              if (hoster) {
                room.hoster = hoster.toJSON()
              } else {
                room.hoster = {openid: room.hoster}
              }
              res.render('index', {
                room, title, data, common, signatureInfo
              })
            })
          })
        })
    })
});

router.put("/users/:openid/records", function(req, res) {
  let data = JSON.parse(req.body.data) // {recordId, openid}
  let hoster = req.params.openid
  console.log(data)
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
  if (!data.openid) return
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
  Room.findOne({hoster: data.openid}, function(err, result) {
    if (err) return cb(err)
    if (result) return cb(result.toJSON())
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

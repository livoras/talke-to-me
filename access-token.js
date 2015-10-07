import common from "./common"
import request from "superagent"
import config from "./public/src/scripts/common/config"
import crypto from 'crypto'


function init() {
  refresh()
  setInterval(refresh, 1.5 * 60 * 60 * 1000)
}

function refresh() {
  let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.APPID}&secret=${config.AppSecret}`
  request
    .get(url)
    .end(function(err, res) {
      let data = JSON.parse(res.text)
      common.access_token = data.access_token
      refreshJsAPITicket()
    })
}

function refreshJsAPITicket() {
  let url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${common.access_token}&type=jsapi`
  request
    .get(url)
    .end(function(err, res) {
      let data = JSON.parse(res.text)
      common.jsapi_ticket = data.ticket
      console.log("Refresh done: ", common)
    })
}

function signature(url) {
  // 微信签名算法
  let shasum = crypto.createHash('sha1');
  let noncestr = "athisisanocdalekk143k43kljlkadjlk15"
  let timestamp = "" + (+new Date)
  let jsapi_ticket = common.jsapi_ticket;
  let data = [
    {key: "noncestr", value: noncestr},
    {key: "timestamp", value: timestamp}, 
    {key: "jsapi_ticket", value: jsapi_ticket}, 
    {key: "url", value: url}, 
  ]
  data.sort(function(a, b) {
    return a.key.localeCompare(b.key)
  })
  let str = ""
  data.forEach(function(item, i) {
    let prefix = ""
    if (i !== 0) prefix = "&"
    str += `${prefix}${item.key}=${item.value}`
  })
  console.log("==========", str)
  shasum.update(str)
  return {
    signature: shasum.digest("hex"),
    info: {noncestr, timestamp}
  }
}

export default {init, signature}

import config from "./common/config"
import wxUtil from "./modules/wx"
$ = Zepto

let url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3c55ef76b263acbe&redirect_uri=http://talk.gsjyhn.cn/&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"

wx.config({
  //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: config.APPID, // 必填，公众号的唯一标识
  timestamp: signatureInfo.info.timestamp,
  nonceStr: signatureInfo.info.noncestr,
  signature: signatureInfo.signature,
  jsApiList: [
    "onMenuShareTimeline",
    "onMenuShareAppMessage",
    "onMenuShareQQ",
    "onMenuShareWeibo",
    "onMenuShareQZone",
    "startRecord",
    "stopRecord",
    "onVoiceRecordEnd",
    "playVoice",
    "pauseVoice",
    "stopVoice",
    "onVoicePlayEnd",
    "uploadVoice",
    "downloadVoice",
    "chooseImage",
    "previewImage",
    "uploadImage",
    "downloadImage",
    "translateVoice",
    "getNetworkType",
    "openLocation",
    "getLocation",
    "hideOptionMenu",
    "showOptionMenu",
    "hideMenuItems",
    "showMenuItems",
    "hideAllNonBaseMenuItem",
    "showAllNonBaseMenuItem",
    "closeWindow",
    "scanQRCode",
    "chooseWXPay",
    "openProductSpecificView",
    "addCard",
    "chooseCard",
    "openCard"
  ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});

wx.ready(init)

function init() {
  log(JSON.stringify(data) + "<br>" + JSON.stringify(common))
  initShare()
  initRecord()
}

function initShare() {
  wxUtil.share(title, url, data.headimgurl, "傻逼才会分享", function() {
    alert("OK")
  }, function() {
    alert("FAIL")
  })
}

var isRecording = false

function initRecord() {
  listenRecord()
}

function listenRecord() {
  $("#record").on("click", function(event) {
    if (isRecording) {
      $(this).text("开始录音")
      stopRecord()
    } else {
      $(this).text("停止录音")
      startRecord()
    }
  })
}

function stopRecord() {
  isRecording = false
  wx.stopRecord({
    success: function(res) {
      var localId = res.localId
      wx.playVoice({localId})
    }
  })
}

function startRecord() {
  wx.startRecord();
  isRecording = true
}

function log(msg) {
  //$("#code").html(msg)
}



import config from "./common/config"
import wxUtil from "./modules/wx"
import FastClick from 'fastclick'

$ = Zepto

let url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3c55ef76b263acbe&redirect_uri=http://talk.gsjyhn.cn/&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"

let me = data
let hoster = room.hoster
let myUrl = url.replace("STATE", me.openid)
let hosterUrl = url.replace("STATE", room.hoster.openid)
let isHoster = (me.openid === hoster.openid)
let curentRecordId = null
let $currentRecord
let recordIndex = 0

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
  initHoster()
  initShare()
  initRecord()
  initMyLink()
  FastClick(document.body)
  listenRecords()
}

function listenRecords() {
  $("div.record").each(function(i, item) {
    listenTapRecord($(item))
  })

  wx.onVoicePlayEnd({
    success: function (res) {
      $("div.playing").removeClass("playing")
      curentRecordId = null
    }
  });
}

function getRecordDOM(record) {
  recordIndex++
  let {user, localId, recordId} = record
  let $record = $(`<div class="record" data-serverId="${recordId}">语音- ${recordIndex}</div>`)
  if (localId) $record.attr("data-localId", localId)
  let $avatar = $("<img class='small-avatar'/>")
  $avatar.attr("src", user.headimgurl)
  $record.prepend($avatar)
  return $record
}

function listenTapRecord($record) {
  $record.find("img.bubble").on("click", function() {
    let serverId = $record.attr("data-serverId")
    let localId = $record.attr("data-localId")
    let oldId = curentRecordId
    stop()
    if (oldId && oldId === localId) return; // 点击正在播放的， 则停止
    if (localId) return play(localId, $record)
    wx.downloadVoice({
      serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: function (res) {
        var localId = res.localId; // 返回音频的本地ID
        $record.attr("data-localId", localId)
        $record.attr("id", localId)
        play(localId, $record)
      }
    });
  })
}

function stop() {
  $("div.playing").removeClass("playing")
  if (curentRecordId) wx.stopVoice({localId: curentRecordId })
  curentRecordId = null
}

function play(localId, $record) {
  curentRecordId = localId
  if ($currentRecord) $currentRecord.removeClass("playing")
  $currentRecord = $record
  $currentRecord.addClass("playing")
  return wx.playVoice({localId})
}

function initHoster() {
  let text = isHoster
    ? "你是主人"
    : "你是客人";
  $("#ishoster").html(text)
}

function initShare() {
  let sex = (hoster.sex === 1)
    ? "他"
    : "她"
  let desc = `${hoster.nickname} 睡不着，想听歌。你可以唱给${sex}听吗？`
  wxUtil.share(title, hosterUrl, hoster.headimgurl, desc, function() {
    //
  }, function() {
    //
  })
}

var isRecording = false

function initRecord() {
  listenRecord()
}

function initMyLink() {
  if (isHoster) {
    var share = document.querySelector("a.share");
    var back = document.querySelector("div.back");
    share.addEventListener("click", function() {
      document.querySelector("div.share").style.display = "block";
    });
    back.addEventListener("click", function() {
      document.querySelector("div.share").style.display = "none";
    })
  } else {
    $("#my").attr("href", url.replace("STATE", me.openid))
  }
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
  wx.onVoiceRecordEnd({
    complete: function (res) {
      var localId = res.localId; // 返回音频的本地ID
      uploadVoice(localId, function(serverId) {
        appendNewRecord(localId, serverId)
      })
    }
  });
}

function stopRecord() {
  isRecording = false
  wx.stopRecord({
    success: function(res) {
      var localId = res.localId
      uploadVoice(localId, function(serverId) {
        appendNewRecord(localId, serverId)
      })
    }
  })
}

function appendNewRecord(localId, serverId) {
  if (room.records.length === 0) $("div.no-data").remove()
  let $record = $(`<div class="record" id="${localId}" data-serverId="${serverId}" data-localId="${localId}"></div>`)
  let $avatar = $(`<img class="avatar small" src="${me.headimgurl}">`)
  let $bubble = $(`<img class="bubble" src="/assets/bubble1.png">`)
  $record.append($avatar)
  $record.append($bubble)
  listenTapRecord($record)
  $("#records").prepend($record)
}

function uploadVoice(localId, cb) {
  wx.uploadVoice({
    localId,// 需要上传的音频的本地ID，由stopRecord接口获得
    isShowProgressTips: 1, // 默认为1，显示进度提示
    success: function (res) {
      var serverId = res.serverId; // 返回音频的服务器端ID
      $.ajax({
        url: `/users/${hoster.openid}/records`,
        type: "PUT",
        data: {
          data: JSON.stringify({
            user: data, recordId: serverId
          })
        },
        success: function(data) {
          cb && cb(serverId)
        }
      })
    }
  });
}

function startRecord() {
  wx.startRecord();
  isRecording = true
}

function log(msg) {
  $("#code").html(msg)
}

window.addEventListener("touchmove", function(event) {
  //event.preventDefault();
})


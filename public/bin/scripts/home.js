(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
  APPID: "wx3c55ef76b263acbe",
  AppSecret: "81e14ba3933877a460db173065a82d83"
};
module.exports = exports["default"];

},{}],2:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _commonConfig = require("./common/config");

var _commonConfig2 = _interopRequireDefault(_commonConfig);

var _modulesWx = require("./modules/wx");

var _modulesWx2 = _interopRequireDefault(_modulesWx);

$ = Zepto;

var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3c55ef76b263acbe&redirect_uri=http://talk.gsjyhn.cn/&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";

wx.config({
  //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: _commonConfig2["default"].APPID, // 必填，公众号的唯一标识
  timestamp: signatureInfo.info.timestamp,
  nonceStr: signatureInfo.info.noncestr,
  signature: signatureInfo.signature,
  jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage", "translateVoice", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard", "chooseCard", "openCard"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});

wx.ready(init);

function init() {
  log(JSON.stringify(data) + "<br>" + JSON.stringify(common));
  initShare();
  initRecord();
}

function initShare() {
  _modulesWx2["default"].share(title, url, data.headimgurl, "傻逼才会分享", function () {
    alert("OK");
  }, function () {
    alert("FAIL");
  });
}

var isRecording = false;

function initRecord() {
  listenRecord();
}

function listenRecord() {
  $("#record").on("click", function (event) {
    if (isRecording) {
      $(this).text("开始录音");
      stopRecord();
    } else {
      $(this).text("停止录音");
      startRecord();
    }
  });
}

function stopRecord() {
  isRecording = false;
  wx.stopRecord({
    success: function success(res) {
      var localId = res.localId;
      wx.playVoice({ localId: localId });
    }
  });
}

function startRecord() {
  wx.startRecord();
  isRecording = true;
}

function log(msg) {
  //$("#code").html(msg)
}

},{"./common/config":1,"./modules/wx":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function share(title, link, imgUrl, desc, ok, fail) {
  console.log(desc, title, link, imgUrl);
  wx.onMenuShareTimeline({
    title: title,
    link: link,
    desc: desc,
    imgUrl: imgUrl,
    success: function success() {
      ok && ok();
    },
    cancel: function cancel() {
      fail && fail();
    }
  });

  wx.onMenuShareAppMessage({
    title: title,
    link: link,
    imgUrl: imgUrl,
    desc: desc,
    success: function success() {
      ok && ok();
    },
    cancel: function cancel() {
      fail && fail();
    }
  });

  wx.onMenuShareQQ({
    title: title,
    link: link,
    desc: desc,
    imgUrl: imgUrl,
    success: function success() {
      ok && ok();
    },
    cancel: function cancel() {
      fail && fail();
    }
  });

  wx.onMenuShareWeibo({
    title: title,
    link: link,
    desc: desc,
    imgUrl: imgUrl,
    success: function success() {
      ok && ok();
    },
    cancel: function cancel() {
      fail && fail();
    }
  });

  wx.onMenuShareQZone({
    title: title,
    link: link,
    desc: desc,
    imgUrl: imgUrl,
    success: function success() {
      ok && ok();
    },
    cancel: function cancel() {
      fail && fail();
    }
  });
}

exports["default"] = { share: share };
module.exports = exports["default"];

},{}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9yb290L2dpdC90YWxrLXRvLW1lL3B1YmxpYy9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvcm9vdC9naXQvdGFsay10by1tZS9wdWJsaWMvc3JjL3NjcmlwdHMvY29tbW9uL2NvbmZpZy5qcyIsIi9yb290L2dpdC90YWxrLXRvLW1lL3B1YmxpYy9zcmMvc2NyaXB0cy9mYWtlX2MyZTljYTZlLmpzIiwiL3Jvb3QvZ2l0L3RhbGstdG8tbWUvcHVibGljL3NyYy9zY3JpcHRzL21vZHVsZXMvd3guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztxQkNBZTtBQUNiLE9BQUssRUFBRSxvQkFBb0I7QUFDM0IsV0FBUyxFQUFFLGtDQUFrQztDQUM5Qzs7Ozs7Ozs7NEJDSGtCLGlCQUFpQjs7Ozt5QkFDakIsY0FBYzs7OztBQUNqQyxDQUFDLEdBQUcsS0FBSyxDQUFBOztBQUVULElBQUksR0FBRyxHQUFHLHVMQUF1TCxDQUFBOztBQUVqTSxFQUFFLENBQUMsTUFBTSxDQUFDOztBQUVSLE9BQUssRUFBRSwwQkFBTyxLQUFLO0FBQ25CLFdBQVMsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVM7QUFDdkMsVUFBUSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUTtBQUNyQyxXQUFTLEVBQUUsYUFBYSxDQUFDLFNBQVM7QUFDbEMsV0FBUyxFQUFFLENBQ1QscUJBQXFCLEVBQ3JCLHVCQUF1QixFQUN2QixlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLGtCQUFrQixFQUNsQixhQUFhLEVBQ2IsWUFBWSxFQUNaLGtCQUFrQixFQUNsQixXQUFXLEVBQ1gsWUFBWSxFQUNaLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLGVBQWUsRUFDZixhQUFhLEVBQ2IsY0FBYyxFQUNkLGFBQWEsRUFDYixlQUFlLEVBQ2YsZ0JBQWdC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RUFBTCxLQUFLLEVBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQge1xuICBBUFBJRDogXCJ3eDNjNTVlZjc2YjI2M2FjYmVcIixcbiAgQXBwU2VjcmV0OiBcIjgxZTE0YmEzOTMzODc3YTQ2MGRiMTczMDY1YTgyZDgzXCJcbn1cbiIsImltcG9ydCBjb25maWcgZnJvbSBcIi4vY29tbW9uL2NvbmZpZ1wiXG5pbXBvcnQgd3hVdGlsIGZyb20gXCIuL21vZHVsZXMvd3hcIlxuJCA9IFplcHRvXG5cbmxldCB1cmwgPSBcImh0dHBzOi8vb3Blbi53ZWl4aW4ucXEuY29tL2Nvbm5lY3Qvb2F1dGgyL2F1dGhvcml6ZT9hcHBpZD13eDNjNTVlZjc2YjI2M2FjYmUmcmVkaXJlY3RfdXJpPWh0dHA6Ly90YWxrLmdzanlobi5jbi8mcmVzcG9uc2VfdHlwZT1jb2RlJnNjb3BlPXNuc2FwaV91c2VyaW5mbyZzdGF0ZT1TVEFURSN3ZWNoYXRfcmVkaXJlY3RcIlxuXG53eC5jb25maWcoe1xuICAvL2RlYnVnOiB0cnVlLCAvLyDlvIDlkK/osIPor5XmqKHlvI8s6LCD55So55qE5omA5pyJYXBp55qE6L+U5Zue5YC85Lya5Zyo5a6i5oi356uvYWxlcnTlh7rmnaXvvIzoi6XopoHmn6XnnIvkvKDlhaXnmoTlj4LmlbDvvIzlj6/ku6XlnKhwY+err+aJk+W8gO+8jOWPguaVsOS/oeaBr+S8mumAmui/h2xvZ+aJk+WHuu+8jOS7heWcqHBj56uv5pe25omN5Lya5omT5Y2w44CCXG4gIGFwcElkOiBjb25maWcuQVBQSUQsIC8vIOW/heWhq++8jOWFrOS8l+WPt+eahOWUr+S4gOagh+ivhlxuICB0aW1lc3RhbXA6IHNpZ25hdHVyZUluZm8uaW5mby50aW1lc3RhbXAsXG4gIG5vbmNlU3RyOiBzaWduYXR1cmVJbmZvLmluZm8ubm9uY2VzdHIsXG4gIHNpZ25hdHVyZTogc2lnbmF0dXJlSW5mby5zaWduYXR1cmUsXG4gIGpzQXBpTGlzdDogW1xuICAgIFwib25NZW51U2hhcmVUaW1lbGluZVwiLFxuICAgIFwib25NZW51U2hhcmVBcHBNZXNzYWdlXCIsXG4gICAgXCJvbk1lbnVTaGFyZVFRXCIsXG4gICAgXCJvbk1lbnVTaGFyZVdlaWJvXCIsXG4gICAgXCJvbk1lbnVTaGFyZVFab25lXCIsXG4gICAgXCJzdGFydFJlY29yZFwiLFxuICAgIFwic3RvcFJlY29yZFwiLFxuICAgIFwib25Wb2ljZVJlY29yZEVuZFwiLFxuICAgIFwicGxheVZvaWNlXCIsXG4gICAgXCJwYXVzZVZvaWNlXCIsXG4gICAgXCJzdG9wVm9pY2VcIixcbiAgICBcIm9uVm9pY2VQbGF5RW5kXCIsXG4gICAgXCJ1cGxvYWRWb2ljZVwiLFxuICAgIFwiZG93bmxvYWRWb2ljZVwiLFxuICAgIFwiY2hvb3NlSW1hZ2VcIixcbiAgICBcInByZXZpZXdJbWFnZVwiLFxuICAgIFwidXBsb2FkSW1hZ2VcIixcbiAgICBcImRvd25sb2FkSW1hZ2VcIixcbiAgICBcInRyYW5zbGF0ZVZvaWNlXCIsXG4gICAgXCJnZXROZXR3b3JrVHlwZVwiLFxuICAgIFwib3BlbkxvY2F0aW9uXCIsXG4gICAgXCJnZXRMb2NhdGlvblwiLFxuICAgIFwiaGlkZU9wdGlvbk1lbnVcIixcbiAgICBcInNob3dPcHRpb25NZW51XCIsXG4gICAgXCJoaWRlTWVudUl0ZW1zXCIsXG4gICAgXCJzaG93TWVudUl0ZW1zXCIsXG4gICAgXCJoaWRlQWxsTm9uQmFzZU1lbnVJdGVtXCIsXG4gICAgXCJzaG93QWxsTm9uQmFzZU1lbnVJdGVtXCIsXG4gICAgXCJjbG9zZVdpbmRvd1wiLFxuICAgIFwic2NhblFSQ29kZVwiLFxuICAgIFwiY2hvb3NlV1hQYXlcIixcbiAgICBcIm9wZW5Qcm9kdWN0U3BlY2lmaWNWaWV3XCIsXG4gICAgXCJhZGRDYXJkXCIsXG4gICAgXCJjaG9vc2VDYXJkXCIsXG4gICAgXCJvcGVuQ2FyZFwiXG4gIF0gLy8g5b+F5aGr77yM6ZyA6KaB5L2/55So55qESlPmjqXlj6PliJfooajvvIzmiYDmnIlKU+aOpeWPo+WIl+ihqOingemZhOW9lTJcbn0pO1xuXG53eC5yZWFkeShpbml0KVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICBsb2coSlNPTi5zdHJpbmdpZnkoZGF0YSkgKyBcIjxicj5cIiArIEpTT04uc3RyaW5naWZ5KGNvbW1vbikpXG4gIGluaXRTaGFyZSgpXG4gIGluaXRSZWNvcmQoKVxufVxuXG5mdW5jdGlvbiBpbml0U2hhcmUoKSB7XG4gIHd4VXRpbC5zaGFyZSh0aXRsZSwgdXJsLCBkYXRhLmhlYWRpbWd1cmwsIFwi5YK76YC85omN5Lya5YiG5LqrXCIsIGZ1bmN0aW9uKCkge1xuICAgIGFsZXJ0KFwiT0tcIilcbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgYWxlcnQoXCJGQUlMXCIpXG4gIH0pXG59XG5cbnZhciBpc1JlY29yZGluZyA9IGZhbHNlXG5cbmZ1bmN0aW9uIGluaXRSZWNvcmQoKSB7XG4gIGxpc3RlblJlY29yZCgpXG59XG5cbmZ1bmN0aW9uIGxpc3RlblJlY29yZCgpIHtcbiAgJChcIiNyZWNvcmRcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xuICAgIGlmIChpc1JlY29yZGluZykge1xuICAgICAgJCh0aGlzKS50ZXh0KFwi5byA5aeL5b2V6Z+zXCIpXG4gICAgICBzdG9wUmVjb3JkKClcbiAgICB9IGVsc2Uge1xuICAgICAgJCh0aGlzKS50ZXh0KFwi5YGc5q2i5b2V6Z+zXCIpXG4gICAgICBzdGFydFJlY29yZCgpXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBzdG9wUmVjb3JkKCkge1xuICBpc1JlY29yZGluZyA9IGZhbHNlXG4gIHd4LnN0b3BSZWNvcmQoe1xuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgdmFyIGxvY2FsSWQgPSByZXMubG9jYWxJZFxuICAgICAgd3gucGxheVZvaWNlKHtsb2NhbElkfSlcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIHN0YXJ0UmVjb3JkKCkge1xuICB3eC5zdGFydFJlY29yZCgpO1xuICBpc1JlY29yZGluZyA9IHRydWVcbn1cblxuZnVuY3Rpb24gbG9nKG1zZykge1xuICAvLyQoXCIjY29kZVwiKS5odG1sKG1zZylcbn1cblxuXG4iLCJmdW5jdGlvbiBzaGFyZSh0aXRsZSwgbGluaywgaW1nVXJsLCBkZXNjLCBvaywgZmFpbCkge1xuICBjb25zb2xlLmxvZyhkZXNjLCB0aXRsZSwgbGluaywgaW1nVXJsKVxuICB3eC5vbk1lbnVTaGFyZVRpbWVsaW5lKHtcbiAgICB0aXRsZTogdGl0bGUsXG4gICAgbGluazogbGluayxcbiAgICBkZXNjOiBkZXNjLFxuICAgIGltZ1VybDogaW1nVXJsLFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHsgXG4gICAgICBvayAmJiBvaygpXG4gICAgfSxcbiAgICBjYW5jZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgZmFpbCAmJiBmYWlsKClcbiAgICB9XG4gIH0pXG5cbiAgd3gub25NZW51U2hhcmVBcHBNZXNzYWdlKHtcbiAgICB0aXRsZTogdGl0bGUsXG4gICAgbGluazogbGluayxcbiAgICBpbWdVcmw6IGltZ1VybCxcbiAgICBkZXNjOiBkZXNjLFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHsgXG4gICAgICBvayAmJiBvaygpXG4gICAgfSxcbiAgICBjYW5jZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgZmFpbCAmJiBmYWlsKClcbiAgICB9XG4gIH0pXG5cbiAgd3gub25NZW51U2hhcmVRUSh7XG4gICAgdGl0bGU6IHRpdGxlLFxuICAgIGxpbms6IGxpbmssXG4gICAgZGVzYzogZGVzYyxcbiAgICBpbWdVcmw6IGltZ1VybCxcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7IFxuICAgICAgb2sgJiYgb2soKVxuICAgIH0sXG4gICAgY2FuY2VsOiBmdW5jdGlvbigpIHtcbiAgICAgIGZhaWwgJiYgZmFpbCgpXG4gICAgfVxuICB9KVxuXG4gIHd4Lm9uTWVudVNoYXJlV2VpYm8oe1xuICAgIHRpdGxlOiB0aXRsZSxcbiAgICBsaW5rOiBsaW5rLFxuICAgIGRlc2M6IGRlc2MsXG4gICAgaW1nVXJsOiBpbWdVcmwsXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKCkgeyBcbiAgICAgIG9rICYmIG9rKClcbiAgICB9LFxuICAgIGNhbmNlbDogZnVuY3Rpb24oKSB7XG4gICAgICBmYWlsICYmIGZhaWwoKVxuICAgIH1cbiAgfSlcblxuICB3eC5vbk1lbnVTaGFyZVFab25lKHtcbiAgICB0aXRsZTogdGl0bGUsXG4gICAgbGluazogbGluayxcbiAgICBkZXNjOiBkZXNjLFxuICAgIGltZ1VybDogaW1nVXJsLFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHsgXG4gICAgICBvayAmJiBvaygpXG4gICAgfSxcbiAgICBjYW5jZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgZmFpbCAmJiBmYWlsKClcbiAgICB9XG4gIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtzaGFyZX1cbiJdfQ==

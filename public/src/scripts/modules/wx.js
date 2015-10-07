function share(title, link, imgUrl, desc, ok, fail) {
  console.log(desc, title, link, imgUrl)
  wx.onMenuShareTimeline({
    title: title,
    link: link,
    desc: desc,
    imgUrl: imgUrl,
    success: function () { 
      ok && ok()
    },
    cancel: function() {
      fail && fail()
    }
  })

  wx.onMenuShareAppMessage({
    title: title,
    link: link,
    imgUrl: imgUrl,
    desc: desc,
    success: function () { 
      ok && ok()
    },
    cancel: function() {
      fail && fail()
    }
  })

  wx.onMenuShareQQ({
    title: title,
    link: link,
    desc: desc,
    imgUrl: imgUrl,
    success: function () { 
      ok && ok()
    },
    cancel: function() {
      fail && fail()
    }
  })

  wx.onMenuShareWeibo({
    title: title,
    link: link,
    desc: desc,
    imgUrl: imgUrl,
    success: function () { 
      ok && ok()
    },
    cancel: function() {
      fail && fail()
    }
  })

  wx.onMenuShareQZone({
    title: title,
    link: link,
    desc: desc,
    imgUrl: imgUrl,
    success: function () { 
      ok && ok()
    },
    cancel: function() {
      fail && fail()
    }
  })
}

export default {share}

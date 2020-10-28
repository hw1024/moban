const App = getApp()

Page({
  data: {
    isCreate: 1,
    hasCanvas: 0,
    coin: "212334",
    path: "../../../assets/images/amn-car-wiper.png",
    numImage: [
      '../../../assets/images/num/zgc_num0.png', 
      '../../../assets/images/num/zgc_num1.png', 
      '../../../assets/images/num/zgc_num2.png', 
      '../../../assets/images/num/zgc_num3.png', 
      '../../../assets/images/num/zgc_num4.png', 
      '../../../assets/images/num/zgc_num5.png', 
      '../../../assets/images/num/zgc_num6.png', 
      '../../../assets/images/num/zgc_num7.png',
      '../../../assets/images/num/zgc_num8.png',
      '../../../assets/images/num/zgc_num9.png',
    ],
    items: {
      bgimage: [
        'http://zgc-qn-brand.checoin.cn/o_1bvu78qqi53iv91sqb1d5p9eja.jpg', 
        'http://zgc-qn-brand.checoin.cn/o_1bvu783prilpctf1nrhlch1pkla.jpg', 
        'http://zgc-qn-brand.checoin.cn/o_1bvu78qqi53iv91sqb1d5p9eja.jpg', 
        'http://zgc-qn-brand.checoin.cn/o_1bvu783prilpctf1nrhlch1pkla.jpg', 
        'http://zgc-qn-brand.checoin.cn/o_1bvu78qqi53iv91sqb1d5p9eja.jpg', 
        'http://zgc-qn-brand.checoin.cn/o_1bvu783prilpctf1nrhlch1pkla.jpg', 
        'http://zgc-qn-brand.checoin.cn/o_1bvu78qqi53iv91sqb1d5p9eja.jpg', 
        'http://zgc-qn-brand.checoin.cn/o_1bvu783prilpctf1nrhlch1pkla.jpg',
      ],
    },
    order: [
      'http://zgc-qn-brand.checoin.cn/o_1bvu78qqi53iv91sqb1d5p9eja.jpg', 
      'http://zgc-qn-brand.checoin.cn/o_1bvu783prilpctf1nrhlch1pkla.jpg', 
      'http://zgc-qn-brand.checoin.cn/o_1bvu78qqi53iv91sqb1d5p9eja.jpg', 
      'http://zgc-qn-brand.checoin.cn/o_1bvu783prilpctf1nrhlch1pkla.jpg', 
      'http://zgc-qn-brand.checoin.cn/o_1bvu78qqi53iv91sqb1d5p9eja.jpg', 
      'http://zgc-qn-brand.checoin.cn/o_1bvu783prilpctf1nrhlch1pkla.jpg', 
      'http://zgc-qn-brand.checoin.cn/o_1bvu78qqi53iv91sqb1d5p9eja.jpg', 
      'http://zgc-qn-brand.checoin.cn/o_1bvu783prilpctf1nrhlch1pkla.jpg',
    ], 
    bgWishes: 'http://zgc-qn-brand.checoin.cn/o_1bvu78qqi53iv91sqb1d5p9eja.jpg',  
    cars: 'http://zgc-qn-brand.checoin.cn/o_1bvu6umo91h2214441588e02ggk9.png',
    car_image: '../../../assets/images/animate-car.png',
    zgc_logo: '../../../assets/images/zgc-logo2.png',
    zgc_code: '../../../assets/images/zgc-ma3.png',
  },    
  onLoad(option) {
    this.setData({
      id: option.id,
    })
    //this.getUserInfo()
     
  },
  onShow: function () {
    let that = this
    const coinNum = that.data.coin
    that.setData({
      coin_num: [...coinNum], 
    })
    const query = wx.createSelectorQuery()
    query.select('.compose-box__line').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res){
      const ownWidth = res[0].width
      var width = 800 * parseFloat(ownWidth) / 1200
      that.setData({
        proWidth: width
      })
    })
  },
  bgChange(e) {
    const id = e.currentTarget.dataset.id
    this.setData({
      bgWishes: this.data.items.bgimage[id],
    })
  },
  loadResources() {
    var that = this
    const { bgWishes, cars } = that.data
    const downloadFile = (url) => {
      return new Promise((fulfill, reject) => {
        wx.downloadFile({
          url,
          success({
              tempFilePath
            }) {
              fulfill(tempFilePath)
            },
            fail() {
              reject(`获取图片失败:${url}`)
            }
        })
      })
    }
    let promises = [downloadFile(bgWishes), downloadFile(cars)]
    return Promise.all(promises).then(values => {
      return {
        bgWishes: values[0],
        cars: values[1],
      }
    }).catch(values => {
      console.log(values)
    })    
  },
  syntheisis() {
    var that = this
    that.loadResources()
    .then(res => {
      const resources = res
      App.WxService.showLoading({
        title: '正在生成图片',
        mask: true,
      })
      that.setData({
        hasCanvas: 1,
      }) 
      that.drawImage({resources})
      setTimeout(function () {
        App.WxService.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 278,
          height: 503,
          destWidth: 278,
          destHeight: 503,
          canvasId: 'myCanvas', 
        })
        .then(res => {
          App.WxService.hideLoading()
          that.setData({
            isCreate: 0,
            hasCanvas: 0,
            tempFilePath: res.tempFilePath,
          }) 
        }) 
        .catch(res => {
          console.log(res)
          App.WxService.hideLoading()
          that.setData({
            isCreate: 0,
            hasCanvas: 0,
          }) 
        })
      }, 3000)
    })
  },
  keepImage() {
    App.WxService.showLoading({
      title: '保存中',
      mask: true,
    })
    App.WxService.saveImageToPhotosAlbum({
      filePath: this.data.tempFilePath,
    })
    .then(res => {
      App.WxService.hideLoading()
    })
    .catch(res => {
      App.WxService.hideLoading()
    })
  },
  drawImage({resources}) {
    const ctx = wx.createCanvasContext('myCanvas')
    const [{ bgWishes, cars }, { coin_num, numImage, car_image, zgc_code, zgc_logo }] = [ resources, this.data]
    // draw background
    const [CANVAS_W, CANVAS_H] = [278, 353]
    ctx.drawImage(bgWishes, 0, 0, CANVAS_W, CANVAS_H)
    // draw
    const [SERIES_X, SERIES_Y] = [10, 154]
    ctx.setTextAlign('left')
    ctx.setFontSize(16)
    ctx.fillText('他想买的车型', SERIES_X, SERIES_Y)
    // draw
    const [IMAGELIST_X, IMAGELIST_Y] = [CANVAS_W-10, 136] 
    coin_num.reverse()
    for (let i = 0, l = coin_num.length; i < l; i++) {
      let is = coin_num[i]
      let [x, y] = [IMAGELIST_X-17*(i+1), IMAGELIST_Y] 
      ctx.drawImage(numImage[is], x, y, 15, 23)
    }
    // draw
    const [NAME_X, NAME_Y] = [10, 178]
    ctx.setTextAlign('left')
    ctx.setFontSize(12)
    ctx.fillText('奥迪A4L', NAME_X, NAME_Y)
    // draw
    const [SHOP_X, SHOP_Y] = [CANVAS_W-10, 178]
    ctx.setTextAlign('right')
    ctx.setFontSize(12)
    ctx.fillText('4S店已送出车币', SHOP_X, SHOP_Y)
    // draw
    const [CARIMAGE_X, CARIMAGE_Y] = [0, 184]
    ctx.drawImage(cars, CARIMAGE_X, CARIMAGE_Y, 278, 116)
    // draw 
    const [RECTANGLE_X, RECTANGLE_Y, RECTANGLE_W, RECTANGLE_H] = [31, 314, 216, 2] 
    ctx.setFillStyle('#d8d8d8')
    ctx.fillRect(RECTANGLE_X, RECTANGLE_Y, RECTANGLE_W, RECTANGLE_H)
    ctx.beginPath()
    ctx.arc(27, 315, 4, 0, 2 * Math.PI)
    ctx.setFillStyle('#222222')
    ctx.fill()
    ctx.beginPath()
    ctx.arc(251, 315, 4, 0, 2 * Math.PI)
    ctx.setFillStyle('#d8d8d8')
    ctx.fill()
    ctx.beginPath()
    const [RECTSELECT_X, RECTSELECT_Y, RECTSELECT_W, RECTSELECT_H] = [RECTANGLE_X, RECTANGLE_Y, 800*216/1200, RECTANGLE_H] 
    ctx.setFillStyle('#222222')
    ctx.fillRect(RECTSELECT_X, RECTSELECT_Y, RECTSELECT_W, RECTSELECT_H)
    ctx.beginPath()
    ctx.arc(800*216/1200+35, 315, 4, 0, 2 * Math.PI)
    ctx.setFillStyle('#222222')
    ctx.fill()
    ctx.beginPath()
    const [CARSMALL_X, CARSMALL_Y] = [800*216/1200+35-15, 296]
    ctx.drawImage(car_image, CARSMALL_X, CARSMALL_Y, 30, 13)
    // draw 
    const [ALLTEXT_X, ALLTEXT_Y] = [22, 336]
    ctx.setTextAlign('left')
    ctx.setFontSize(10)
    ctx.fillText('全部目标', ALLTEXT_X, ALLTEXT_Y)
    // draw
    const [COINTEXT_X, COINTEXT_Y] = [CANVAS_W-22, 336]
    ctx.setTextAlign('right')
    ctx.setFontSize(10)
    ctx.fillText('800/1200车币', COINTEXT_X, COINTEXT_Y)
    // draw
    ctx.beginPath()
    const [RECTLOWER_X, RECTLOWER_Y, RECTLOWER_W, RECTLOWER_H] = [0, 353, 278, 150] 
    ctx.setFillStyle('#FFFFFF')
    ctx.fillRect(RECTLOWER_X, RECTLOWER_Y, RECTLOWER_W, RECTLOWER_H)
    // draw
    const [CODEIMAGE_X, CODEIMAGE_Y, CODEIMAGE_W, CODEIMAGE_H] = [40, 356, 94, 94]
    ctx.drawImage(zgc_code, CODEIMAGE_X, CODEIMAGE_Y, CODEIMAGE_W, CODEIMAGE_H)
    // draw
    const [LOGOIMAGE_X, LOGOIMAGE_Y, LOGOIMAGE_W, LOGOIMAGE_H] = [160, 392, 72, 32]
    ctx.drawImage(zgc_logo, LOGOIMAGE_X, LOGOIMAGE_Y, LOGOIMAGE_W, LOGOIMAGE_H)
    // draw
    ctx.beginPath()
    const [SAOTEXT_X, SAOTEXT_Y] = [54, 466]
    ctx.setTextAlign('left')
    ctx.setFontSize(10)
    ctx.setFillStyle('#222222')
    ctx.fillText('扫 我 去 赚 车', SAOTEXT_X, SAOTEXT_Y)
    ctx.draw()
    return ctx
  },
  getUserInfo() {
    const userInfo = App.globalData.userInfo
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      })
      return
    }
    App.getUserInfo()
    .then(data => {
      this.setData({
        userInfo: data
      })
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '吆喝一声 赚个车',
      imageUrl: '',
      path: 'pages/make/share/index',
      success: function (res) {
        // 转发成功
        //console.log(res)
        wx.getShareInfo({
          success: function (res) {
            //console.log(res)
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})
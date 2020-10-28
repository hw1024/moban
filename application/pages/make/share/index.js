const App = getApp()

Page({
  data: {
    indicatorDots: !1,
    autoplay: !1,
    interval: 3000,
    duration: 1000,
    circular: !0,
    current: 0,
    total: 2,
    showModalStatus: false,
    showMoreStatus: false,
    animationData2: {},
    num: '200',
    banners: [
      {
        path: "../../../assets/images/amn-car-wiper.png",
      },
      {
        path: "../../../assets/images/amn-car-wiper.png",
      }
    ],
    friends: [
    {
        path: "../../../assets/images/amn-logo1.png",
      num: "3",
    },
    {
      path: "../../../assets/images/amn-logo1.png",
      num: "2",
    },
    {
      path: "../../../assets/images/amn-logo1.png",
      num: "1",
    },
    {
      path: "../../../assets/images/amn-logo1.png",
      num: "1",
    },
    {
      path: "../../../assets/images/amn-logo1.png",
      num: "2",
    },
    {
      path: "../../../assets/images/amn-logo1.png",
      num: "2",
    },
    {
      path: "../../../assets/images/amn-logo1.png",
      num: "2",
    }
   ],
    earn: {
      userName:"林阳",
      storeName: "沈阳鑫达4S店",
      intro: "辽宁鑫达汽车销售服务有限责任公司办公室地址位于东北第一大城市、素有“一朝发祥地，两代帝王都”之称--沈阳，于2001-09-27 在沈阳工商局注册成立，注册资本为500（万元），公司已经公司发展壮大的16年，愿与社会各界同仁携手合作，谋求共同发展，继续为新老客户提供最优秀的产品和服务。",
      preview: "516",
      coin: "212334",
      person: "615",
      dollor: "23.75",
      earn_car_id: "1",
      address: "沈阳黄河北大街123号"
    }
  },
  onLoad() {
    //this.getUserInfo()
  },
  onShow: function () {
    let that = this
    const coinNum = that.data.earn.coin
    that.setData({
      coin_num: [...coinNum], 
    })
    const query = wx.createSelectorQuery()
    query.select('.earn-info__line').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res){
      console.log(res)
      const ownWidth = res[0].width
      var width = 200 * parseFloat(ownWidth) / 1200
      console.log(width)
      var animation = wx.createAnimation({
        duration: 1500,
        timingFunction: 'ease',
        delay: 350
      })
      that.animation = animation
      animation.width(width).step()
      that.setData({
        animationData2: animation.export()
      })
    })
  },
  powerDrawer(e) {
    const currentStatus = e.currentTarget.dataset.status
    wx.showToast({ title: "助力成功", icon: "success", duration: 2000 });
  },
  bindComposeTo(e) {
    App.WxService.navigateTo('/pages/make/compose/index')
  },
  earnMoreTap(e) {
    const currentStatus = this.data.showMoreStatus
    currentStatus ? this.setData({  
      showMoreStatus: false,  
    }) : this.setData({  
      showMoreStatus: true,  
    })    
  },
  bindEarnTo(e) {
		const earnCarId = e.currentTarget.dataset.earnCarId
		App.WxService.navigateTo('/pages/shop/index/index', {
      earn_car_id: earnCarId,
    })
  },
  swiperchange(e) {
    this.setData({
      current: e.detail.current, 
    })
  },
  switchTab(e) {
    const path = e.currentTarget.dataset.path
    App.WxService.switchTab(path)
  },
  navigateTo(e) {
    const [index, path] = [e.currentTarget.dataset.index, e.currentTarget.dataset.path]
    App.WxService.navigateTo(path)
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
})
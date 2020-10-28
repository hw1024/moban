const App = getApp()

Page({
  data: {
    animationData: {},
    isShowToast: false,
    networkStatus: true,
    indicatorDots: !1,
    autoplay: !1,
    current: 0,
    interval: 3000,
    duration: 1000,
    circular: !0,
    banners: [
      {
        path: "../../assets/images/banner_default.png",
        url: "/pages/make/index/index",
      },
      {
        path: "../../assets/images/banner_default.png",
        url: "/pages/make/index/index",
      },
    ],
    carrs: {
      address: "沈阳",
      homeList: [
        {
          id: "1",
          car_id: "23",
          image: '../../assets/images/amn-book-car.png',
          series: '宝马X3红色系列',
          shop: '沈阳·鑫鑫达4s店',
          payment_num: "20000",
          help_num: "37",
        },
        {
          id: "2",
          car_id: "24",
          image: '../../assets/images/amn-book-car.png',
          series: '宝马X8绿色系列',
          shop: '沈阳·达达4s店',
          payment_num: "10000",
          help_num: "357",
        },
        {
          id: "3",
          car_id: "25",
          image: '../../assets/images/amn-book-car.png',
          series: '宝马X5红色系列',
          shop: '沈阳·鑫鑫4s店',
          payment_num: "50000",
          help_num: "437",
        },
        {
          id: "4",
          car_id: "26",
          image: '../../assets/images/amn-book-car.png',
          series: '宝马X8紫色系列',
          shop: '沈阳·鑫达4s店',
          payment_num: "80000",
          help_num: "167",
        },
        {
          id: "5",
          car_id: "27",
          image: '../../assets/images/amn-book-car.png',
          series: '宝马X4红色系列',
          shop: '沈阳·鑫达4s店',
          payment_num: "560000",
          help_num: "1517",
        },
        {
          id: "6",
          car_id: "28",
          image: '../../assets/images/amn-book-car.png',
          series: '宝马X4红色系列',
          shop: '沈阳·鑫达4s店',
          payment_num: "840000",
          help_num: "1417",
        },
      ],
    }, 
  },
  onLoad() {
    this.getBanners()
    this.getLocation()
  },
  onShow() { 
    let that = this
    that.onPullDownRefresh()
    App.WxService.getNetworkType()
    .then(res => {
      const networkType = res.networkType 
      if (networkType == 'none') {
        that.setData({
          networkStatus: false,
        })
      }
    })
  },
  getBanners() {
    App.HttpService.getBannersIndex()
    .then(res => {
      const data = res.data
      if (data.code == 200) {
        //data.data.items.forEach(n => n.path = App.renderImage(n.images[0].path))
        this.setData({
          banners: data.data.items
        })
      }
    })
  },
  getCars() {
    App.HttpService.getcarListIndex()
    .then(res => {
      const data = res.data
      if (dat.code == 200) {
        cars.homeList = [...cars.homeList, ...data.data.items]
        cars.address = data.data.address
        carrs.selectData = data.data.selectData
        this.setData({
          cars: cars,
        })
        setTimeout(function(){
          App.WxService.hideNavigationBarLoading()
          App.WxService.stopPullDownRefresh()
        },1500);
      }
    })
    setTimeout(function(){
      App.WxService.hideNavigationBarLoading()
      App.WxService.stopPullDownRefresh()
    },1500);
  },
  onPullDownRefresh() {
    App.WxService.showNavigationBarLoading() 
    this.getCars()
  },
  selectcarTap(e) {
    const [index, id, carId, help, series, payment, shop] = [e.currentTarget.dataset.index, e.currentTarget.dataset.id, e.currentTarget.dataset.carId, e.currentTarget.dataset.help, e.currentTarget.dataset.series, e.currentTarget.dataset.payment, e.currentTarget.dataset.shop]
    this.setData({
      postData: {
        car_id: carId,
      },
      'carrs.selectData': {
        help: help,
        series: series,
        payment: payment,
        shop: shop,
      },
      activeIndex: index,
    })
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
      delay: 0,
    })
    this.animation = animation
    animation.translateY(-80).step()
    this.setData({
      animationData:animation.export()
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData:animation.export()
      })
    }.bind(this), 400)
  },
  bindForm(e) {
    const [postData, selectData] = [this.data.postData, this.data.carrs.selectData]
    if (selectData) {
      const params = postData
      App.WxService.navigateTo('/pages/make/share/index')
      // App.HttpService.postcheckAuth(params)
      // .then(res => {
      //     const data = res.data
      //     if (data.meta.code == 0) {
      //       App.WxService.navigateTo('/pages/make/index/index')
      //     }
      // })
    } else {
      this.setData({ 
        count: 3000, 
        toastText: '请先选择车辆'
      })
      this.showToast()
    }
  },
  showToast() { 
    var _this = this 
    _this.data.count = parseInt(_this.data.count) ? parseInt(_this.data.count) : 3000
    _this.setData({ 
      isShowToast: true, 
    });  
    setTimeout(function () { 
      _this.setData({ 
        isShowToast: false
      }); 
    }, _this.data.count); 
  }, 
  navigateTo(e) {
    const path = e.currentTarget.dataset.path
    App.WxService.navigateTo(path)
  },
  onSwiperTap(e) {
    const url = e.target.dataset.url
    App.WxService.navigateTo(url)
  },
  getLocation() {
    App.WxService.getLocation({
      type: 'wgs84',
    })
    .then(res => {
      console.log(res)
    })
  },
})

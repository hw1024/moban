const App = getApp()

Page({
  data: {
    indicatorDots: !1,
    autoplay: 1,
    interval: 3000,
    duration: 1000,
    circular: !0,
    current: 0,
    total: 2,
    cardetails: {
      store_image_data: [
        {
          store_image: "../../../assets/images/amn-car-swiper.png",
        },
        {
          store_image: "../../../assets/images/amn-car-swiper.png",
        }
      ],
      car_id: 1,
      car_select_id: 2,
      drawcar_status: 0,
      car_name: "奥迪A4L 30周年车型40 TFSI进取型",
      subscription: "5000.00",
      preview: "516",
      coin: "2000",
      person: "615",
      dollor: "23.75",
      address: "沈阳鑫达4S店"
    },
  },
  onLoad() {
    this.getData()
  },
  getData() {
    App.HttpService.getDetailStore()
    .then(res => {
      const data = res.data
      if (data.code == 200) {
        //data.data.store_image_data.forEach(n => n.store_image = App.renderImage(n.store_image))
        this.setData({
          cardetails: data.data.items,
          total: data.data.store_image_data.length, 
        })
      }
    })
  },
  previewCar:function(e){
    let that = this
    const [id, selectId] = [that.data.cardetails.car_id, that.data.cardetails.car_select_id]
    if (id != selectId) {
      App.WxService.showModal({
        title: '提示',
        content: '你确定要更换正在赚的车辆吗？',
        cancelText:'再想想',
        cancelColor:'#ff6531',
        confirmText:'立即更换',
        confirmColor:'#666',
      })
      .then(res => {
        if (res.confirm) {
          App.WxService.showToast({
            title: '更换成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            'cardetails.car_select_id': id,
          })
        }
      })
    } else {
      App.WxService.navigateTo('/pages/book/index/index', {
        id: id,
      })
    }
  },
  swiperchange(e) {
    this.setData({
      current: e.detail.current, 
    })
  },
  inviteTap(e) {
    wx.navigateBack({
      delta: 2,
    })
  },
  navigateTo(e) {
		const path = e.currentTarget.dataset.path
		App.WxService.navigateTo(path)
  }
})
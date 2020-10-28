const App = getApp()

Page({
  data: {
    showModal: false,
    animationData: {},
    dialog: {
      title: "退回订金审核",
      btn_title: "确认",
    },
   	items: {
      order_nember: 20171116159753852,
      order_car_id: 2,
      locking_status: 2,
      order_car_status: 1,
      car_order_money: 6000,
      total_money: 5000,
   		employee_phone: "13029104555",
   		locking_time: "30天",
      locking_rise_time: "2017-09-27",
      locking_stop_time: "2017-10-27",
   		time: "2017-09-27 13:00:00",
      car_id: 1,
      car_image: "../../../assets/images/amn-book-car.png",
      car_name: '奥迪S5 2010款',
      car_description: "【奥迪S5 2010款】奥迪全新S5家族将于今年9月上市，该车的内部预估价格区间为888～999元，包含Coupe(双…)",
   	} 
  },
  onLoad() {
    this.getData() 
  },
  getData() {
    App.HttpService.getOwnDetailOrdercar()
    .then(res => {
      const data = res.data
      if (data.code == 200) {
        this.setData({
          items: data.data.items,
        })
      }
    })
  },
  refundApplyTap(e) {
    this.setData({
      showModal: true
    })
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
      delay: 0,
    })
    this.animation = animation
    animation.scale(1,1).step()
    this.setData({
      animationData:animation.export()
    })  
  },
  preventTouchMove: function () {
  },
  onConfirm() {
    let that = this
    const params = that.data.items.order_car_id
    // App.HttpService.postRefundApplyOrdercar(params)
    // .then(res => {
    //   const data = res.data
    //   if (data.code == 200) {
    //     this.hideModal();
    //     App.WxService.showToast({
    //       title: '申请成功',
    //       icon: 'success',
    //       duration: 2000
    //     })
    //     .then(res => {
    //       this.setData({
    //         'items.order_car_status': 2, 
    //       })
    //     }) 
    //   }
    // })
    this.hideModal();
    App.WxService.showToast({
      title: '申请成功',
      icon: 'success',
      duration: 2000
    })
    .then(res => {
      this.setData({
        'items.order_car_status': 2, 
      })
    }) 
  },
  hideModal() {
    var that = this
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
      delay: 0,
    })
    that.animation = animation
    animation.scale(0,0).step()
    that.setData({
      animationData:animation.export()
    })
    setTimeout(function(){
      that.setData({
        showModal: false
      })
    },400)
  },
})
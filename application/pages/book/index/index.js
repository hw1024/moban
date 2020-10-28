const App = getApp()

Page({
  data: {
    switch_status: false,
    money_show: 0,
   	items: {
      order_nember: 20171116159753852,
      order_car_id: 2,
      discount_coin: 600,
      car_order_money: 6000,
      car_id: 1,
      car_image: "../../../assets/images/amn-book-car.png",
      car_name: '奥迪S5 2010款',
      car_description: "【奥迪S5 2010款】奥迪全新S5家族将于今年9月上市，该车的内部预估价格区间为888～999元，包含Coupe(双…)",
   	},
  },
  onLoad() {
    this.getData() 
  },
  getData() {
    App.HttpService.getDetailOrdercar()
    .then(res => {
      const data = res.data
      if (data.code == 200) {
        this.setData({
          items: data.data.items,
        })
      }
    })
  },
  switchChange(e) {
    const [value, money] = [e.detail.value, this.data.items.discount_coin/10]
    value ? this.setData({
      switch_status: true,
      money_show: money,
    }) : this.setData({
      switch_status: false,
      money_show: 0,
    })
  },
  paymentTap(e) {
    const money = e.currentTarget.dataset.money
    const params = {
      pay_money: money,
    }
    // App.HttpService.postPaymentOrdercar(params)
    // .then(res => {
    //   const data = res.data
    //   if (data.code == 200) {
    //     var nonceStr = data.nonce_str;  
    //     var appId = data.appid;  
    //     var pkg = 'prepay_id='+ data.prepay_id;  
    //     var timeStamp = data.timeStamp;  
    //     var paySign = data.paySign;  
    //     var sign = data.sign;  
    //     //console.log(pkg);  
    //     wx.requestPayment({  
    //       timeStamp: timeStamp,  
    //       nonceStr: nonceStr,  
    //       package: pkg,  
    //       signType: 'MD5',  
    //       paySign: paySign,  
    //       success: function(res){  
    //         App.WxService.redirectTo("/pages/book/success/index")
    //       }  
    //     })  
    //   }
    // })
    // console.log(money)
    App.WxService.redirectTo("/pages/book/success/index")
  },
  navigateTo(e) {
    const [index, path] = [e.currentTarget.dataset.index, e.currentTarget.dataset.path]
    App.WxService.navigateTo(path)
  },
})
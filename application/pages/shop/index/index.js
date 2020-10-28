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
    stores: {
      name: "沈阳鑫达4S店",
      brand_image: "../../../assets/images/amn-store-logo.png",
      store_image_data: [
        {
          store_image: "../../../assets/images/amn-store-banner.png",
        },
        {
          store_image: "../../../assets/images/amn-store-banner.png",
        }
      ],
      description: "辽宁鑫达汽车销售服务有限责任公司办公室地址位于东北第一大城市、素有“一朝发祥地，两代帝王都”之称--沈阳，于2001-09-27 在沈阳工商局注册成立，注册资本为500（万元），公司已经公司发展壮大的16年，愿与社会各界同仁携手合作，谋求共同发展，继续为新老客户提供最优秀的产品和服务。",
      location_detail: "沈阳黄河北大街123号",
      car_type_count: 20,
      is_see_car: 1,
      brand_url_data: [
        {
          brand_url: "../../../assets/images/amn-car-logo.png", 
        },
        {
          brand_url: "../../../assets/images/amn-car-logo.png", 
        },
        {
          brand_url: "../../../assets/images/amn-car-logo.png", 
        },
        {
          brand_url: "../../../assets/images/amn-car-logo.png", 
        },
        {
          brand_url: "../../../assets/images/amn-car-logo.png", 
        },
        {
          brand_url: "../../../assets/images/amn-car-logo.png", 
        },
        {
          brand_url: "../../../assets/images/amn-car-logo.png", 
        },
        {
          brand_url: "../../../assets/images/amn-car-logo.png", 
        },
        {
          brand_url: "../../../assets/images/amn-car-logo.png", 
        },
        {
          brand_url: "../../../assets/images/amn-car-logo.png", 
        },
      ],
    },
  },
  onLoad(option) {
    this.setData({
      earn_car_id: option.earn_car_id
    })
    this.getData()
  },
  getData() {
    App.HttpService.getDetailStore()
    .then(res => {
      const data = res.data
      if (data.code == 200) {
        //data.data.store_image_data.forEach(n => n.store_image = App.renderImage(n.store_image))
        this.setData({
          stores: data.data.items,
          total: data.data.store_image_data.length, 
        })
      }
    })
  },
  swiperchange(e) {
    this.setData({
      current: e.detail.current, 
    })
  },
  navigateTo(e) {
		const [index, path] = [e.currentTarget.dataset.index, e.currentTarget.dataset.path]
		App.WxService.navigateTo(path)
  },
  bindSeecarTo(e) {
    const [status, earnCarId] = [this.data.stores.is_see_car, this.data.earn_car_id]
    if (status == 1) {
      App.WxService.showToast({
        title: '预约成功',
        icon: 'success',
        duration: 2000
      })
      .then(res => {
        this.setData({
          'stores.is_see_car': 2, 
        })
        setTimeout(function(){
          App.WxService.navigateTo('/pages/seecar/index/index', {
            earn_car_id: earnCarId,
          })
        }, 1000) 
      }) 
      // App.HttpService.postcheckAuth(params)
      // .then(res => {
      //   const data = res.data
      //   if (data.meta.code == 0) {
      //     App.WxService.showToast({
      //       title: '预约成功',
      //       icon: 'success',
      //       duration: 2000
      //     })
      //     .then(res => {
      //       setTimeout(function(){
      //         App.WxService.navigateTo('/pages/seecar/index/index', {
      //           earn_car_id: earnCarId,
      //         })
      //       }, 1000) 
      //     }) 
      //   }
      // })
    } else {
      App.WxService.navigateTo('/pages/seecar/index/index', {
        earn_car_id: earnCarId,
      })
    }
  }
})
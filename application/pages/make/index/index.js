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
    animationData: {},
    animationData2: {},
    num: 200,
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
      coin: "2000",
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
    this.utils(currentStatus) 
  },
  utils(currentStatus) {  
      /* 动画部分 */  
      // 第1步：创建动画实例   
      let animation = wx.createAnimation({  
        duration: 200,  //动画时长  
        timingFunction: "linear", //线性  
        delay: 0  //0则不延迟  
      });  
        
      // 第2步：这个动画实例赋给当前的动画实例  
      this.animation = animation;  
    
      // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停  
      animation.translateY(240).step();  
    
      // 第4步：导出动画对象赋给数据对象储存  
      this.setData({  
        animationData: animation.export()  
      })  
        
      // 第5步：设置定时器到指定时候后，执行第二组动画  
      setTimeout(function () {  
        // 执行第二组动画：Y轴不偏移，停  
        animation.translateY(0).step()  
        // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
        this.setData({  
          animationData: animation 
        })  
          
        //关闭抽屉  
        if (currentStatus == "close") {  
          this.setData({  
              showModalStatus: false  
          });  
        }  
      }.bind(this), 200)    
      // 显示抽屉  
      if (currentStatus == "open") {  
        this.setData(  
          {  
            showModalStatus: true  
          }  
        );  
      }  
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
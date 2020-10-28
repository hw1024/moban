const App = getApp()

Page({
	data: {
		userInfo: {},
		networkStatus: true,
		users: {
			today_coin: 500,
			add_coin: 2540,
			ranking: 43,
			change_num: 3,
			earn_num: 50,
			see_num: 10,
			book_num: 2,
			news: 1,
			items: [
				{
					seecar_status: "0",
					drawcar_status: "0",
					id: '244',
					shop_id: '1',
					image: '../../assets/images/amn-book-car.png',
					series: '宝马X3红色系列',
					shop: '沈阳·鑫达4s店',
				}
				
			],
		},	
	},
	onLoad() {
		//this.getUserInfo()
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
	getUsers() {
		App.HttpService.getUsers()
        .then(res => {
            const data = res.data
            if (data.meta.code == 0) {
                this.setData({
                    'users': data.data,
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
	    this.getUsers()
	},
	switchTab(e) {
		const [index, path] = [e.currentTarget.dataset.index, e.currentTarget.dataset.path]
		App.WxService.switchTab(path)
	},
	navigateTo(e) {
		const [index, path] = [e.currentTarget.dataset.index, e.currentTarget.dataset.path]
		App.WxService.navigateTo(path)
    },
    voucherTap(e) {
    	const [id, shopId] = [e.currentTarget.dataset.id, e.currentTarget.dataset.shopId]
    	App.WxService.navigateTo('/pages/make/index/index', {
    		id: id,
    		shopId: shopId,
    	})
    },
    bindAppointTap(e) {
    	let that = this
    	const status = e.currentTarget.dataset.status
    	if( status == '0') {
    		App.WxService.showToast({
		        title: '预约成功',
		        icon: 'success',
		        duration: 2000
		    })
		    .then(res => {
		        setTimeout(function(){
		          App.WxService.navigateTo('/pages/seecar/index/index')
		        }, 500) 
		    }) 
    		// App.HttpService.addCart(params)
      //       .then(res => {
      //           const data = res.data
      //           if (data.code == 0) {
      //           	App.WxService.showToast({
				  //       title: '预约成功',
				  //       icon: 'success',
				  //       duration: 2000
				  //   })
				  //   .then(res => {
				  //       setTimeout(function(){
				  //         App.WxService.navigateTo('/pages/seecar/index/index')
				  //       }, 1000) 
				  //   }) 
      //           }
      //       })
    	} else {
    		App.WxService.navigateTo('/pages/seecar/index/index')
    	}
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
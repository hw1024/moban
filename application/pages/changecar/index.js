const App = getApp()

Page({
    data: {
		changecars: {
			default: {
				seecar_status: "0",
				drawcar_status: "0",
				id: '244',
				shop_id: '1',
				image: '../../assets/images/amn-book-car.png',
				series: '宝马X3红色系列',
				shop: '沈阳·鑫达4s店',
			},
			items: [
				{
					seecar_status: "0",
					drawcar_status: "0",
					id: '254',
					shop_id: '2',
					image: '../../assets/images/amn-book-car.png',
					series: '宝马X3红色系列',
					shop: '沈阳·鑫达4s店',
				},
				{
					seecar_status: "0",
					drawcar_status: "0",
					id: '244',
					shop_id: '1',
					image: '../../assets/images/amn-book-car.png',
					series: '宝马X3红色系列',
					shop: '沈阳·鑫达4s店',
				},
				{
					seecar_status: "1",
					drawcar_status: "1",
					id: '264',
					shop_id: '6',
					image: '../../assets/images/amn-book-car.png',
					series: '宝马X3红色系列',
					shop: '沈阳·鑫达4s店',
				},	
				{
					seecar_status: "1",
					drawcar_status: "1",
					id: '274',
					shop_id: '9',
					image: '../../assets/images/amn-book-car.png',
					series: '宝马X3红色系列',
					shop: '沈阳·鑫达4s店',
				},		
			],
		},	
	},
    onLoad() {
      	let that = this
		that.ranking = App.HttpResource('/ranking/:id', {id: '@id'})
		this.onRefresh()
    },
    onRefresh() {
		//this.initData()
		this.getChangecars()
	},
	initData() {
        this.setData({
            changecars: {
                items: [],
                params: {
                    page : 1,
                    limit: 20,
                },
                paginate: {}
            }
        })
    },
	getChangecars() {
		const changecars = this.data.changecars
        const params = changecars.params
		this.ranking.queryAsync(params)
        .then(res => {
            const data = res.data
            if (data.meta.code == 0) {
	            changecars.items = [...changecars.items, ...data.data.items]
	            changecars.default = data.data.default
	            changecars.paginate = data.data.paginate
	            changecars.params.page = data.data.paginate.next
	            changecars.params.limit = data.data.paginate.perPage
	            this.setData({
	                changecars: changecars, 
	            })
	        }
        })
	},
    changeCar(e) {
    	const [id, shopId] = [e.currentTarget.dataset.id, e.currentTarget.dataset.shopId]
    	App.WxService.showModal({
	        title: '',
	        cancelText: '再想想',
	        cancelColor: '#FF6531',
	        confirmText: '立即更换',
	        confirmColor: '#666',
	        content: '你确定要更换正在赚的车辆吗？',
	    })
	    .then(res => {
	        if (res.confirm) {
	        	const params = {
	        		id: id, 
	        		shopId: shopId,
	        	}
		      	App.HttpService.addCart(params)
		      	.then(res => {
		        	const data = res.data
		        	if (data.meta.code == 0) {
		            	this.getChangecars()
		          	}
		      	})
	          	//console.log('用户点击确定')
	        } else if (res.cancel) {
	          //console.log('用户点击取消')
	        }
	    })
    },
    onReachBottom() {
	    // (!this.data.changecars.paginate.hasNext) return
	    this.getChangecars()
	},
})
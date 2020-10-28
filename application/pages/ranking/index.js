const App = getApp()

Page({
    data: {
    	winner: false,
    	networkStatus: true,
	    rankings: {
	    	own: {
	    		id: 17, image: "../../assets/images/amn-ranking-t.png", name: "一叶知秋", invite_num: 190, payment_num: 4,
	    	},
	    	items: [
				{id: 1, image: "../../assets/images/amn-ranking-t.png", name: "张三", invite_num: 170, payment_num: 11554},
				{id: 2, image: "../../assets/images/amn-ranking-t.png", name: "一叶知秋", invite_num: 130,payment_num: 5224},
				{id: 3, image: "../../assets/images/amn-ranking-t.png", name: "天凉好个知秋", invite_num: 170, payment_num: 1154},
				{id: 4, image: "../../assets/images/amn-ranking-t.png", name: "李四", invite_num: 10,payment_num: 524},
				{id: 5, image: "../../assets/images/amn-ranking-t.png", name: "many", invite_num: 17, payment_num: 1154},
				{id: 6, image: "../../assets/images/amn-ranking-t.png", name: "today", invite_num: 13,payment_num: 524},
				{id: 7, image: "../../assets/images/amn-ranking-t.png", name: "阳光", invite_num: 1740, payment_num: 154},
				{id: 8, image: "../../assets/images/amn-ranking-t.png", name: "keji", invite_num: 1340,payment_num: 524},
				{id: 9, image: "../../assets/images/amn-ranking-t.png", name: "科技先锋", invite_num: 1570, payment_num: 154},
				{id: 10, image: "../../assets/images/amn-ranking-t.png", name: "一叶知秋", invite_num: 1530,payment_num: 524},
				{id: 11, image: "../../assets/images/amn-ranking-t.png", name: "一叶知秋", invite_num: 1270, payment_num: 154},
				{id: 12, image: "../../assets/images/amn-ranking-t.png", name: "一叶知秋", invite_num: 1930,payment_num: 5},
				{id: 13, image: "../../assets/images/amn-ranking-t.png", name: "一叶知秋", invite_num: 190, payment_num: 4},
				{id: 14, image: "../../assets/images/amn-ranking-t.png", name: "一叶知秋", invite_num: 110,payment_num: 24},
				{id: 15, image: "../../assets/images/amn-ranking-t.png", name: "many", invite_num: 17, payment_num: 1154},
				{id: 16, image: "../../assets/images/amn-ranking-t.png", name: "today", invite_num: 13,payment_num: 524},
				{id: 17, image: "../../assets/images/amn-ranking-t.png", name: "阳光", invite_num: 1740, payment_num: 154},
				{id: 18, image: "../../assets/images/amn-ranking-t.png", name: "keji", invite_num: 1340,payment_num: 524},
				{id: 19, image: "../../assets/images/amn-ranking-t.png", name: "科技先锋", invite_num: 1570, payment_num: 154},
				{id: 20, image: "../../assets/images/amn-ranking-t.png", name: "一叶知秋", invite_num: 1530,payment_num: 524},
				{id: 21, image: "../../assets/images/amn-ranking-t.png", name: "一叶知秋", invite_num: 1270, payment_num: 154},
				{id: 22, image: "../../assets/images/amn-ranking-t.png", name: "一叶知秋", invite_num: 1930,payment_num: 5},
				{id: 23, image: "../../assets/images/amn-ranking-t.png", name: "一叶知秋", invite_num: 190, payment_num: 4},
				{id: 24, image: "../../assets/images/amn-ranking-t.png", name: "一叶知秋", invite_num: 110,payment_num: 24},
			],
	    }, 
	},
	onLoad() {
		let that = this
		that.ranking = App.HttpResource('/ranking/:id', {id: '@id'})
		const winners = this.data.rankings.own.id
		const query = wx.createSelectorQuery()
	    query.select(`.ranking_${winners}`).boundingClientRect()
	    query.selectViewport().scrollOffset()
	    query.exec(function(res){
	    	const [ownTop, ownHeight] = [res[0].top, res[0].height]
	    	that.setData({
				ownTop: ownTop,
				ownHeight: ownHeight,
			})
	    })
		winners > 12 ? this.setData({
			winner: true,
		}) :  this.setData({
			winner: false,
		})
		this.onRefresh()
		this.getSystemInfo() 
	},
	onShow() { 
	    let that = this
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
	onRefresh() {
		//this.initData()
		this.getRankings()
	},
	initData() {
        this.setData({
            rankings: {
                items: [],
                params: {
                    page : 1,
                    limit: 20,
                },
                paginate: {}
            }
        })
    },
	getRankings() {
		const rankings = this.data.rankings
        const params = rankings.params
		this.ranking.queryAsync(params)
        .then(res => {
            const data = res.data
            rankings.items = [...rankings.items, ...data.data.items]
            rankings.own = data.data.own
            rankings.paginate = data.data.paginate
            rankings.params.page = data.data.paginate.next
            rankings.params.limit = data.data.paginate.perPage
            this.setData({
                rankings: rankings, 
            })
        })
	},
	rankingscroll(e) {
		const [scrollTop, ownTop, ownHeight, windowHeight] = [e.detail.scrollTop, this.data.ownTop, this.data.ownHeight, this.data.windowHeight]
		scrollTop > (ownTop - windowHeight + ownHeight) ? this.setData({
			winner: false,
		}) :  this.setData({
			winner: true,
		})
	},
	getMore(e) {
		//if (!this.data.rankings.paginate.hasNext) return
        this.getRankings()
	},
	getSystemInfo() {
        App.WxService.getSystemInfo()
        .then(data => {
            this.setData({
                windowWidth: data.windowWidth, 
                windowHeight: data.windowHeight, 
            })
        })
    }, 
})
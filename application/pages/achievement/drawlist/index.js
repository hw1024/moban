const App = getApp()

Page({
  	data: { 
  		achievementlist: {
  			pepele: 334,
   			coin_total: 1243,
    		items: [
				{id: 1, image: "../../../assets/images/amn-ranking-t.png", earn_coin: "7",own_coin: "8", seecar_status: "3", drawcar_status: "0", time: "2017.10.18 20:10:14"},
				{id: 2, image: "../../../assets/images/amn-ranking-t.png", earn_coin: "7",own_coin: "9", seecar_status: "1", drawcar_status: "0", time: "2017.10.18 20:10:14"},
				{id: 3, image: "../../../assets/images/amn-ranking-t.png", earn_coin: "2",own_coin: "10", seecar_status: "0", drawcar_status: "1", time: "2017.10.18 20:10:14"},
				{id: 4, image: "../../../assets/images/amn-ranking-t.png", earn_coin: "2",own_coin: "8", seecar_status: "1", drawcar_status: "0", time: "2017.10.18 20:10:14"},
				{id: 5, image: "../../../assets/images/amn-ranking-t.png", earn_coin: "3",own_coin: "9", seecar_status: "0", drawcar_status: "0", time: "2017.10.18 20:10:14"},
				{id: 6, image: "../../../assets/images/amn-ranking-t.png", earn_coin: "2",own_coin: "9", seecar_status: "3", drawcar_status: "3", time: "2017.10.18 20:10:14"},
				{id: 7, image: "../../../assets/images/amn-ranking-t.png", earn_coin: "2",own_coin: "10", seecar_status: "0", drawcar_status: "0", time: "2017.10.18 20:10:14"},
				{id: 8, image: "../../../assets/images/amn-ranking-t.png", earn_coin: "2",own_coin: "8", seecar_status: "3", drawcar_status: "0", time: "2017.10.18 20:10:14"},
				{id: 9, image: "../../../assets/images/amn-ranking-t.png", earn_coin: "2",own_coin: "10", seecar_status: "0", drawcar_status: "0", time: "2017.10.18 20:10:14"},
				{id: 10, image: "../../../assets/images/amn-ranking-t.png", earn_coin: "2",own_coin: "8", seecar_status: "0", drawcar_status: "0", time: "2017.10.18 20:10:14"},
				{id: 11, image: "../../../assets/images/amn-ranking-t.png", earn_coin: "2",own_coin: "8", seecar_status: "0", drawcar_status: "0", time: "2017.10.18 20:10:14"},
			    {id: 13, image: "../../../assets/images/amn-ranking-t.png", earn_coin: "2",own_coin: "8", seecar_status: "3", drawcar_status: "0", time: "2017.10.18 20:10:14"},
                {id: 14, image: "../../../assets/images/amn-ranking-t.png", earn_coin: "2",own_coin: "10", seecar_status: "0", drawcar_status: "0", time: "2017.10.18 20:10:14"},
                {id: 15, image: "../../../assets/images/amn-ranking-t.png", earn_coin: "2",own_coin: "8", seecar_status: "0", drawcar_status: "0", time: "2017.10.18 20:10:14"},
                {id: 16, image: "../../../assets/images/amn-ranking-t.png", earn_coin: "2",own_coin: "8", seecar_status: "0", drawcar_status: "0", time: "2017.10.18 20:10:14"},
            ],
    	},   
  	},
  	onLoad() {
		this.ranking = App.HttpResource('/ranking/:id', {id: '@id'})
		this.onPullDownRefresh()
    },
    initData() {
        this.setData({
            achievementlist: {
                items: [],
                params: {
                    page : 1,
                    limit: 20,
                },
                paginate: {}
            }
        })
    },
	getList() {
		const achievementlist = this.data.achievementlist
        const params = achievementlist.params
		this.ranking.queryAsync(params)
        .then(res => {
            const data = res.data
            if (data.meta.code == 0) {
                achievementlist.items = [...achievementlist.items, ...data.data.items]
                achievementlist.pepele = data.data.pepele
                achievementlist.coin_total = data.data.coin_total
                achievementlist.paginate = data.data.paginate
                achievementlist.params.page = data.data.paginate.next
                achievementlist.params.limit = data.data.paginate.perPage
                this.setData({
                    achievementlist: achievementlist, 
                })
    	        App.WxService.hideNavigationBarLoading()
    	        App.WxService.stopPullDownRefresh()
            }
        })
        setTimeout(function(){
        	App.WxService.hideNavigationBarLoading()
        	App.WxService.stopPullDownRefresh()
        },1500);
	},
  	onPullDownRefresh() {
		App.WxService.showNavigationBarLoading() 
		//this.initData()
        this.getList()
	},
	onReachBottom() {
	    console.info('onReachBottom')
	    // (!this.data.achievementlist.paginate.hasNext) return
	    this.getList()
	},
})
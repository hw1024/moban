const App = getApp()

Page({
    data: {
       carcoin: {
       		coin_total: "123.55",
	    	items: [
        {id: 0, month : "2017-10"},
				{id: 1, time: "06.28 15:39", image: "../../assets/images/amn-ranking-t.png", name: "张三", status: "已看车", coin_num: 54, coin_status:"0", shou: '-23'},
				{id: 2, time: "06.28 15:39", image: "../../assets/images/amn-ranking-t.png", name: "骑牛", status: "已看车", coin_num: 55, coin_status:"1", shou: '+3'},
				{id: 3, time: "06.28 15:39", image: "../../assets/images/amn-ranking-t.png", name: "张三", status: "未看车", coin_num: 14, coin_status:"0", shou: '-2'},
				{id: 4, time: "06.28 15:39", image: "../../assets/images/amn-ranking-t.png", name: "实力", status: "已看车", coin_num: 24, coin_status:"1", shou: '+13'},
				{id: 5, time: "06.28 15:39", image: "../../assets/images/amn-ranking-t.png", name: "张三", status: "未看车", coin_num: 34, coin_status:"0", shou: '-9'},
				{id: 6, time: "06.28 15:39", image: "../../assets/images/amn-ranking-t.png", name: "是三十", status: "已看车", coin_num: 44, coin_status:"1", shou: '+23'},
				{id: 7, time: "06.28 15:39", image: "../../assets/images/amn-ranking-t.png", name: "三十", status: "未看车", coin_num: 51, coin_status:"0", shou: '-8'},
				{id: 8, time: "06.28 15:39", image: "../../assets/images/amn-ranking-t.png", name: "请问", status: "未看车", coin_num: 52, coin_status:"1", shou: '+13'},
				{id: 9, time: "06.28 15:39", image: "../../assets/images/amn-ranking-t.png", name: "阿散酸", status: "已看车", coin_num: 53, coin_status:"0", shou: '-5'},
				{id: 10, time: "06.28 15:39", image: "../../assets/images/amn-ranking-t.png", name: "阿斯达", status: "已看车", coin_num: 55, coin_status:"1", shou: '+23'},
				{id: 11, time: "06.28 15:39", image: "../../assets/images/amn-ranking-t.png", name: "同意", status: "未看车", coin_num: 56, coin_status:"0", shou: '-3'},
				{id: 12, time: "06.28 15:39", image: "../../assets/images/amn-ranking-t.png", name: "问题", status: "已看车", coin_num: 58, coin_status:"1", shou: '+10'},
				{id: 13, time: "06.28 15:39", image: "../../assets/images/amn-ranking-t.png", name: "张三", status: "未看车", coin_num: 59, coin_status:"0", shou: '-10'},
				{id: 14, time: "06.28 15:39", image: "../../assets/images/amn-ranking-t.png", name: "玩儿", status: "已看车", coin_num: 554, coin_status:"1", shou: '+10'},
				{id: 15, time: "06.28 15:39", image: "../../assets/images/amn-ranking-t.png", name: "额外", status: "未看车", coin_num: 554, coin_status:"0", shou: '-23'},
				{id: 16, time: "06.28 15:39", image: "../../assets/images/amn-ranking-t.png", name: "问额外人", status: "已看车", coin_num: 554, coin_status:"1", shou: '+53'},
				{id: 17, time: "06.28 15:39", image: "../../assets/images/amn-ranking-t.png", name: "张三", status: "已看车", coin_num: 554, coin_status:"0", shou: '-23'},
				{id: 18, time: "06.28 15:39", image: "../../assets/images/amn-ranking-t.png", name: "were无污染", status: "已看车", coin_num: 554, coin_status:"0", shou: '-23'},
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
		this.getCarcoin()
	},
	initData() {
        this.setData({
            carcoin: {
                items: [],
                params: {
                    page : 1,
                    limit: 20,
                },
                paginate: {}
            }
        })
    },
	getCarcoin() {
		const carcoin = this.data.carcoin
        const params = carcoin.params
		this.ranking.queryAsync(params)
        .then(res => {
            const data = res.data
            carcoin.items = [...carcoin.items, ...data.data.items]
            carcoin.coin_total = data.data.coin_total
            carcoin.paginate = data.data.paginate
            carcoin.params.page = data.data.paginate.next
            carcoin.params.limit = data.data.paginate.perPage
            this.setData({
                carcoin: carcoin, 
            })
        })
	},
    scanCode(e) {
    	App.WxService.scanCode()
    	.then(res => {
            console.log(res)
        })
    },
})
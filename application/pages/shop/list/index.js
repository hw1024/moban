const App = getApp()
Page({
   data: {  
        brands: {
            items: [
                {id: "1", name: "奥迪", remark: "奥迪"},
                {id: "2", name: "宝骏", remark: "宝骏"},
                {id: "3", name: "宝马", remark: "宝马"},
                {id: "4", name: "保时捷", remark: "保时捷"},
                {id: "5", name: "宝沃", remark: "宝沃"},
                {id: "6", name: "奔驰", remark: "奔驰"},
                {id: "1", name: "奥迪", remark: "奥迪"},
                {id: "2", name: "宝骏", remark: "宝骏"},
                {id: "3", name: "宝马", remark: "宝马"},
                {id: "4", name: "保时捷", remark: "保时捷"},
                {id: "5", name: "宝沃", remark: "宝沃"},
                {id: "6", name: "奔驰", remark: "奔驰"},
                {id: "1", name: "奥迪", remark: "奥迪"},
                {id: "2", name: "宝骏", remark: "宝骏"},
                {id: "3", name: "宝马", remark: "宝马"},
                {id: "4", name: "保时捷", remark: "保时捷"},
                {id: "5", name: "宝沃", remark: "宝沃"},
                {id: "6", name: "奔驰", remark: "奔驰"},             
            ]  
        },  
        cars: {
            items: [
                {id: "1", image: "../../../assets/images/amn-book-car.png", series: "奥迪A4L", payment_num: "40000", select_num: "222", shop: "达达4s店", help_num: "32"},
                {id: "2", image: "../../../assets/images/amn-book-car.png", series: "奥迪A4L", payment_num: "50000", select_num: "232", shop: "兴旺4s店", help_num: "312"},
                {id: "3", image: "../../../assets/images/amn-book-car.png", series: "奥迪A4L", payment_num: "60000", select_num: "242", shop: "鑫达4s店", help_num: "322"},
                {id: "4", image: "../../../assets/images/amn-book-car.png", series: "奥迪A4L", payment_num: "70000", select_num: "252", shop: "鑫鑫4s店", help_num: "332"},
                {id: "5", image: "../../../assets/images/amn-book-car.png", series: "奥迪A4L", payment_num: "70000", select_num: "252", shop: "鑫鑫4s店", help_num: "332"},
                {id: "6", image: "../../../assets/images/amn-book-car.png", series: "奥迪A4L", payment_num: "70000", select_num: "252", shop: "鑫鑫4s店", help_num: "332"},
                {id: "7", image: "../../../assets/images/amn-book-car.png", series: "奥迪A4L", payment_num: "70000", select_num: "252", shop: "鑫鑫4s店", help_num: "332"},
                {id: "8", image: "../../../assets/images/amn-book-car.png", series: "奥迪A4L", payment_num: "70000", select_num: "252", shop: "鑫鑫4s店", help_num: "332"},
                {id: "9", image: "../../../assets/images/amn-book-car.png", series: "奥迪A4L", payment_num: "70000", select_num: "252", shop: "鑫鑫4s店", help_num: "332"},
                {id: "10", image: "../../../assets/images/amn-book-car.png", series: "奥迪A4L", payment_num: "70000", select_num: "252", shop: "鑫鑫4s店", help_num: "332"},
            ]
        },  
        showModalStatus: false,
        curIndex: 0,
        offsetTop: 0, 
    },  
    onLoad: function() {
        let that = this
        that.brands = App.HttpResource('/brands/:id', {id: '@id'})
        that.cars = App.HttpResource('/cars/:id', {id: '@id'}) 
        that.getSystemInfo() 
        // that.onRefresh()          
    }, 
    onRefresh() {
        this.getBrands()
        this.initCars()
    },  
    getBrands() {
        const brands = this.data.brands
        this.brands.queryAsync()
        .then(res => {
            const data = res.data
            console.log(data)
            if (data.meta.code == 0) {
                brands.items = [...brands.items, ...data.data.items]
                this.setData({
                    brands: brands, 
                    curIndex: 0, 
                    'cars.params.type': brands.items[0].id, 
                })
                this.getCars()
            }
        })
    },
    switchRightTab(e) {  
        console.log(e) 
        const [id, index, offsetTop, windowHeight] = [e.target.dataset.id, parseInt(e.target.dataset.index), e.target.offsetTop, this.data.windowHeight] 
        if (offsetTop > ((windowHeight)/2)) {
            this.setData({  
                offsetTop: offsetTop- (windowHeight)/2,
            })  
        } else {
            this.setData({  
                offsetTop: 0,
            })  
        } 
        // this.initCars()
        this.setData({  
            curIndex: index,
            'cars.params.type': id,
        })  
        // this.getCars()   
    },
    initCars() {
        const type = this.data.cars.params && this.data.cars.params.type || ''
        const cars = {
            items: [],
            params: {
                page : 1,
                limit: 10,
                type : type,
            },
            paginate: {}
        }
        this.setData({
            cars: cars
        })
    },
    getCars() {
        const [cars, params] = [this.data.cars, cars.params]
        this.cars.queryAsync(params)
        .then(res => {
            const data = res.data
            console.log(data)
            if (data.meta.code == 0) {
                data.data.items.forEach(n => n.thumb_url = App.renderImage(n.images[0] && n.images[0].path))
                cars.items = [...cars.items, ...data.data.items]
                cars.paginate = data.data.paginate
                cars.params.page = data.data.paginate.next
                cars.params.limit = data.data.paginate.perPage
                this.setData({
                    cars: cars,
                    'prompt.hidden': cars.items.length,
                })
            }
        })
    },
    getMoreCars() {
        if (!this.data.cars.paginate.hasNext) return
        this.getCars()
    },
    redirectTo(e) {
        const carId =  e.currentTarget.dataset.id 
        App.WxService.redirectTo('/pages/shop/detail/index', {
            car_id: carId,
        })
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
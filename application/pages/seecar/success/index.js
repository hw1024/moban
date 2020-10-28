const App = getApp()

Page({
    data: {
     	items: {
     		user_phone: "13029107864",
     		employee_name: "张三",
     		see_car_time: "2017-09-27 13:00:00",
     	}
    },
    onLoad() {
        this.getData()
    },
    getData() {
        App.HttpService.getVerificationReturnSeecar()
        .then(res => {
          const data = res.data
          if (data.code == 200) {
            this.setData({
              items: data.data.items
            })
          }
        })
    },
})
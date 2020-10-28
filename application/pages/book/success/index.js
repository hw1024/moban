const App = getApp()

Page({
    data: {
       	items: {
       		store_name: "沈阳鑫达4S店",
          car_id: "15",
       		car_name: "奥迪S52010款",
       		employee_phone: "13029104555",
          locking_time: "30天",
          locking_rise_time: "2017-09-27",
          locking_stop_time: "2017-10-27",
       		pay_time: "2017-09-27 13:00:00",
       	} 
    },
    onLoad() {
      this.getData()
    },
    getData() {
      App.HttpService.getReturnSuccessOrdercar()
      .then(res => {
        const data = res.data
        if (data.code == 200) {
          this.setData({
            items: data.data.items,
          })
        }
      })
    },
    reLaunch(e) {
    	const [index, path] = [e.currentTarget.dataset.index, e.currentTarget.dataset.path]
	    App.WxService.reLaunch(path)
    },
    redirectTo(e) {
      const [index, path] = [e.currentTarget.dataset.index, e.currentTarget.dataset.path]
      App.WxService.redirectTo(path)
    },   
    navigateTo(e) {
      const [index, path] = [e.currentTarget.dataset.index, e.currentTarget.dataset.path]
      App.WxService.navigateTo(path)
    }, 
})
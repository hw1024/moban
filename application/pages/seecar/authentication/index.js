const App = getApp()

Page({
    data: {
        isShowToast: false,
        employee_phone: '',
     	items: {
     		stroe_name: '沈阳鑫达4S店',
     		user_image:  '../../../assets/images/amn-ranking-t.png',
     		user_name: '核心科技',
     		user_phone: '13029107864',
     		car_code: '171853',
     	}
    },
    onLoad() {
        this.getData()
    },
    getData() {
        App.HttpService.getVerificationDetailSeecar()
        .then(res => {
          const data = res.data
          if (data.code == 200) {
            this.setData({
              items: data.data.items
            })
          }
        })
    },
    employeeInput(e) {
        const value = e.detail.value
        this.setData({
            employee_phone : value
        })
    },
    employeeTap() {
        let that = this
        const [employee_phone, car_code] = [that.data.employee_phone, that.data.items.car_code]
        const patrn = /^(0|86|17951)?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
        if (employee_phone != "" && employee_phone != undefined) {
            if (!patrn.exec(employee_phone)) {
                that.setData({ 
                    count: 2500, 
                    toastText: '请输入正确的业务员编码！',
                })
                that.showToast()
                return false
            } 
        } else {
            that.setData({ 
                count: 2500, 
                toastText: '业务员编码不能为空！',
            })
            that.showToast()
            return false
        }
        const params = {
            employee_phone : employee_phone,
            car_code: car_code,
        }
        App.HttpService.postVerificationSeecar(params)
        .then(res => {
            const data = res.data
            if (data.code == 0) {
               App.WxService.navigateTo("/pages/seecar/success/index")
            }
        })
		App.WxService.navigateTo("/pages/seecar/success/index")
    },
    showToast() { 
        var _this = this; 
        _this.data.count = parseInt(_this.data.count) ? parseInt(_this.data.count) : 3000; 
        _this.setData({ 
          isShowToast: true, 
        });  
        setTimeout(function () { 
          _this.setData({ 
            isShowToast: false
          }); 
        }, _this.data.count); 
    }, 
})
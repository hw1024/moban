const App = getApp()

Page({
    data: {
        isShowToast: false,
        showInput: true,
        send_status: true,
        passWord: '',
        telephone : "",
        showDialog: false,
        temData: {
            passWordArr: [],
            passWordNum: [],
            flag : false,
            codeDisable : false, 
            phoneCode : "",
        },
     	items: {
     		see_car_status: 4,
     		see_last_time: "2017.09.27",
     		car_code: "171853",
            qr_code: "../../../assets/images/amn-code.png",
            is_invite: true,
     		user_invite_image : "../../../assets/images/amn-ranking-t.png",
     		user_invite_name: "有车的大哥",
            employee_phone: "13029107864",
     	}
    },
    onLoad() {
        if (App.WxService.getStorageSync('isphone')) {
            this.setData({ 
                showInput: false,
            })
        }
    	this.getData()
    },
    getData() {
	    App.HttpService.getDetailSeecar()
	    .then(res => {
	      const data = res.data
	      if (data.code == 200) {
	        this.setData({
	          items: data.data.items
	        })
	      }
	    })
	},
    sendmobileTap(e) {
        var that = this
        let [telephone, status] = [that.data.telephone, e.currentTarget.dataset.status]
        const patrn = /^(0|86|17951)?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
        if (telephone != "" && telephone != undefined) {
            if (!patrn.exec(telephone)) {
                that.setData({ 
                    count: 2500, 
                    toastText: '请输入正确的手机号！',
                })
                that.showToast()
                return false
            } 
        } else {
            that.setData({ 
                count: 2500, 
                toastText: '手机号不能为空！',
            })
            that.showToast()
            return false
        }
        if (status) { 
            const params = {
                telephone : telephone,
            }
            that.setData({ 
                showDialog: !this.data.showDialog,
                send_status: false,
                'temData.codeDisable' : true, 
                'temData.phoneCode' : 10,
            })
            let time = setInterval(()=>{
                let phoneCode = that.data.temData.phoneCode
                phoneCode --
                that.setData({
                    'temData.phoneCode' : phoneCode
                })
                if(phoneCode == 0){
                    clearInterval(time)
                    that.setData({
                        'temData.codeDisable' : false, 
                        'temData.flag' : true
                    })
                }
            },1000)
            // App.HttpService.addCart(params)
            // .then(res => {
            //     const data = res.data
            //     if (data.meta.code == 0) {
            //         that.setData({ 
            //             showDialog: !this.data.showDialog,
            //             send_status: false,
            //             'temData.codeDisable' : true, 
            //             'temData.phoneCode' : 10,
            //         })
            //         let time = setInterval(()=>{
            //             let phoneCode = that.data.temData.phoneCode
            //             phoneCode --
            //             that.setData({
            //                 'temData.phoneCode' : phoneCode
            //             })
            //             if(phoneCode == 0){
            //                 clearInterval(time)
            //                 that.setData({
            //                     'temData.codeDisable' : false, 
            //                     'temData.flag' : true
            //                 })
            //             }
            //         },1000)
            //     } else {
            //         that.setData({ 
            //             count: 2500,
            //             codeDisable : false, 
            //             toastText: data.meta.respMessage,
            //         })
            //         that.showToast() 
            //     }
            // })
        } else {
            that.setData({ 
                showDialog: !this.data.showDialog,
                send_status: false,
            }) 
        }
    },
    newsendTap(e) {
        var that = this
        let telephone = that.data.telephone
        const params = {
            telephone : telephone,
        }
        // App.HttpService.addCart(params)
        // .then(res => {
        //     const data = res.data
        //     if (data.meta.code == 0) {
        //        that.setData({ 
        //             'temData.flag' : false,
        //             'temData.phoneCode' : 90,
        //             'temData.codeDisable' : true, 
        //         })
        //         let time = setInterval(()=>{
        //             let phoneCode = that.data.temData.phoneCode
        //             phoneCode --
        //             that.setData({
        //                 'temData.phoneCode' : phoneCode
        //             })
        //             if(phoneCode == 0){
        //                 clearInterval(time)
        //                 that.setData({
        //                     'temData.codeDisable' : false, 
        //                     'temData.flag' : true
        //                 })
        //             }
        //         },1000)
        //     } else {
        //         that.setData({ 
        //             count: 2500,
        //             codeDisable : false, 
        //             toastText: data.meta.respMessage,
        //         })
        //         that.showToast() 
        //     }
        // })
        that.setData({ 
            'temData.flag' : false,
            'temData.phoneCode' : 90,
            'temData.codeDisable' : true, 
        })
        let time = setInterval(()=>{
            let phoneCode = that.data.temData.phoneCode
            phoneCode --
            that.setData({
                'temData.phoneCode' : phoneCode
            })
            if(phoneCode == 0){
                clearInterval(time)
                that.setData({
                    'temData.codeDisable' : false, 
                    'temData.flag' : true
                })
            }
        },1000)
    },
    onChangeInput(e) {
        let that = this;
        if (e.detail.value.length > 6) {
          return;
        }
        if (e.detail.value.length > that.data.passWord.length) {
          that.data.temData.passWordArr.push(true);
        } else if (e.detail.value.length < that.data.passWord.length) {
          that.data.temData.passWordArr.pop();
        }
        that.setData({
          passWord: e.detail.value,
          'temData.passWordArr': that.data.temData.passWordArr,
          'temData.passWordNum': [...e.detail.value],
        });
        if (e.detail.value.length == 6) {
            const params = {
                passWord: that.data.passWord
            }
            // App.HttpService.addCart(params)
            // .then(res => {
            //     const data = res.data
            //     if (data.meta.code == 0) {
            //         that.setData({ 
            //             showDialog: !that.data.showDialog,
            //             showInput: false,
            //             toastText: '手机号已发送，业务员会尽快联系您',
            //         })
            //         App.WxService.setStorageSync('isphone', true)
            //         that.showToast() 
            //     } else {
            //         that.setData({ 
            //             count: 2500,
            //             codeDisable : false, 
            //             toastText: data.meta.respMessage,
            //         })
            //         that.showToast() 
            //     }
            // })
            that.setData({ 
                showDialog: !that.data.showDialog,
                showInput: false,
                toastText: '手机号已发送，业务员会尽快联系您',
            })
            App.WxService.setStorageSync('isphone', true)
            that.showToast() 
        }
    },
    bindAppointTap(e) {
        let that = this
        App.WxService.showToast({
            title: '预约成功',
            icon: 'success',
            duration: 2000
        })
        .then(res => {
            that.setData({
              'items.see_car_status': 2, 
            })
        }) 
        // App.HttpService.addCart(params)
        // .then(res => {
        //     const data = res.data
        //     if (data.code == 0) {
        //         App.WxService.showToast({
        //             title: '预约成功',
        //             icon: 'success',
        //             duration: 2000
        //         })
        //         .then(res => {
        //             this.setData({
        //               'items.see_car_status': 2, 
        //             })
        //             setTimeout(function(){
        //               App.WxService.navigateTo('/pages/seecar/index/index')
        //             }, 500) 
        //         }) 
        //     }
        // })
    },
    dialogDelTap(e) {
        this.setData({ 
            showDialog: !this.data.showDialog,
        })
    },
    phoneinput(e) {
        const value = e.detail.value
        this.setData({
            telephone : value
        })
    },
    navigateTo(e) {
		const [index, path] = [e.currentTarget.dataset.index, e.currentTarget.dataset.path]
		App.WxService.navigateTo(path)
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
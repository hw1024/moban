import WxRequest from '../assets/plugins/wx-request/lib/index'

class HttpService extends WxRequest {

    constructor(options) {
        super(options)
        this.$$prefix = ''
        this.$$path = {
            login: '/login',
            store: '/store',
            knowledge: '/knowledge',
            personal: '/personal'
        }
        this.interceptors.use({
            request(request) {
                request.header = request.header || {}
                request.header["content-type"] = "application/x-www-form-urlencoded;charset=UTF-8";
                if (request.url.indexOf('/app_api') !== -1 && wx.getStorageSync('token')) {
                    request.header.Authorization = wx.getStorageSync('token')
                }
                wx.showLoading({
                    title: '加载中',
                })
                return request
            },
            requestError(requestError) {
                wx.hideLoading()
                return Promise.reject(requestError)
            },
            response(response) {
                wx.hideLoading()
                if (response.data.code === 301) {
                    wx.removeStorageSync('token')
                    setTimeout(function () {
                        wx.switchTab({
                            url: "/pages/home/index"
                        });
                    }, 2000)
                }
                return response
            },
            responseError(responseError) {
                wx.hideLoading()
                return Promise.reject(responseError)
            },
        })
    }

    postcheckAuth(params) {
        return this.postRequest(`${this.$$path.login}/passport`, {
            data: params
        })
    }

    postaliConfig(params) {
        return this.postRequest(`${this.$$path.login}/aliConfig`, {
            data: params
        })
    }

    postaddStore(params) {
        return this.postRequest(`${this.$$path.store}/add_store`, {
            data: params
        });
    }

    postEditStore(params) {
        return this.postRequest(`${this.$$path.store}/edit_store`, {
            data: params
        });
    }

    getStoreData(params) {
        return this.getRequest(`${this.$$path.store}/get_store_data`, {
            data: params
        });
    }

    postStoreShare(params) {
        return this.postRequest(`${this.$$path.store}/store_share`, {
            data: params
        });
    }

    postAddKnowledge(params) {
        return this.postRequest(`${this.$$path.knowledge}/add_knowledge`, {
            data: params
        });
    }

    postEditKnowledge(params) {
        return this.postRequest(`${this.$$path.knowledge}/edit_knowledge`, {
            data: params
        })
    }

    postCloseLore(params) {
        return this.postRequest(`${this.$$path.knowledge}/close_lore`, {
            data: params
        })
    }

    postLoreShare(params) {
        return this.postRequest(`${this.$$path.knowledge}/lore_share`, {
            data: params
        })
    }

    postnumberAdd(params) {
        return this.postRequest(`${this.$$path.knowledge}/number_add`, {
            data: params
        })
    }

    postrecordUpload(params) {
        return this.postRequest(`${this.$$path.knowledge}/recordUpload`, {
            data: params
        })
    }

    postdelUpload(params) {
        return this.postRequest(`${this.$$path.knowledge}/del_upload`, {
            data: params
        })
    }

    postIdVerification(params) {
        return this.postRequest(`${this.$$path.knowledge}/id_verification`, {
            data: params
        });
    }

    postSetUp(params) {
        return this.postRequest(`${this.$$path.knowledge}/set_up`, {
            data: params,
        })
    }

    getLoreData(params) {
        return this.postRequest(`${this.$$path.knowledge}/get_lore_data`, {
            data: params
        })
    }

    getUidLogData() {
        return this.getRequest(`${this.$$path.knowledge}/get_uid_log_data`)
    }

    postAddLoreLog(params) {
        return this.postRequest(`${this.$$path.knowledge}/add_lore_log`, {
            data: params
        })
    }

    postLorePay(params) {
        return this.postRequest(`${this.$$path.knowledge}/lore_pay`, {
            data: params
        })
    }

    getMyhomepage() {
        return this.getRequest(`${this.$$path.personal}/my_home_page`)
    }

    getOwnedKnowledge(params) {
        return this.getRequest(`${this.$$path.personal}/ownedKnowledge`, {
            data: params
        })
    }

    getMyProfit() {
        return this.getRequest(`${this.$$path.personal}/myProfit`)
    }

    getRealname() {
        return this.getRequest(`${this.$$path.personal}/get_realname`)
    }

    getProfitDetail(params) {
        return this.getRequest(`${this.$$path.personal}/profitDetail`, {
            data: params
        })
    }

    postCashApply(params) {
        return this.postRequest(`${this.$$path.personal}/cashApply`, {
            data: params
        })
    }

    getBrowseStroe(params) {
        return this.getRequest(`${this.$$path.personal}/browseStroe`, {
            data: params
        })
    } 

    getKnowledgeDetail(params) {
        return this.getRequest(`${this.$$path.personal}/knowledgeDetail`, {
            data: params
        })
    }

    getKnowledgeDetails(params) {
        return this.getRequest(`${this.$$path.personal}/knowledgeDetails`, {
            data: params
        })
    }

    getConfirmPayment(params) {
        return this.getRequest(`${this.$$path.personal}/confirmPayment`, {
            data: params
        })
    }

    postShare(params) {
        return this.postRequest(`${this.$$path.personal}/share`, {
            data: params
        })
    }

}

export default HttpService
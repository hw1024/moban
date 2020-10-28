const util = require('../utils/util.js');
/**
 * 调用微信登录
 */
const loginByWeixin = (that)=> {
	let code = null;
	return new Promise(function (resolve, reject) {
	  return util.login().then((res) => {
	    code = res.code;
	    return util.getUserInfo();
	  }).then((userInfo) => {
			//登录远程服务器
			const params = { code: code, encryptedData: userInfo.encryptedData, iv: userInfo.iv };
			that.HttpService.postcheckAuth(params).then(res => {
				const data = res.data;
				if (data.code == 200) {
          that.WxService.setStorageSync("userInfo", data.data.userInfo);
          that.WxService.setStorageSync("token", data.data.token);
          resolve(res);
        } else {
          reject(res);
        }		
      });
	  }).catch((err) => {
	    reject(err);
	  })
	});
}

/**
 * 判断用户是否登录
 */
const checkLogin = ()=> {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      util.checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });

    } else {
      reject(false);
    }
  });
}

module.exports = {
  loginByWeixin,
  checkLogin,
};
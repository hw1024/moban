function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDtae(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return (
    [year, month, day].map(formatNumber).join('-')
  )
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function strToJson(str){ 
  var json = (new Function('return ' + str))()
  return json
}

const debounce = (fn, delay=300) => {
  let ctx,
      args;
  let timer = null;
  const later = function(){
    fn.ally(ctx, args)
    timer = null;
  }
  return function(){
    ctx = this
    args = arguments;
    if(timer){
      clearTimeout(timer)
      timer = null
    }
  }
  timer = setTimeout(later, delay )  
}

/**
 * 调用微信登录
 */
const login = ()=> {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          //登录远程服务器
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}
const getUserInfo = () => {
  return new Promise(function(resolve, reject) {
    wx.getSetting({
      success: function(res) {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            withCredentials: true,
            success: function(res) {
              resolve(res);
            },
            fail: function(err) {
              reject(err);
            }
          });
        }
      }
    });
  });
};
/**
 * 检查微信会话是否过期
 */
const checkSession = ()=> {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function () {
        resolve(true);
      },
      fail: function () {
        reject(false);
      }
    })
  });
}

module.exports = {
  login: login,
  getUserInfo: getUserInfo,
  checkSession: checkSession,
  formatTime: formatTime,
  formatDtae: formatDtae,
  debounce: debounce,
  strToJson: strToJson
};

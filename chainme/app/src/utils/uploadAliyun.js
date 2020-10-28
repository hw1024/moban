//const env = require('../aliyu/env.js')
const Base64 = require('../aliyu/Base64.js')
require('../aliyu/crypto/hmac.js')
require('../aliyu/crypto/sha1.js')
const Crypto = require('../aliyu/crypto/crypto.js')
const uploadFile = function (params) {
    //const aliyunFileKey = dir+filePath.replace('wxfile://', '')；
    
    const aliyunFileName = formatTimes(new Date()) + lengthNum(params.uid, 12) + params.status + count() + '.' + params.type
    const aliyunFileKey = params.dir + "" + aliyunFileName
    params.that.HttpService.postaliConfig().then(res => {
        const data = res.data
        const aliyunServerURL = 'https://' + data.data.SIGIN_OSS_URL
        const accessid = data.data.AccessKeyId
        const policyBase64 = getPolicyBase64(87600)
        const signature = getSignature(policyBase64, data.data.OSS_ACCESS_KEY)
        wx.uploadFile({
            url: aliyunServerURL,
            filePath: params.filePath,
            name: 'file',
            formData: {
                'key': aliyunFileKey,
                'OSSAccessKeyId': accessid,
                'policy': policyBase64,
                'Signature': signature,
                'success_action_status': '200'
            },
            success: function (res) {
                if (res.statusCode != 200) {
                    params.fail(new Error("上传错误:" + JSON.stringify(res)))
                    return
                }
                console.log('上传成功', res)
                params.success(aliyunFileKey, aliyunFileName)
            },
            fail: function (err) {
                err.wxaddinfo = aliyunServerURL
                params.fail(err)
            }
        })
    })
    // const aliyunServerURL = env.uploadImageUrl
    // const accessid = env.OSSAccessKeyId

}

const getPolicyBase64 = function (timeout) {
    let date = new Date()
    date.setHours(date.getHours() + timeout)
    let srcT = date.toISOString()
    const policyText = {
        "expiration": srcT, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了 指定了Post请求必须发生在2020年01月01日12点之前("2020-01-01T12:00:00.000Z")。
        "conditions": [
            ["content-length-range", 0, 20 * 1024 * 1024] // 设置上传文件的大小限制,1048576000=1000mb
        ]
    };

    const policyBase64 = Base64.encode(JSON.stringify(policyText));
    return policyBase64;
}

const getSignature = function (policyBase64, accessKeySecret) {
    const accesskey = accessKeySecret
    const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
        asBytes: true
    })
    
    const signature = Crypto.util.bytesToBase64(bytes);

    return signature;
}

const formatTimes = function(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return ([year, month, day].map(formatNumber).join('') + '' + [hour, minute, second].map(formatNumber).join(''))
}

const formatNumber = function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const count = function () {
    var i = Math.random() * (99999999 - 10000000) + 10000000
    var j = parseInt(i, 10)
    return j
}

const lengthNum = function(num, length) {
    return (Array(length).join('0') + num).slice(-length)
}

module.exports = uploadFile;
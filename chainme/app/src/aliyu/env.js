var fileHost = "https://chainme-dev.oss-cn-beijing.aliyuncs.com";
var config = {
    uploadImageUrl: `${fileHost}`, //默认存在根目录，可根据需求改
    AccessKeySecret: 'VcMeYHsJt9eTGuUb2Z0fih4y6vd8b9',
    OSSAccessKeyId: 'LTAIu8NAmADKsSJy',
    timeout: 87600 //这个是上传文件时Policy的失效时间
}
module.exports = config

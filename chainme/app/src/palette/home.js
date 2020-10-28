// 答题分享样式
export default class LastMayday {
  homeInfo = {}

  do(homeInfo) {
    this.homeInfo = JSON.parse(JSON.stringify(homeInfo))
    return this._template()
  }

  TEXT_SMALL = {
    fontSize: '24rpx'
  };

  _template() {
    return {
      background: '#ffffff',
      width: '630rpx',
      height: '839rpx',
      borderRadius: '20rpx',
      views: [
        {
          type: 'image',
          url: this.homeInfo.bgUrl,
          css: {
            top: '0rpx',
            left: '0rpx',
            width: '630rpx',
            height: '839rpx',
            borderRadius: '20rpx'
          }
        },
        {
          type: 'image',
          url: this.homeInfo.avatarUrl,
          css: {
            top: '105rpx',
            left: '243rpx',
            width: '144rpx',
            height: '144rpx',
            borderRadius: '144rpx'
          }
        },
        {
          type: 'text',
          text: this.homeInfo.nickName,
          css: {
            left: '315rpx',
            top: '266rpx',
            color: '#333333',
            fontSize: '32rpx',
            align: 'center',
            lineHeight: '45rpx'
          }
        },
        {
          type: 'text',
          text: this.homeInfo.shopName,
          css: {
            left: '315rpx',
            top: '336rpx',
            color: '#333333',
            align: 'center',
            fontSize: '44rpx',
            lineHeight: '62rpx'
          }
        },
        {
          type: 'text',
          text: '链我-知识小店',
          css: {
            left: '48rpx',
            top: '530rpx',
            color: '#333333',
            fontSize: '38rpx',
            lineHeight: '53rpx'
          }
        },
        {
          type: 'rect',
          css: {
            left: '48rpx',
            top: '590rpx',
            width: '242rpx',
            height: '2rpx',
            color: '#F5A623'
          }
        },
        {
          type: 'text',
          text: '创作知识',
          css: {
            left: '48rpx',
            top: '599rpx',
            color: '#333333',
            fontSize: '29rpx',
            lineHeight: '41rpx'
          }
        },
        {
          type: 'text',
          text: '收获价值',
          css: {
            left: '175rpx',
            top: '599rpx',
            color: '#333333',
            fontSize: '29rpx',
            lineHeight: '41rpx'
          }
        },
        {
          type: 'image',
          url: this.homeInfo.code,
          css: {
            top: '508rpx',
            left: '387rpx',
            width: '185rpx',
            height: '185rpx'
          }
        }
      ]
    }
  }
}

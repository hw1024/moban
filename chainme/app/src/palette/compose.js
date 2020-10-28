
export default class LastMayday {
  composeInfo = {}

  do(composeInfo) {
    this.composeInfo = JSON.parse(JSON.stringify(composeInfo))
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
          url: this.composeInfo.bgUrl,
          css: {
            top: '0rpx',
            left: '0rpx',
            width: '630rpx',
            height: '590rpx',
          }
        },
        {
          type: 'image',
          url: this.composeInfo.avatarUrl,
          css: {
            top: '606rpx',
            left: '54rpx',
            width: '70rpx',
            height: '70rpx',
            borderRadius: '70rpx'
          }
        },
        {
          type: 'text',
          text: this.composeInfo.nickName,
          css: {
            left: '137rpx',
            top: '621rpx',
            color: '#333333',
            fontSize: '28rpx',
            lineHeight: '40rpx'
          }
        },
        {
          type: 'text',
          text: '发布了 ',
          css: {
            left: '208rpx',
            top: '621rpx',
            color: '#333333',
            fontSize: '28rpx',
            lineHeight: '40rpx'
          }
        },
        {
          type: 'text',
          text: this.composeInfo.title,
          css: {
            left: '48rpx',
            top: '700rpx',
            color: '#333333',
            fontSize: '28rpx',
            lineHeight: '40rpx'
          }
        },
        {
          type: 'rect',
          css: {
            left: '48rpx',
            top: '751rpx',
            width: '320rpx',
            height: '2rpx',
            color: '#F5A623'
          }
        },
        {
          type: 'text',
          text: '微信中长按识别小程序',
          css: {
            left: '48rpx',
            top: '769rpx',
            color: '#666666',
            fontSize: '28rpx',
            lineHeight: '40rpx'
          }
        },
        {
          type: 'image',
          url: this.composeInfo.code,
          css: {
            top: '661rpx',
            left: '430rpx',
            width: '150rpx',
            height: '150rpx'
          }
        }
      ]
    }
  }
}

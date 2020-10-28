import Downloader from './downloader';

const downloader = new Downloader();
const QR = require('./qrcode');

export default class Painter {
  constructor(ctx, data) {
    this.ctx = ctx;
    this.data = data;
  }

  paint(callback) {
    this.style = {
      width: this.data.width.toPx(),
      height: this.data.height.toPx(),
    };
    this._background();
    for (const view of this.data.views) {
      this._drawAbsolute(view);
    }
    this.ctx.draw(false, () => {
      callback();
    });
  }

  _background() {
    this.ctx.save();
    const {
      width,
      height
    } = this.style;
    const bg = this.data.background;
    this.ctx.translate(width / 2, height / 2);

    this._doBorder(this.data.borderRadius, width, height);
    if (!bg) {
      // 如果未设置背景，则默认使用白色
      this.ctx.setFillStyle('#fff');
      this.ctx.fillRect(-(width / 2), -(height / 2), width, height);
    } else if (bg.startsWith('#') || bg.startsWith('rgba')) {
      // 背景填充颜色
      this.ctx.setFillStyle(bg);
      this.ctx.fillRect(-(width / 2), -(height / 2), width, height);
    } else {
      // 背景填充图片
      this.ctx.drawImage(bg, -(width / 2), -(height / 2), width, height);
    }
    this.ctx.restore();
  }

  _drawAbsolute(view) {
    // 证明 css 为数组形式，需要合并
    if (view.css.length) {
      /* eslint-disable no-param-reassign */
      view.css = Object.assign(...view.css);
    }
    switch (view.type) {
      case 'image':
        this._drawAbsImage(view);
        break;
      case 'text':
        this._fillAbsText(view);
        break;
      case 'rect':
        this._drawAbsRect(view);
        break;
      case 'qrcode':
        this._drawQRCode(view);
        break;
      default:
        break;
    }
  }

  _doBorder(borderRadius, width, height) {
    if (borderRadius && width && height) {
      const r = Math.min(borderRadius.toPx(), width / 2, height / 2);

      this.ctx.beginPath();
      this.ctx.arc(-width / 2 + r, -height / 2 + r, r, 1 * Math.PI, 1.5 * Math.PI);
      this.ctx.lineTo(width / 2 - r, -height / 2);
      this.ctx.arc(width / 2 - r, -height / 2 + r, r, 1.5 * Math.PI, 2 * Math.PI);
      this.ctx.lineTo(width / 2, height / 2 - r);
      this.ctx.arc(width / 2 - r, height / 2 - r, r, 0, 0.5 * Math.PI);
      this.ctx.lineTo(-width / 2 + r, height / 2);
      this.ctx.arc(-width / 2 + r, height / 2 - r, r, 0.5 * Math.PI, 1 * Math.PI);
      this.ctx.closePath();
      this.ctx.strokeStyle = "#ffffff";
      this.ctx.stroke();
      // 在 ios 的 6.6.6 版本上 clip 有 bug，禁掉此类型上的 clip，也就意味着，在此版本微信的 ios 设备下无法使用 border 属性
      if (!(getApp().systemInfo &&
          getApp().systemInfo.version <= '6.6.6' &&
          getApp().systemInfo.platform === 'ios')) {
        this.ctx.clip();
      }
    }
  }

  _preProcess(view) {
    let width;
    let height;
    let x;
    let y;
    if (view.type === 'text') {
      this.ctx.setFillStyle(view.css.color ? view.css.color : 'black');
      this.ctx.setFontSize(view.css.fontSize.toPx());
      width = this.ctx.measureText(view.text).width;
      height = view.css.fontSize.toPx();
      x = view.css.right ? this.style.width - width - view.css.right.toPx() : (view.css.left ? view.css.left.toPx() : 0);
      y = view.css.bottom ? this.style.height - height - view.css.bottom.toPx() : (view.css.top ? view.css.top.toPx() : 0);
      if (view.cutWidth) {
        var lineWidth = 0;
        var lastSubStrIndex = 0;
        for (let i = 0; i < view.text.length; i++) {
          lineWidth += this.ctx.measureText(view.text[i]).width;
          if (lineWidth > view.cutWidth.toPx() - x) {
            this.ctx.fillText(view.text.substring(lastSubStrIndex, i), x, y);
            y += view.css.lineHeight.toPx() + 2;
            lineWidth = 0;
            lastSubStrIndex = i;
          }
          if (i == view.text.length - 1) {
            this.ctx.fillText(view.text.substring(lastSubStrIndex, i + 1), x, y);
          }
        }
      }
    } else {
      width = view.css.width.toPx();
      height = view.css.height.toPx();
      x = view.css.right ? this.style.width - width - view.css.right.toPx() : (view.css.left ? view.css.left.toPx() : 0);
      y = view.css.bottom ? this.style.height - height - view.css.bottom.toPx() : (view.css.top ? view.css.top.toPx() : 0);
    }
    const angle = view.css.rotate ? this._getAngle(view.css.rotate) : 0;
    const align = view.css.align ? view.css.align : 'left';
    switch (align) {
      case 'center':
        this.ctx.translate(x, y + height / 2);
        break;
      case "right":
        this.ctx.translate(x - width / 2, y + height / 2);
        break;
      default:
        this.ctx.translate(x + width / 2, y + height / 2);
        break;
    }
    this.ctx.rotate(angle);
    this._doBorder(view.css.borderRadius, width, height);

    return {
      width: width,
      height: height,
      x: x,
      y: y,
    };
  }

  _drawQRCode(view) {
    this.ctx.save();
    const {
      width,
      height,
    } = this._preProcess(view);
    QR.api.draw(view.content, this.ctx, -width / 2, -height / 2, width, height, view.css.background);
    this.ctx.restore();
  }

  _drawAbsImage(view) {
    if (!view.url) {
      return;
    }
    this.ctx.save();
    const {
      width,
      height,
    } = this._preProcess(view);
    this.ctx.drawImage(view.url, -(width / 2), -(height / 2), width, height);
    this.ctx.restore();
  }

  _fillAbsText(view) {
    if (!view.text) {
      return;
    }
    this.ctx.save();
    const {
      width,
      height,
    } = this._preProcess(view);
    if (!view.cutWidth) {
      this.ctx.fillText(view.text, -(width / 2), (height / 2));
    }
    this.ctx.restore();
  }

  _drawAbsRect(view) {
    this.ctx.save();
    const {
      width,
      height,
    } = this._preProcess(view);
    this.ctx.setFillStyle(view.css.color);
    this.ctx.fillRect(-(width / 2), -(height / 2), width, height);
    this.ctx.restore();
  }

  _getAngle(angle) {
    return Number(angle) * Math.PI / 180;
  }

  _canvasTextAutoLine(str,ctx,initX,initY,lineHeight, cutWidth) {
    var lineWidth = 0;
    var lastSubStrIndex = 0;
    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width;
      if (lineWidth > cutWidth - initX) {
        //减去initX,防止边界出现的问题
        ctx.fillText(str.substring(lastSubStrIndex, i), initX, initY);
        initY += lineHeight;
        lineWidth = 0;
        lastSubStrIndex = i;
      }
      if (i == str.length - 1) {
        ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY);
      }
    }
  }
}
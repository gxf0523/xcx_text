// /components/poster/poster.js
var storage = require('../../utils/storage.js');
Component({
  properties: {
    posterParams: {
      type: Object
    },
    cacheKey: {
      type: String,
      value: 'cache-poster'
    },
    disableCache: {
      type: Boolean,
      value: false
    }
  },
  data: {
    posterImage: '',
    isShowCanvas: false
  },
  methods: {
    previewImage(url) {
      wx.previewImage({
        urls: [url]
      })
    },
    // 绘制 canvas
    canvasToDraw() {
      return new Promise((resolve, reject) => {
        const [ctx, canvasId] = this.createCanvasContext()
        const { width, height, backgroundImageUrl, backgroundColor } =
          this.properties.posterParams
        if (backgroundColor) {
          this.canvasToDrawBlock(ctx, {
            x: 0,
            y: 0,
            width,
            height,
            backgroundColor
          })
          
        }

        // 绘制背景图
        if (backgroundImageUrl) {
          const { path: tempBackgroundImageUrl } =
            this.uniGetImageInfoSync(backgroundImageUrl)
          ctx.drawImage(tempBackgroundImageUrl, 0, 0, width, height)
        }

        // 绘制其他元素
        for (const canvasParam of this.properties.posterParams.list) {
          const { type } = canvasParam
          if (type === 'text') {
            this.canvasToDrawText(ctx, canvasParam)
          }

          if (type === 'block') {
            this.canvasToDrawBlock(ctx, canvasParam)
          }
        }

        ctx.draw(false, async () => {
          const { tempFilePath } = await this.canvasToTempFilePath(canvasId, {})
          resolve([canvasId, tempFilePath])
        })
      })
    },
    // canvas 导出图片临时地址
    canvasToTempFilePath(canvasId, params) {
      return new Promise((resolve, reject) => {
        wx.canvasToTempFilePath(
          {
            canvasId,
            fileType: 'jpg',
            ...params,
            success: resolve,
            fail: reject
          },
          this
        )
      })
    },
    // 创建 canvas
    createCanvasContext() {
      const ctx = wx.createCanvasContext('poster-canvas', this)
      return [ctx, 'poster-canvas']
    },
    // 获取图片信息（主要用于把远程 url转为微信临时文件以绘制图片）
    uniGetImageInfoSync(url) {
      var promise = new Promise((resolve, reject) => {
        wx.getImageInfo({
          src: url,
          success: res=>{
            console.log(res)
            resolve(res)
          },
          fail: res => {
            reject(res);
          }
        })
      })
      return promise;
    },
    //绘制文字
    canvasToDrawText(ctx, canvasParam) {
      const {
        x,
        y,
        text,
        fontWeight = 'normal',
        fontSize = 40,
        lineHeight,
        maxWidth,
        textAlign = 'left',
        color = '#323233'
      } = canvasParam

      if (typeof text !== 'string') {
        return
      }

      ctx.font = `normal ${fontWeight} ${fontSize}px sans-serif`

      ctx.setFillStyle(color)
      ctx.textBaseline = 'middle'
      ctx.setTextAlign(textAlign)

      function drawLineText(lineText, __y) {
        let __lineText = lineText
        if (__lineText[0] === ' ') {
          __lineText = __lineText.substr(1)
        }
        ctx.fillText(__lineText, x, __y + fontSize / 2)
      }

      if (maxWidth) {
        const arrayText = text.split('')

        let lineText = ''
        let __y = y
        for (let index = 0; index < arrayText.length; index++) {
          const aryTextItem = arrayText[index]
          lineText += aryTextItem
          /**
           * 1. 计算当前文字加下一个文字的文本宽度
           * 2. 当文本宽度大于最大宽度时, 在画布上绘制被填充的文本
           * 3. __y + fontSize / 2 的问题
           * 4. 设置下一行文本的 y轴位置, 重置当前文本信息
           */
          const { width: textMetrics } = ctx.measureText(
            lineText + (arrayText[index + 1] || '')
          )
          if (textMetrics > maxWidth) {
            // 绘制一行文字, 如果第一个文字是空格，则删除
            drawLineText(lineText, __y)
            __y += lineHeight || fontSize
            lineText = ''
          }
        }
        // 绘制最后一行文字, 如果第一个文字是空格，则删除
        drawLineText(lineText, __y)
        return
      }
      ctx.fillText(text, x, y + fontSize / 2)
    },
    // 绘制块元素
    canvasToDrawBlock(ctx, params) {
      return new Promise((resolve,reject) => {
        const {
          x,
          y,
          url,
          width,
          height,
          radius,
          border,
          borderColor,
          backgroundColor
        } = params
        if (border) {
          ctx.setFillStyle(borderColor || '#fff')
          this.canvasToDrawArcRectPath(
            ctx,
            x - border,
            y - border,
            width + border * 2,
            height + border * 2,
            radius
          )
          ctx.fill()
        }
        if (backgroundColor) {
          ctx.setFillStyle(backgroundColor)
          this.canvasToDrawArcRectPath(ctx, x, y, width, height, radius)
          ctx.fill()
        }

        if (url) {
          ctx.save()

          this.canvasToDrawArcRectPath(ctx, x, y, width, height, radius)

          ctx.clip()
          console.log(this.uniGetImageInfoSync(url))

          const { path: tempImageUrl } = this.uniGetImageInfoSync(url)
          
          console.log('3333',tempImageUrl, x, y, width, height)
          ctx.drawImage(tempImageUrl, x, y, width, height)
        }

        ctx.restore()
        resolve()
      })
    },
    // 绘制弧矩形路径
    canvasToDrawArcRectPath(ctx, x, y, w, h, r = 0) {
      const [
        topLeftRadius,
        topRightRadius,
        bottomRightRadius,
        BottomLeftRadius
      ] = Array.isArray(r) ? r : [r, r, r, r]
      /**
       * 1. 移动到圆弧起点
       *
       * 2. 绘制上直线
       * 3. 绘制右上角圆弧
       *
       * 4. 绘制右直线
       * 5. 绘制右下圆弧
       *
       * 6. 绘制下直线
       * 7. 绘制左下圆弧
       *
       * 8. 绘制左直线
       * 9. 绘制左上圆弧
       */
      ctx.beginPath()

      ctx.moveTo(x + topLeftRadius, y)

      // 右上
      ctx.lineTo(x + w - topRightRadius, y)
      ctx.arcTo(x + w, y, x + w, y + topRightRadius, topRightRadius)

      // 右下
      ctx.lineTo(x + w, y + h - bottomRightRadius)
      ctx.arcTo(
        x + w,
        y + h,
        x + w - bottomRightRadius,
        y + h,
        bottomRightRadius
      )

      // 左下
      ctx.lineTo(x + BottomLeftRadius, y + h)
      ctx.arcTo(x, y + h, x, y + h - BottomLeftRadius, BottomLeftRadius)

      // 左上
      ctx.lineTo(x, y + topLeftRadius)
      ctx.arcTo(x, y, x + topLeftRadius, y, topLeftRadius)

      ctx.closePath()
    },
    saveImageToPhotosAlbum() {
      wx.saveImageToPhotosAlbum({
        filePath: this.posterImage,
        success: () => {
          this.$emit('close-overlay')
          wx.showToast({
            title: '保存图片成功',
            duration: 2000
          })
        },
        fail(err) {
          const { errMsg } = err
          if (errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
            wx.showModal({
              title: '保存失败',
              content: '请授权保存图片到“相册”的权限',
              success: (result) => {
                const { confirm } = result
                if (confirm) {
                  wx.openSetting({})
                }
              }
            })
          }
        }
      })
    }
  },
  lifetimes: {
    attached: function () { 
      console.log(this.properties.posterParams)
      console.log(this.canvasToDraw())
      const posterImage = storage.get(this.data.cacheKey)
      if (posterImage && !this.data.disableCache) {
        this.setData({
          posterImage
        })
        return
      }
      wx.showLoading({
        title: '加载中...',
        mask: true
      })

      this.data.isShowCanvas = true
      
      const [tempCanvasFilePaths] = this.canvasToDraw();
      const fs = wx.getFileSystemManager();
      fs.saveFile({
        tempFilePath: tempCanvasFilePaths, // 传入一个本地临时文件路径
        success: (res) => {
          storage.set(this.cacheKey, res.savedFilePath, 86400000)
          this.posterImage = res.savedFilePath
        }
      })

      wx.hideLoading()
    }
  }
})
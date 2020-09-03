// pages/canvas/canvas.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 第一种仅仅显示生成二维码
    codeimg: "",
    // 默认虚拟数据
    cardBase: {
      //需要https图片路径,下载到本地然后去绘制
      cardbg: "https://7265-redux-32ab9a-1259022487.tcb.qcloud.la/image/222.jpg",
      // 二维码
      codeImg: "https://7265-redux-32ab9a-1259022487.tcb.qcloud.la/image/111.png",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // that.getAvaterInfo()
    var cardBase=that.data.cardBase;
    that.getCanvas(cardBase.cardbg, cardBase.codeImg);
  },
  /**
   * 先下载海报背景
   */
  getAvaterInfo: function() {
    wx.showLoading({
      title: '生成中...',
      mask: true,
    });
    var that = this;
    wx.downloadFile({
      url: that.data.cardBase.cardbg, 
      success: function(res) {
        wx.hideLoading();
        if (res.statusCode === 200) {
          //download下载成功返回结果res.tempFilePath
          var cardbg = res.tempFilePath; 
          that.getQrCode(cardbg); 
        } else {
          wx.showToast({
            title: '亲,海报下载失败！',
            icon: 'none',
            duration: 2000,
            success: function() {
              var cardbg = "";
              that.getQrCode(cardbg);
            }
          })
        }
      }
    })
  },
 
  /**
   * 下载二维码图片
   */
  getQrCode: function (cardbg) {
    wx.showLoading({
      title: '生成中...',
      mask: true,
    });
    var that = this;
    wx.downloadFile({
      url: that.data.cardInfo.codeImg,
      success: function(res) {
        wx.hideLoading();
        if (res.statusCode === 200) {
          var codeImg = res.tempFilePath;
          that.getCanvas(cardbg, codeImg);
        } else {
          wx.showToast({
            title: '二维码下载失败！',
            icon: 'none',
            duration: 2000,
            success: function() {
              var codeImg = "";
              that.getCanvas(cardbg, codeImg);
            }
          })
        }
      }
    })
  },
 
  /**
   * 开始用canvas绘制分享海报
   * @param cardbg 下载的海报背景图路径
   * @param codeImg   下载的二维码图片路径
   */
  getCanvas: function (cardbg, codeImg) {
    wx.showLoading({
      title: '正在生成中...',
      mask: true,
    })
    var that = this;
    var cardBase = that.data.cardBase; //需要绘制的数据集合
    const ctx = wx.createCanvasContext('myCanvas'); //创建画布
    var width = "";
    wx.createSelectorQuery().select('#canvas-container').boundingClientRect(function(rect) {
      var height = rect.height;
      var right = rect.right;
      width = rect.width * 0.8;
      var left = rect.left + 5;
      ctx.setFillStyle('#fff');
      ctx.fillRect(0, 0, rect.width, height);
      // 这里处理自适应
      let rpx = 1;
      wx.getSystemInfo({
        success(res) {
          rpx = res.windowWidth / 375;
        },
      })
 
      //背景图
      if (cardbg) {
        ctx.drawImage(cardbg, 20*rpx,20*rpx, 260*rpx,460*rpx);
      }
    // 标题
      ctx.setFontSize(14);
      ctx.setFillStyle('#000');
      ctx.setTextAlign('left');
      ctx.fillText("菜鸟老五", 35 * rpx, 355 * rpx, 100 * rpx, 100 * rpx); //姓名
      // 标题
      ctx.setFontSize(15);
      ctx.setFillStyle('#000');
      ctx.setTextAlign('left');
      ctx.fillText("前端/小程序开发", 35 * rpx, 385 * rpx, 100 * rpx, 100 * rpx); //姓名
      // 标题
      ctx.setFontSize(15);
      ctx.setFillStyle('#000');
      ctx.setTextAlign('left');
      ctx.fillText("微信号:qq287534291", 35 * rpx, 415 * rpx, 100 * rpx, 100 * rpx); //姓名
      //  绘制二维码
      if (codeImg) {
        ctx.drawImage(codeImg, 165 * rpx, 320 * rpx, 100 * rpx, 100 * rpx)
      }
 
    }).exec()
 
    setTimeout(function() {
      ctx.draw();
      wx.hideLoading();
    }, 1000)
 
  },
 
  //点击保存到相册
  saveShareImg: function() {
    var that = this;
    wx.showLoading({
      title: '正在保存',
      mask: true,
    })
    setTimeout(function() {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function(res) {
          console.info("res", res);
          wx.hideLoading();
          var tempFilePath = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              console.info(res);
              wx.showModal({
                content: '图片已保存到相册，赶紧晒一下吧~',
                showCancel: false,
                confirmText: '好的',
                confirmColor: '#333',
                success: function(res) {
                  if (res.confirm) {}
                },
                fail: function(res) {}
              })
            },
            fail: function(res) {
              console.log(res)
              if (res.errMsg === "saveImageToPhotosAlbum:fail:auth denied") {
                console.log("打开设置窗口");
                wx.openSetting({
                  success(settingdata) {
                    console.log(settingdata)
                    if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                      console.log("获取权限成功，再次点击图片保存到相册")
                    } else {
                      console.log("获取权限失败")
                    }
                  }
                })
              }
            }
          })
        }
      });
    }, 1000);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
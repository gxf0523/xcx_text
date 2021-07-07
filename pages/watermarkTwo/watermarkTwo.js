// pages/watermarkTwo/watermarkTwo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backgroundImg:'',
    pixelRatio:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.waterRemark();
  },
  transToBase64({url, type = 'png'}){
    return new Promise((resolve, reject)=>{
      wx.getFileSystemManager().readFile({
        filePath:url,
        encoding:'base64',
        success:res=>{
          resolve('data:image/' + type.toLocaleLowerCase() + ';base64,' + res.data)
        },
        fail:res=>reject(res.errMsg)
      })
    })
  },
  waterRemark(drawTitle='gaoyuanyuan',drawTime='2021-07-07:11:55:56'){
    var that = this;
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          pixelRatio:res.pixelRatio
        })
      },
    })
    const ctx = wx.createCanvasContext('watermarkCanvas');
    ctx.rotate(10*Math.PI/180);
    ctx.setFontSize(12);
    ctx.setFillStyle('rgba(188,188,188,0.8)');
    ctx.fillText(`水印标题：${drawTitle}`,20,10);
    ctx.setFontSize(12);
    ctx.setFillStyle('rgba(188,188,188,0.8)');
    ctx.fillText(drawTime,10,25);
    ctx.draw();
    setTimeout(()=>{
      console.log('1')
      wx.canvasToTempFilePath({
        x:0,
        y:0,
        width:130,
        height:90,
        // destHeight:90*that.data.pixelRatio,
        // destWidth:130*that.data.pixelRatio,
        canvasId: 'watermarkCanvas',
        success:(res)=>{
          console.log(res)
          var fileManager = wx.getFileSystemManager();
          fileManager.saveFile({
            tempFilePath:res.tempFilePath,
            success:res =>{
              this.transToBase64({url:res.savedFilePath}).then(res2=>{
                console.log(res2)
                this.setData({backgroundImg:res2});
              })
            }
          })
        }
      })
    },1000)
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
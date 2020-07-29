// picture/mediapicture/mediapicture.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo: null,
    pics: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  chooseImageTap: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],//下面显示的数组是拍照还是别的
      itemColor: "#f7982a",//显示文字的颜色
      success: function (res) {
        if (!res.cancel) {//选中判断
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })
  },
  // 绘制图片到canvas上
  chooseWxImage: function (type) {
    const ctx = wx.createCanvasContext('myCanvas')//画布
    var that = this;
    wx.chooseImage({//上传图片事件
      count: 9,//数量
      sizeType: ['original', 'compressed'],//original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        console.log(res)
        ctx.drawImage(res.tempFilePaths[0], 0, 0, 100, 100)//成功选定第一张。后面的四个值分别是left，top，width，height，来控制画布上的图片的位置和大小
        ctx.draw()
      }
    })
  },
  saveImage: function () {//这里触发图片上传的方法
    var pics = this.data.pics;
    app.uploadimg({
      url: 'https://........',//这里是你图片上传的接口
      path: pics//这里是选取的图片的地址数组
    });
  }
})
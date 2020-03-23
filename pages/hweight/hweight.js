// pages/hweight/hweight.js
var app = getApp();
// var CONFIG = require('../../config/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weight: '60.0',
    styles: {
      line: '#BFBFBF',   // 刻度颜色
      bginner: '#F5F7FB',  // 前景色颜色
      bgoutside: '#F5F7FB',  // 背景色颜色
      lineSelect: '#00D3A2',  // 选中线颜色
      font: '#BFBFBF'   // 刻度数字颜色
    },
    height: 160,
    type: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    if (options.type) {
      this.setData({
        type: options.type
      })
    }
    var u = wx.getStorageSync('u')
    if (u) {
      var data = {
        u: u
      }

      if (u.weight != 0) {
        data.weight = u.weight
      }
      if (u.height != 0) {
        data.height = u.height
      }
      this.setData(data)
    }

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

  bindvalue: function (e) {
    if (e.detail.value > 0) {
      if (e.currentTarget.dataset.cat == 1) {
        this.setData({
          height: e.detail.value
        })
      } else {
        this.setData({
          weight: e.detail.value
        })
      }
    }
  },
  // go: function () {
  //   var height = this.data.height
  //   var weight = this.data.weight
  //   var type = this.data.type
  //   if (!height || !weight) return;
  //   var u = this.data.u;
  //   var params = {
  //     uid: u.uid,
  //     weight: weight,
  //     height: height
  //   };
  //   if (type == 1 || type == 3) {
  //     wx.request({
  //       url: CONFIG.url + 'index/updata_info',
  //       data: params,
  //       header: {
  //         'Accept': 'application/json'
  //       },
  //       method: 'GET',
  //       dataType: 'json',
  //       success: function (res) {
  //         if (res.data.code == 100) {
  //           u.weight = weight
  //           u.height = height
  //           wx.setStorageSync('u', u)
  //           if (type == 1) {
  //             wx.navigateTo({
  //               url: './cate',
  //             })
  //           } else {
  //             wx.navigateBack({
  //               delta: 1
  //             })
  //           }

  //         }
  //       }
  //     })
  //   } else {
  //     wx.request({
  //       url: CONFIG.url + 'index/record_wh',
  //       data: params,
  //       header: {
  //         'Accept': 'application/json'
  //       },
  //       method: 'GET',
  //       dataType: 'json',
  //       success: function (res) {
  //         if (res.data.code == 100) {

  //           wx.switchTab({
  //             url: '/pages/index/index',
  //           })
  //         }
  //       }
  //     })
  //   }
  // }
})
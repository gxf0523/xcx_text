// pages/watermark/watermark.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '请勿外传',
    // color: 'rgba(0,0,0,0.03)',
    color: 'rgba(0,0,0,0.5)',
    rows: [],
    cols: []  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { windowWidth, windowHeight } = wx.getSystemInfoSync();
    const rows = Math.ceil(windowWidth / (30 * this.data.text.length));
    const cols = Math.ceil(windowHeight / 100);
    this.setData({
      rows: new Array(rows),
      cols: new Array(cols)
    });
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
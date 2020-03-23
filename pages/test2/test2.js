// pages/test2/test2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: 258862,
    like:560,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let number = this.data.number;
    let like = this.data.like;
    console.log(Math.floor(like / 5))
    this.setData({
      number: number > 10000 ? (((number - number % 1000) / 10000) > 99.9 ? 99.9 + 'W' : (((number - number % 1000) / 10000) + (Math.floor(like / 5))) + 'W') : (number),
    })
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
  onCollect: function () {
    wx.vibrateLong({
      
    })
  },
  //掌声
  onZS: function (){
    console.log(111)
    this.audioCtx = wx.createAudioContext('Audio');
    this.audioCtx.play();
    setTimeout(()=>{
      this.audioCtx.pause();
      this.audioCtx.seek(0)
    },1500)
    // const tempFilePath = 'http://tu.test.duia.com//tikuImage/20190912/f3da3e098dd2447cbbe5f965c6563c78.mp3'
    // wx.playBackgroundAudio({
    //   dataUrl: tempFilePath,
    // })
  }
})
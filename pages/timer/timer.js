// pages/timer/timer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer:null,
    //初始化时间值
    hour: '00',
    minutes: '00',
    seconds: '00',
    ms: '000',
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
  startTime:function(){
    this.fun();
  },
  stopTime:function(){
    clearInterval(this.data.timer);
  },
  clearTime:function(){
    clearInterval(this.data.timer);
    this.setData({
      hour: '00',
      minutes: '00',
      seconds: '00',
      ms: '000',
    })
  },
  fun:function() {
    var that = this;
    var hour = this.data.hour;
    var minutes = this.data.minutes;
    var seconds = this.data.seconds;
    var ms = this.data.ms;
    // 设置定时器
    this.data.timer = setInterval(function () {
      ms=ms+50;
      that.setData({
        ms:ms>10?ms:'0'+ms,
      })
      if(ms>=1000){
        ms=0;
        seconds=seconds*1+1;
        that.setData({
          seconds:seconds>10?seconds:'0'+seconds,
        })
      }
      if(seconds>=60){
        seconds=0;
        minutes=minutes*1+1;
        that.setData({
          minutes:minutes>10?minutes:'0'+minutes,
        })
      }
   
      if(minutes>=60){
        minutes=0;
        hour=hour*1+1;
        that.setData({
          hour:hour>10?hour:'0'+hour,
        })
      }
    }, 50);
  }
})
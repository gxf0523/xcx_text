// pages/test2/test2.js
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: 258862,
    like:560,
    years,
    year: date.getFullYear(),
    months,
    month: 2,
    days,
    day: 2,
    value: [2],
    isDaytime: true,
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
  bindChange(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      isDaytime: !val[3]
    })
  },
  foucus: function (e) {

    var that = this;
    
    that.setData({
    
    inputBottom: e.detail.height
    
    })
    
    },
    
     
    
    //失去聚焦
    
    blur: function (e) {
    
    var that = this;
    
    that.setData({
    
    inputBottom: 0
    
    })
    
    },
    
    //用户输入内容--提交输入
    
    submit:function(){
    
    var that = this;
    
    console.info(that.data.inputText);
    
    if (!that.data.inputText){
    
    wx.showToast({
    
    icon:'none',
    
    title:'请输入内容'
    
    })
    
    return false;
    
    }
    
    talkList.push({
    
    who: 2,
    
    text: that.data.inputText
    
    })
    
    that.setData({
    
    talkList: talkList,
    
    inputText:'',
    
    //inputBottom: 0
    
    })
    
    that.scrollToBottom();
    
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
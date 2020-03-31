// pages/test3/test3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'Wechat高小飝',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.getTitle())
  },
  getTitle: function () {
    if (this.GetLength(this.data.title) > 8) {
      var label = this.cutstr(this.data.title, 6)
      return label
    } else {
      return this.data.title
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获取字符串长度，汉字算2个，字母数字算一个
  GetLength(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
      var a = val.charAt(i);
      if (a.match(/[^\x00-\xff]/ig) != null) {
        len += 2;
      }
      else {
        len += 1;
      }
    }
    return len;
  },
  cutstr(str, len) {
    var str_length = 0;
    var str_len = 0;
    var str_cut = new String();
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
      var a = str.charAt(i);
      str_length++;
      if (escape(a).length > 4) {
        //中文字符的长度经编码之后大于4  
        str_length++;
      }
      str_cut = str_cut.concat(a);
      if (str_length >= len) {
        str_cut = str_cut.concat("...");
        return str_cut;
      }
    }
    //如果给定字符串小于指定长度，则返回源字符串；  
    if (str_length < len) {
      return str;
    }
  },
})
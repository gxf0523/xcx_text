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
  onMediapicture:function(){
    wx.navigateTo({
      url: '../../picture/mediapicture/mediapicture',
    })
  },
  /**
     * 设置订阅消息标记缓存
     */
    subscribeSetStorageSync:function(){
      let that =this
      let data = wx.getStorageSync('pk_task_subscribe') || 0
      let time = new Date().getTime()
      if (data == 0 || time >data.time ){
        //重新记录当天的24点的时间戳和任务id
        data={
          time:0,
          id:that.data.taskId
        }
        that.setData({isSubscribe:true})
        wx.setStorageSync('pk_task_subscribe', data)
      }else if(time <data.time && data.id != that.data.taskId){
        //当天 的任务id改变，更新缓存记录
        data.id = that.data.taskId
        wx.setStorageSync('pk_task_subscribe', data)
        that.setData({isSubscribe:true})
      }
    },

    /**
     * 触发一次性订阅消息
     */
  subscribe:function(e){
    let that=this
    
    console.log('触发订阅消息')
    that.cmd = true
    setTimeout(() => { that.cmd = false },1000)  //因为无法提前准确获取是否勾选，1s内得到返回数据，均视为勾选了 总是维持以上选择 选项

    //订阅消息标记，每个任务 每天 只触发一次订阅消息
    this.subscribeSetStorageSync()

    //调用订阅消息
    wx.requestSubscribeMessage({
      tmplIds: ['KcQfR7yO--N0yT3TFUy38h2DPQCCpELhHDJMD4W0yws','MgcWN3ujxPXUZHdksSzZEdKNifqzmQN94xnwlCFrLH0'],
      success(res) {
        console.log('订阅消息成功数据返回',res)
        if(that.cmd){
          //如果之前勾选了 总是维持以上选择 ，点击后弹出吐司
          wx.showToast({title: '已获取订阅状态',icon: 'none', duration: 2000})
        }
        let { "KcQfR7yO--N0yT3TFUy38h2DPQCCpELhHDJMD4W0yws": a } = res
        let { "MgcWN3ujxPXUZHdksSzZEdKNifqzmQN94xnwlCFrLH0": b } = res
        if(a == 'accept' || b == 'accept'){
            var templates= []
            if (a == 'accept') { templates.push('2') }
            if (b == 'accept') { templates.push('1') }
            let data = {
              userId:wx.getStorageSync('user').id,
              openid:wx.getStorageSync('openId'),
              types:templates,
            }
            // 调用消息推送接口
            console.log('调用消息推送接口',data)
            getHttp.pkSubscribe(data).then(res=>{console.log(res)},res=>{console.log(res)})
        }
      },
      fail(res) {
        console.log('订阅消息获取失败',res)
        wx.showToast({title: '已获取订阅状态',icon: 'none', duration: 2000})
      }
    })
  },
})
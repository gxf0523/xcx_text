// pages/luckyDraw/luckyDraw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 九宫格转盘
    circleList: [],//圆点数组  
    awardList: [],//奖品数组  
    colorCircleFirst: '#FFDF2F',//圆点颜色1  
    colorCircleSecond: '#FE4D32',//圆点颜色2  
    colorAwardDefault: '#F5F0FC',//奖品默认颜色  
    colorAwardSelect: '#ffe400',//奖品选中颜色  
    indexSelect: 0,//被选中的奖品index  
    isRunning: false,//是否正在抽奖  
    imageAward: [
      '../../images/1.jpg',
      '../../images/2.jpg',
      '../../images/3.jpg',
      '../../images/4.jpg',
      '../../images/5.jpg',
      '../../images/6.jpg',
      '../../images/7.jpg',
      '../../images/8.jpg',
    ],//奖品图片数组  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 九宫格转盘
    var _this = this;
    //圆点设置  
    var leftCircle = 7.5;
    var topCircle = 7.5;
    var circleList = [];
    for (var i = 0; i < 24; i++) {
      if (i == 0) {
        topCircle = 15;
        leftCircle = 15;
      } else if (i < 6) {
        topCircle = 7.5;
        leftCircle = leftCircle + 102.5;
      } else if (i == 6) {
        topCircle = 15
        leftCircle = 620;
      } else if (i < 12) {
        topCircle = topCircle + 94;
        leftCircle = 620;
      } else if (i == 12) {
        topCircle = 565;
        leftCircle = 620;
      } else if (i < 18) {
        topCircle = 570;
        leftCircle = leftCircle - 102.5;
      } else if (i == 18) {
        topCircle = 565;
        leftCircle = 15;
      } else if (i < 24) {
        topCircle = topCircle - 94;
        leftCircle = 7.5;
      } else {
        return
      }
      circleList.push({ topCircle: topCircle, leftCircle: leftCircle });
    }
    this.setData({
      circleList: circleList
    })

    //圆点闪烁  
    setInterval(function () {
      if (_this.data.colorCircleFirst == '#FFDF2F') {
        _this.setData({
          colorCircleFirst: '#FE4D32',
          colorCircleSecond: '#FFDF2F',
        })
      } else {
        _this.setData({
          colorCircleFirst: '#FFDF2F',
          colorCircleSecond: '#FE4D32',
        })
      }
    }, 500)//设置圆点闪烁的效果  

    //奖品item设置  
    var awardList = [];
    //间距,怎么顺眼怎么设置吧.  
    var topAward = 25;
    var leftAward = 25;
    for (var j = 0; j < 8; j++) {
      if (j == 0) {
        topAward = 25;
        leftAward = 25;
      } else if (j < 3) {
        topAward = topAward;
        //166.6666是宽.15是间距.下同  
        leftAward = leftAward + 166.6666 + 15;
      } else if (j < 5) {
        leftAward = leftAward;
        //150是高,15是间距,下同  
        topAward = topAward + 150 + 15;
      } else if (j < 7) {
        leftAward = leftAward - 166.6666 - 15;
        topAward = topAward;
      } else if (j < 8) {
        leftAward = leftAward;
        topAward = topAward - 150 - 15;
      }
      var imageAward = this.data.imageAward[j];
      awardList.push({ topAward: topAward, leftAward: leftAward, imageAward: imageAward });
    }
    this.setData({
      awardList: awardList
    })
  },
  //开始抽奖  
  startGame: function () {
    if (this.data.isRunning) return
    this.setData({
      isRunning: true
    })
    var _this = this;
    var indexSelect = 0
    var i = 0;
    var timer = setInterval(function () {
      // console.log(indexSelect)
      if (indexSelect == 7) {
        indexSelect = 0
      } else {
        indexSelect++;
      }
      //这里我只是简单粗暴用y=30*x+200函数做的处理.可根据自己的需求改变转盘速度  
      i += 30;
      if (i > 1000) {
        // 这里的5就是奖品数组的下标，到时候从后台获取下标 模拟： Math.floor((Math.random() * 7)  这样随机一个数字中奖
        if (indexSelect == 1) {
          //去除循环  
          clearInterval(timer)
          //获奖提示  
          wx.showModal({
            title: '恭喜您',
            content: '获得了第' + (_this.data.indexSelect + 1) + "个优惠券",// 从后台获取的奖品下标，取数组对应下标的值显示给用户看
            showCancel: false,//去掉取消按钮  
            success: function (res) {
              if (res.confirm) {
                _this.setData({
                  isRunning: false
                })
              }
            }
          })
        }

      }
      indexSelect = indexSelect % 8;
      _this.setData({
        indexSelect: indexSelect
      })
    }, (200 + i))
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
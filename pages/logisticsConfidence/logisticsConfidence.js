// pages/logisticsConfidence/logisticsConfidence.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:39.099994,
    longitude:115.324520,
    markers:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setMarkers();
  },
  //设置标记点
  setMarkers() {
    var that = this
    wx.getLocation({//获取当前位置经纬度
      type: 'wgs84',
      success(res) {
        console.log(res)
        const latitude = res.latitude //当前位置纬度
        const longitude = res.longitude //当前位置经度
        var markers = [{
            id: 0,
            iconPath: "../../image/wuliu_cilcle.png",
            longitude: 103.71878,
            latitude: 36.10396,
            width: 20,
            height: 20
          },
          {
            id: 1,
            iconPath: "../../image/wuliu_cilcle.png",
            longitude: 113.3926,
            latitude: 22.51595,
            width: 20,
            height: 20
          },
          {
            id: 2,
            iconPath: "../../image/wuliu_cilcle.png",
            longitude: longitude,
            latitude: latitude,
            width: 20,
            height: 20
          },
        ]
        var polyline = [{//设置连线数组 一个对象为一条线
          points: [{
              latitude: that.data.latitude,
              longitude: that.data.longitude,
            },
            {
              latitude: latitude,
              longitude: longitude,
            },

          ],
          color: "#FF0000DD",//线的颜色
          width:4,//线的宽度
          // dottedLine:true,//虚线
          // arrowLine:true,//线内箭头
        }]
        console.log(markers,polyline)
        that.setData({
          markers,
          polyline
        })
      }
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

  }
})
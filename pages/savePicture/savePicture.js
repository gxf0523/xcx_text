// pages/savePicture/savePicture.js
var storage = require('../../utils/storage.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    posterParams: {
      width: 750,
      height: 1334,
      backgroundColor: '#FFFFFF',
      backgroundImageUrl: '',
      list: [
        {
          type: 'block',
          x: 224.5,
          y: 20,
          url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc2b4a8f-6ab2-47b5-b744-f0c5745aa5c0/ba781d6d-7ea4-4785-94f3-56ae31de5b45.png',
          width: 301,
          height: 129
        },
        {
          type: 'block',
          x: 0,
          y: 200,
          width: 750,
          height: 500,
          backgroundColor: '#F1F1F1'
        },
        {
          type: 'block',
          x: 140,
          y: 215,
          url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc2b4a8f-6ab2-47b5-b744-f0c5745aa5c0/45669415-ea60-4641-9377-590b041d4663.png',
          width: 470,
          height: 470
        },
        {
          type: 'block',
          x: 35,
          y: 750,
          width: 680,
          height: 80,
          backgroundColor: '#181818',
          radius: 40
        },
        {
          type: 'text',
          x: 375,
          y: 774,
          text: '你的好友邀请你参与 Magical 2020 免费抽',
          fontSize: 32,
          color: '#fff',
          textAlign: 'center'
        },
        {
          type: 'text',
          x: 35,
          y: 880,
          text: 'F:NEX VOCALOID 初音未来 魔法未来 2020 Summer Ver.手办 附独家特典',
          fontSize: 34,
          color: '#323233',
          textAlign: 'left',
          lineHeight: 44,
          maxWidth: 680
        },
        {
          type: 'text',
          x: 35,
          y: 1000,
          text: '￥1269',
          fontWeight: 'bold',
          fontSize: 46,
          color: '#323233',
          textAlign: 'left'
        },
        {
          type: 'text',
          x: 715,
          y: 1014,
          text: '市场价  ￥2999',
          fontSize: 28,
          color: '#c8c9cc',
          textAlign: 'right'
        },
        {
          type: 'block',
          x: 375,
          y: 1145,
          width: 1,
          height: 90,
          backgroundColor: '#D2D2D2'
        },
        {
          type: 'text',
          x: 175,
          y: 1196,
          text: '邀请你参与',
          fontSize: 28,
          color: '#323233',
          textAlign: 'left'
        },
        {
          type: 'block',
          x: 470,
          y: 1130,
          url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc2b4a8f-6ab2-47b5-b744-f0c5745aa5c0/5cf712a8-1c66-4143-87a5-f3cc3ecd44a3.jpg',
          width: 120,
          height: 120,
          radius: 60
        },
        {
          type: 'text',
          x: 715,
          y: 1160,
          text: '长按扫码',
          fontSize: 24,
          color: '#c8c9cc',
          textAlign: 'right'
        },
        {
          type: 'text',
          x: 715,
          y: 1200,
          text: '查看详情',
          fontSize: 24,
          color: '#c8c9cc',
          textAlign: 'right'
        }
      ]
    },
    showPosterOverlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  handleShare: function () {
    if (!storage.get('userProfile')) {
      wx.getUserInfo({
        success: function(res){
          const userInfo = res.rawData;
          storage.set('userProfile', userInfo, 60 * 60 * 24 * 10)
        },
      })
    }
    const userProfile = JSON.parse(storage.get('userProfile'));
    var posterParams = this.data.posterParams;
    posterParams.list.push({
      type: 'block',
      x: 35,
      y: 1130,
      url: userProfile.avatarUrl,
      width: 120,
      height: 120,
      radius: 60
    })
    posterParams.list.push({
      type: 'text',
      x: 175,
      y: 1156,
      text: userProfile.nickName,
      fontSize: 28,
      color: '#323233',
      textAlign: 'left'
    })
    this.setData({
      showPosterOverlay:true,
      posterParams
    })
  },
  onclose:function(){
    this.setData({
      showPosterOverlay:false,
    })
  },
  previewImage:function(){
    wx.previewImage({
      urls: [
        'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc2b4a8f-6ab2-47b5-b744-f0c5745aa5c0/45669415-ea60-4641-9377-590b041d4663.png'
      ]
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
// pages/colorUIModel/colorUIModel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalData:{
      btnNum:0,
      show:false,
      title:'标题',
      content:'您还有另外【1】台无人车没有添加，请扫下一台的二维码继续添加',
      image:'',
      btnText:'开盖补货',
      btnColor:'Orange',//紫色 Violet ； 灰色 Grey ；橙色 Orange ； 绿色 Green
    }
  },
  showModal(e) {
    this.setData({
      ['modalData.btnNum']:e.currentTarget.dataset.target,
      ['modalData.show']: true,
      ['modalData.btnText']: '我知道了',
      ['modalData.btnColor']: 'Violet',
    })
  },
  hideModal(){
    this.setData({
      ['modalData.show']: false
    })
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

  }
})
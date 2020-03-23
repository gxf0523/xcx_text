// pages/height/height.js
Page({

  /**
  
  * 页面的初始数据
  
  */

  data: {

    age: [''],

    ageItemStatus: ['', ''],

    ageScrolLeft: '',

    curHeight: 40,

    height: [''],

    heightScrolLeft: '',

    curweight: 20,

    weight: [''],

    weightScrolLeft: '',

  },



  /**
  
  * 生命周期函数--监听页面加载
  
  */

  onLoad: function (options) {

    var that = this;

    var age = [];

    for (var i = 0; i < 100; i++) {

      age[i] = i;

    }

    var ageItemStatus = that.data.ageItemStatus;

    ageItemStatus[26] = 'active';



    var height = [];

    for (var i = 0; i < 300; i++) {

      height[i] = i;

    }

    //console.info("身高", height)

    var heightItemStatus = that.data.heightItemStatus;



    var weight = [];

    for (var i = 0; i < 200; i++) {

      weight[i] = i;

    }

    //console.info("体重", weight)



    that.setData({

      age: age,

      ageItemStatus: ageItemStatus,

      height: height,

      heightItemStatus: heightItemStatus,

      weight: weight,

    })

    //console.info("年龄：",age)

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

  // 年龄滑动

  agescroll: function (e) {

    console.log(e.detail.scrollLeft);

    var scrollLeft = e.detail.scrollLeft;

    var index = (parseInt(scrollLeft) / 64 + 2).toFixed(0);

    console.info("对应的年龄", index);

    var status = [];

    for (var i = 0; i < 100; i++) {

      status[i] = [];

    }

    status[index] = 'active';

    this.setData({

      ageItemStatus: status,

      ageStr: index,

    })

  },

  //身高滑动

  heightscroll: function (e) {

    console.log(e.detail.scrollLeft);

    var scrollLeft = e.detail.scrollLeft;

    var index = ((parseInt(scrollLeft) - 36) / 36 * 10 + 50).toFixed(0);

    console.info("对应的身高", index);

    this.setData({

      curHeight: index,

      heightIndex: index

    })

  },

  //体重滑动

  weightscroll: function (e) {

    console.log(e.detail.scrollLeft);

    var scrollLeft = e.detail.scrollLeft;

    var index = (((parseInt(scrollLeft) - 36) / 36 * 10 + 50) / 2).toFixed(1);

    console.info("对应的体重", index);

    this.setData({

      curweight: index,

      weightIndex: index

    })

  },

})
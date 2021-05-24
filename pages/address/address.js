// pages/address/address.js
var area = require('../../utils/area.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    mobile:'',
    detailAddress:'',
    addressData:null,
    selectCount: 0,
    jieguo: '',//最后取到的省市区名字
    firstArea: '请选择地址',
    isShow: 'hide',
    title:'地址',
    provinceArray: [],
    cityArray: [],
    countyArray: [],
    sheng: [],//获取到的所有的省
    shi: [],//选择的该省的所有市
    qu: [],//选择的该市的所有区县
    sheng_index: 0,//picker-view省项选择的value值
    shi_index: 0,//picker-view市项选择的value值
    qu_index: 1,//picker-view区县项选择的value值
    shengshi: null,//取到该数据的所有省市区数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取全部省份
    var _provinces = [];
    var _cityDatas = [];
    var _secondDatas = [];
    var _countDatas = [];
    var areas = area.area();
    var _sheng = [];
    var _shi = [];
    var _qu = [];
    for (var i = 0; i < areas.length; i++) {
      var _area = areas[i];
      var province = {};
      province.id = _area.id;
      province.name = _area.province;
      _provinces.push(province);
      _sheng.push(_area.province);
      for (var j = 0; j < _area.cities.length; j++) {
        var _secondData = _area.cities[j];
        var _cityObj = {};
        _cityObj.id = _secondData.id;
        _cityObj.name = _secondData.city;
        _cityObj.parent = _secondData.parent;
        _cityDatas.push(_cityObj);
        _secondDatas.push(_secondData);
        _shi.push(_secondData.city);
      }
    }
    for (var j = 0; j < _secondDatas.length; j++) {
      var _secondData = _secondDatas[j];
      for (var k = 0; k < _secondData.counties.length; k++) {
        var _countyData = _secondData.counties[k];
        var _countyObj = {};
        _countyObj.id = _countyData.id;
        _countyObj.name = _countyData.county;
        _countyObj.parent = _countyData.parent;
        _countDatas.push(_countyObj);
        _qu.push(_countyData.county);
      }
    }
    var _multiArray = [];
    _multiArray.push(_provinces);
    _multiArray.push(_cityDatas);
    _multiArray.push(_countDatas);
    this.setData({
      provinceArray: _provinces,
      cityArray: _cityDatas,
      countyArray: _countDatas,
      shengshi: areas
    });
    var _event = {};
    _event.detail = { value: [0, 0, 0] };
    this.bindchange(_event);
  },
//滚动选择的时候触发事件
bindchange: function (e) {
  //这里是获取picker-view内的picker-view-column 当前选择的是第几项
  const val = e.detail.value;

  this.setData({
    sheng_index: val[0],
    shi_index: val[1],
    qu_index: val[2]
  });
  this.jilian();
},
//这里是判断省市名称的显示
jilian: function () {
  var that = this,
    shengshi = that.data.shengshi,
    sheng = [],
    shi = [],
    qu = [],
    qu_index = that.data.qu_index,
    shi_index = that.data.shi_index,
    sheng_index = that.data.sheng_index,
    provinceArray = that.data.provinceArray,
    cityArray = that.data.cityArray,
    countyArray = that.data.countyArray;
  //遍历所有的省，将省的名字存到sheng这个数组中
  for (let i = 0; i < provinceArray.length; i++) {
    sheng.push(provinceArray[i].name);
  }
  if (shengshi[sheng_index].cities) {//这里判断这个省级里面有没有市（如数据中的香港、澳门等就没有写市）
    if (shengshi[sheng_index].cities[shi_index]) {//这里是判断这个选择的省里面，有没有相应的下标为shi_index的市，因为这里的下标是前一次选择后的下标，比如之前选择的一个省有10个市，我刚好滑到了第十个市，现在又重新选择了省，但是这个省最多只有5个市，但是这时候的shi_index为9，而这里的市根本没有那么多，所以会报错
      //这里如果有这个市，那么把选中的这个省中的所有的市的名字保存到shi这个数组中
      for (let i = 0; i < shengshi[sheng_index].cities.length; i++) {
        shi.push(shengshi[sheng_index].cities[i].city);
      }
      if (shengshi[sheng_index].cities[shi_index].counties) {//这里是判断选择的这个市在数据里面有没有区县
        if (shengshi[sheng_index].cities[shi_index].counties[qu_index]) {//这里是判断选择的这个市里有没有下标为qu_index的区县，道理同上面市的选择
          //有的话，把选择的这个市里面的所有的区县名字保存到qu这个数组中
          for (let i = 0; i < shengshi[sheng_index].cities[shi_index].counties.length; i++) {
            qu.push(shengshi[sheng_index].cities[shi_index].counties[i].county);
          }
        } else {
          //这里和选择市的道理一样
          that.setData({
            qu_index: 0
          });
          for (let i = 0; i < shengshi[sheng_index].cities[shi_index].counties.length; i++) {
            qu.push(shengshi[sheng_index].cities[shi_index].counties[i].county);
          }
        }
      } else {
        //如果这个市里面没有区县，那么把这个市的名字就赋值给qu这个数组
        qu.push(shengshi[sheng_index].cities[shi_index].city);
      }
    } else {
      //如果选择的省里面没有下标为shi_index的市，那么把这个下标的值赋值为0；然后再把选中的该省的所有的市的名字放到shi这个数组中
      that.setData({
        shi_index: 0
      });
      for (let i = 0; i < shengshi[sheng_index].cities.length; i++) {
        shi.push(shengshi[sheng_index].cities[i].county);
      }

    }
  } else {
    //如果该省级没有市，那么就把省的名字作为市和区的名字
    shi.push(shengshi[sheng_index].province);
    qu.push(shengshi[sheng_index].province);
  }
  //选择成功后把相应的数组赋值给相应的变量
  that.setData({
    sheng: sheng
  });

  if (shi != null && shi != '') {
    that.setData({
      shi: shi
    })
  }
  if (qu != null && qu != '') {
    that.setData({
      qu: qu
    })
  }
  //有时候网络慢，会出现区县选择出现空白，这里是如果出现空白那么执行一次回调
  if (sheng.length == 0 || shi.length == 0 || qu.length == 0) {
    that.jilian();
  }
  //把选择的省市区都放到jieguo中
  let jieguo = sheng[that.data.sheng_index] + shi[that.data.shi_index] + qu[that.data.qu_index];
  let _selectArea = {
    province: sheng[that.data.sheng_index],
    city: shi[that.data.shi_index],
    county: qu[that.data.qu_index]
  };
  console.log(jieguo)
  that.setData({
    jieguo: jieguo,
    selectArea: _selectArea
  });
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
  //收货人姓名
  nameInput:function(e){
    this.setData({
      name: e.detail.value
    });
  },
  //收货人号码
  mobileInput:function(e){
    this.setData({
      mobile: e.detail.value
    });
  },
  //详细地址
  detailAddressInput:function(e){
    this.setData({
      detailAddress: e.detail.value
    });
  },
  //选择地址
  changeAddress:function(){
    this.setData({
      isShow: 'show'
    })
  },
  //取消按钮
  quxiao: function () {
    this.setData({
      isShow: 'hide'
    });
  },
  //确认按钮
  queren: function () {
    this.quxiao()
    this.setData({
      selectCount: ++this.data.selectCount
    })
  },
  //确认按钮
  confirm: function () {
    let that = this;
    if (this.data.name.length == 0 || this.data.name == '' || this.data.name == null) {
      wx.showToast({ title: '请填写收货人姓名!',icon: 'none',duration: 1500})
      return;
    }
    if (this.data.name.length < 2) {
      wx.showToast({ title: '请正确填写收货人姓名，2~15个字符', icon: 'none', duration: 1500 })
      return;
    }
    if (this.data.mobile.length == 0 || this.data.mobile == 0) {
      wx.showToast({ title: '请填写手机号码', icon: 'none', duration: 1500 })
      return;
    }
    if (!(/^1[\d]{10}/.test(this.data.mobile))) {
      wx.showToast({ title: '请正确填写手机号', icon: 'none', duration: 1500 })
      return;
    }
    if (this.data.detailAddress.length == 0 || this.data.detailAddress == '' || this.data.detailAddress == null) {
      wx.showToast({ title: '请填写详细地址', icon: 'none', duration: 1500 })
      return;
    }
    if (this.data.detailAddress.length < 1 || this.data.detailAddress.indexOf("对啊") >= 0 || this.data.detailAddress.indexOf("锋创") >= 0) {
      wx.showToast({ title: '地址填写不规范', icon: 'none', duration: 1500 })
      return;
    }

    if (this.data.address == null && this.data.selectCount == 0) {
      wx.showToast({ title: '请选择地址', icon: 'none', duration: 1500 })
      return;
    }
    if (this.data.selectArea != null && this.data.selectArea != '') {
      console.log('保存')
    }
  },
})
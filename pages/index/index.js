//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    demoList:[
      {
        "title":"上传图片没限制",
        "url":"../uploadImage1/uploadImage1",
      },
      {
        "title":"上传图片限制4张",
        "url":"../uploadImage/uploadImage",
      },
      {
        "title":"信件弹框翻页",
        "url":"../cardReceive/cardReceive",
      },
      {
        "title":"点击弹框翻转",
        "url":"../cardReceive1/cardReceive1",
      },
      {
        "title":"canvas圆环进度",
        "url":"../circle/circle",
      },
      {
        "title":"通讯录",
        "url":"../txl/txl",
      },
      {
        "title":"image宽度100%，高度自适应",
        "url":"../image/image",
      },
      {
        "title":"订阅消息弹框",
        "url":"../test3/test3",
      },
      {
        "title":"九宫格抽奖",
        "url":"../luckyDraw/luckyDraw",
      },
      {
        "title":"身高体重刻度尺",
        "url":"../hweight/hweight",
      },
      {
        "title":"时间日志",
        "url":"../logs/logs",
      },
      {
        "title":"菜单栏切换",
        "url":"../animation/animation",
      },
      {
        "title":"日历显示当前天所在的一周",
        "url":"../date/date",
      },
      {
        "title":"横向切换页面模块",
        "url":"../scrollpage/scrollpage",
      },
      {
        "title":"吸顶",
        "url":"../xiding/xiding",
      },
      {
        "title":"tab切换",
        "url":"../tabchange/tabchange",
      },
      {
        "title":"地图",
        "url":"../maps/maps",
      },
      {
        "title":"点赞",
        "url":"../test2/test2",
      },
      {
        "title":"canvas生成图片并保存到本地相册",
        "url":"../canvas/canvas",
      },
      {
        "title":"pagezimu",
        "url":"../pagezimu/pagezimu",
      },
      {
        "title":"transform",
        "url":"../transform/transform",
      },
      {
        "title":"物流状态完整",
        "url":"../wuliumInfo/wuliumInfo",
      },
      {
        "title":"物流状态列表",
        "url":"../logisticsConfidence/logisticsConfidence",
      },
      {
        "title":"物流状态上的地图",
        "url":"../mapss/mapss",
      },
      {
        "title":"填写收货地址",
        "url":"../address/address",
      },
      {
        "title":"弹框",
        "url":"../colorUIModel/colorUIModel",
      },
      {
        "title":"水印1",
        "url":"../watermark/watermark",
      },
      {
        "title":"水印2",
        "url":"../watermarkTwo/watermarkTwo",
      }
    ],
    listData:[],
    inputText:'',
  },
  bindinput:function(e){
    var value = e.detail.value;
    const { demoList } = this.data;
    var arr = [];
    if(value){
      for(var i=0;i<demoList.length;i++){
        if(demoList[i].title.indexOf(value)!=-1){
          arr.push(demoList[i])
        }
      }
    }else{
      arr = demoList;
    }
    this.setData({
      inputText:value,
      listData:arr
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.setData({
      listData:this.data.demoList
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

// pages/mapss/mapss.js

Page({
  data: {
    markers: [{
      iconPath: "../images/img1.jpg",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    },
      {
        iconPath: "../images/img2.jpg",
        id: 1,
        latitude: 23.090994,
        longitude: 113.524520,
        width: 50,
        height: 50
      },
      {
        iconPath: "../images/img3.jpg",
        id: 2,
        latitude: 23.091994,
        longitude: 113.424530,
        width: 50,
        height: 50
      }],
    includePoints: [{
      latitude: 23.099994,
      longitude: 113.324520
    },
    {
      latitude: 23.090994,
      longitude: 113.524520
    }],
    polyline: []
  },
  onLoad: function (options) {
 
  // 调用腾讯 地图IP定位接口查询骑手的当前位置、需要的参数是骑手的IP
    wx.request({
      url: 'http://ip-api.com/json',
      success: function (e) {
        console.log('ip地址：', e.data);
        var ip = e.data.query;
        wx.request({
          url: 'https://apis.map.qq.com/ws/location/v1/ip?ip='+ ip +'&key=U4RBZ-7R3KJ-LOKFT-KQV55-5JCVH-LWBIF',
          success: function (e) {
            // 骑手的经纬度
            console.log('经纬度数据：', e);
          }
        });
      }
    });
    wx.getLocation({
      success: (res) => {
        this.setData({
          latitude: 23.099994,
          longitude: 113.324520
        });
        var coors=[];
        wx.request({
          url: 'https://apis.map.qq.com/ws/direction/v1/driving/?from=' + this.data.markers[0].latitude + ',' + this.data.markers[0].longitude + '&to=' + this.data.markers[1].latitude + ',' + this.data.markers[1].longitude + '&output=json&callback=cb&key=PD5BZ-K2VRO-CPEWZ-SOBAC-4KCDT-KAFLF',
          success: (res) => {
            console.log("09876546789",res);
           coors = res.data.result.routes[0].polyline
            for (var i = 2; i < coors.length; i++) {
              coors[i] = coors[i - 2] + coors[i] / 1000000
            }
            console.log(coors)
            //划线
            var b = [];
            for (var i = 0; i < coors.length; i = i + 2) {
              b[i / 2] = {
                latitude: coors[i],
                longitude: coors[i + 1]
              };
              console.log(b[i / 2])
            }
            this.setData({
              polyline: [{
                points: b,
                color: "#00ae20",
                width: 14,
                dottedLine: false
              }],
            })
          }
        })
      }
    });
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
})
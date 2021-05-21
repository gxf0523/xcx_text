// pages/wuliumInfo/wuliumInfo.js
Page({
  data: {
    markers: [{
      iconPath: "/image/wuliu_cilcle.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 25,
      height: 25
    },
    {
      iconPath: "/image/wuliu_cilcle.png",
      id: 1,
      latitude: 23.090994,
      longitude: 113.524520,
      width: 25,
      height: 25
    }],
    polyline: [],
    isCallout: false,
    WaybillNo: '813291235464788594',//运单号
  },
  onLoad: function (options) {
    // 调用腾讯 地图IP定位接口查询骑手的当前位置、需要的参数是骑手的IP
    // wx.request({
    //   url: 'http://ip-api.com/json',
    //   success: function (e) {
    //     console.log('ip地址：', e.data);
    //     var ip = e.data.query;
    //     wx.request({
    //       url: 'https://apis.map.qq.com/ws/location/v1/ip?ip='+ ip +'&key=U4RBZ-7R3KJ-LOKFT-KQV55-5JCVH-LWBIF',
    //       success: function (e) {
    //         // 骑手的经纬度
    //         console.log('经纬度数据：', e);
    //       }
    //     });
    //   }
    // });
    wx.getLocation({
      success: (res) => {
        var coor1ss = [];
        wx.request({
          url: 'https://apis.map.qq.com/ws/direction/v1/driving/?from=' + this.data.markers[0].latitude + ',' + this.data.markers[0].longitude + '&to=' + this.data.markers[1].latitude + ',' + this.data.markers[1].longitude + '&output=json&callback=cb&key=PD5BZ-K2VRO-CPEWZ-SOBAC-4KCDT-KAFLF',
          success: (res) => {
            console.log("coor1ss", res.data.result.routes[0]);
            coor1ss = res.data.result.routes[0].polyline
            for (var i = 2; i < coor1ss.length; i++) {
              coor1ss[i] = coor1ss[i - 2] + coor1ss[i] / 1000000
            }
            //划线
            var b = [];
            for (var i = 0; i < coor1ss.length; i = i + 2) {
              b[i / 2] = {
                latitude: coor1ss[i],
                longitude: coor1ss[i + 1]
              };
            }

            //骑手的位置start
            var markerss = this.data.markers;
            markerss.push({
              iconPath: "/image/img1.jpg",
              id: 2,
              latitude: b[140].latitude,
              longitude: b[140].longitude,
              width: 50,
              height: 50,
              customCallout: {//自定义气泡
                display: "ALWAYS",//显示方式 ALWAYS ，可选值 BYCLICK
                anchorX: 0,//横向偏移
                anchorY: -10,
              },
            })
            this.setData({
              markers: markerss,
              isCallout: true
            })
            //骑手的位置end

            this.setData({
              polyline: [{
                points: b,
                color: "#EE82EE",
                width: 4,
              }],
            }, () => {
              var polylines = this.data.polyline;
              var c = [];
              var points = polylines[0].points
              console.log(points.length)
              for (var i = 0; i < points.length; i++) {
                c.push(points[i])
                if (points[i].latitude == this.data.markers[2].latitude && points[i].longitude == this.data.markers[2].longitude) {
                  break;
                }
              }
              polylines.push({
                points: c,
                color: "#FF0000DD",
                width: 10,
              })
              console.log(polylines)
              this.setData({
                polyline: polylines,
              })

            })
          }
        })


      },
      fail: (res) => {
        console.log(res)
      }
    });
  },
  closeMapTips: function (e) {
    console.log(e)
  },
  callTel: function (e) {
    wx.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
    })
  },
  copyOddNumber: function () {
    var that = this;
    wx.setClipboardData({
      data: that.data.WaybillNo,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  }
})
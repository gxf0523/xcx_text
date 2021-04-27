// card/components/scrollNumber/index.js
Component({
  properties: {
    width: {
      type: Number,
      value: 20
    },
    height: {
      type: Number,
      value: 20
    },
    borderColor: {
      type: String,
      value: 'red'
    },
    borderWidth:{
      type: Number,
      value: 4
    },
    // 箭头方向
    direction: {
      type: String,
      default: 'left'
    }
  },
  data: {
    getArrowStyle:'',
  },
  methods: {
    getSideLenght () {
      // 勾股定理计算箭头尺寸
      const num = ((this.properties.width) ** 2 + (this.properties.height / 2) ** 2) ** 0.5;
      return num +'rpx';
    },
  },
  lifetimes: {
    attached: function () { 
      var str ='width: '+ this.getSideLenght() +';height: '+ this.getSideLenght() +';border: solid '+ this.properties.borderColor+';border'+'-'+'width: 0 '+this.properties.borderWidth +'rpx '+this.properties.borderWidth+'rpx 0';
      this.setData({
        getComputedStyle:str
      })
    }
  }
})
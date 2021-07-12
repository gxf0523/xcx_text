module.exports = {
  get(key) {
    const { value, expires } = wx.getStorageSync(key)
    if (expires && expires < Date.parse(new Date())) {
      wx.removeStorageSync(key)
      return undefined
    }
    return value
  },
  set(key, value, expires) {
    // expires 秒
    wx.setStorageSync(key, {
      value,
      expires: expires ? Date.parse(new Date()) + expires * 1000 : undefined
    })
  }
}

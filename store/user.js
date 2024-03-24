export default {
  // 开启命名空间
  namespaced: true,

  // state 数据
  state: () => ({
    // 收货地址
    address: JSON.parse(uni.getStorageSync("address") || "{}"),
    token: uni.getStorageSync("token") || "",
    userinfo: JSON.parse(uni.getStorageSync("userinfo") || "{}"),
  }),

  // 方法
  mutations: {
    // 更新收货地址
    updateAddress(state, address) {
      state.address = address;
      uni.setStorageSync("address", JSON.stringify(state.address));
    },
    updateUserInfo(state, userinfo) {
      console.log(1, userinfo);
      state.userinfo = userinfo;
      // 通过 this.commit() 方法，调用 m_user 模块下的 saveUserInfoToStorage 方法，将 userinfo 对象持久化存储到本地
      uni.setStorageSync("userinfo", JSON.stringify(state.userinfo));
    },
    updateToken(state, token) {
      state.token = token;
      // 通过 this.commit() 方法，调用 m_user 模块下的 saveTokenToStorage 方法，将 token 字符串持久化存储到本地
      uni.setStorageSync("token", state.token);
    },
  },

  // 数据包装器
  getters: {
    addstr(state) {
      if (!state.address.provinceName) return "";
      // 拼接 省，市，区，详细地址 的字符串并返回给用户
      return (
        state.address.provinceName +
        state.address.cityName +
        state.address.countyName +
        state.address.detailInfo
      );
    },
  },
};

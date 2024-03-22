export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync("cart") || "[]"),
  }),

  // 模块的 mutations 方法
  mutations: {
    addToCart(state, goods) {
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id);
      if (!findResult) {
        state.cart.push(goods);
      } else {
        findResult.goods_count++;
      }
      uni.setStorageSync("cart", JSON.stringify(state.cart));
    },
    updateGoodsState(state, goods) {
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id);
      if (findResult) {
        findResult.goods_state = goods.goods_state;
        uni.setStorageSync("cart", JSON.stringify(state.cart));
      }
    },
    updateGoodsCount(state, goods) {
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id);
      if (findResult) {
        findResult.goods_count = goods.goods_count;
        uni.setStorageSync("cart", JSON.stringify(state.cart));
      }
    },
    removeGoodsById(state, goods_id) {
      state.cart = state.cart.filter((x) => x.goods_id != goods_id);
      uni.setStorageSync("cart", JSON.stringify(state.cart));
    },
    updateAllGoodsState(state, newval) {
      state.cart.forEach((x) => (x.goods_state = newval));
      uni.setStorageSync("cart", JSON.stringify(state.cart));
    },
  },

  // 模块的 getters 属性
  getters: {
    total(state) {
      let c = 0;
      // 循环统计商品的数量，累加到变量 c 中
      state.cart.forEach((goods) => (c += goods.goods_count));
      return c;
    },
    checkedCount(state) {
      return state.cart
        .filter((x) => x.goods_state)
        .reduce((total, item) => (total += item.goods_count), 0);
    },
    // 已勾选的商品的总价
    checkedGoodsAmount(state) {
      // 先使用 filter 方法，从购物车中过滤器已勾选的商品
      // 再使用 reduce 方法，将已勾选的商品数量 * 单价之后，进行累加
      // reduce() 的返回值就是已勾选的商品的总价
      // 最后调用 toFixed(2) 方法，保留两位小数
      return state.cart
        .filter((x) => x.goods_state)
        .reduce(
          (total, item) => (total += item.goods_count * item.goods_price),
          0
        )
        .toFixed(2);
    },
  },
};

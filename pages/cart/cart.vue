<template>
  <view>
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <block v-for="(goods, i) in cart" :key="i">
      <my-goods
        :goods="goods"
        :disables="true"
        :showNum="true"
        @radio-change="radioChangeHandler"
        @num-change="numChangeHandler"></my-goods>
    </block>
  </view>
</template>

<script>
import badgeMix from "@/mixins/tabbar-badge.js";
import { mapState, mapMutations } from "vuex";
export default {
  mixins: [badgeMix],
  data() {
    return {};
  },
  methods: {
    ...mapMutations("m_cart", ["updateGoodsState"]),
    radioChangeHandler(e) {
      this.updateGoodsState(e);
    },
    numChangeHandler(e) {
      console.log(e);
    },
  },
  computed: {
    ...mapState("m_cart", ["cart"]),
  },
  onLoad() {
    console.log(this.cart);
  },
};
</script>

<style lang="scss">
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}
</style>

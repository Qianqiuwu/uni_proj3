<template>
  <view v-if="goods_info.goods_name">
    <!-- 轮播图区域 -->
    <swiper
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
      :duration="1000"
      :circular="true">
      <swiper-item v-for="(item, i) in goods_info.pics" :key="i">
        <image
          :src="item.pics_big != '' ? item.pics_big : 'static/moren/moren.png'"
          @click="previewImage(i)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">￥{{ goods_info.goods_price }}</view>
      <!-- 信息主体区域 -->
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="goods-name">{{ goods_info.goods_name }}</view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">快递：免运费-- {{ cart.length }}</view>
    </view>
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    <view class="goods_nav">
      <uni-goods-nav
        :fill="true"
        :options="options"
        :buttonGroup="buttonGroup"
        @click="onClick"
        @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      goods_info: {},
      options: [
        {
          icon: "shop",
          text: "店铺",
          info: 0,
          infoBackgroundColor: "#007aff",
          infoColor: "red",
        },
        {
          icon: "cart",
          text: "购物车",
          info: 0,
        },
      ],
      buttonGroup: [
        {
          text: "加入购物车",
          backgroundColor: "#ff0000",
          color: "#fff",
        },
        {
          text: "立即购买",
          backgroundColor: "#ffb000",
          color: "#fff",
        },
      ],
    };
  },
  methods: {
    ...mapMutations("m_cart", ["addToCart"]),
    // 定义请求商品详情数据的方法
    async getGoodsDetail(goods_id) {
      const { data: res } = await uni.$http.get("/api/public/v1/goods/detail", {
        goods_id,
      });
      if (res.meta.status !== 200) return uni.$showMsg();
      res.message.goods_introduce = res.message.goods_introduce
        .replace(/<img /g, '<img style="display:block;" ')
        .replace(/webp/g, "jpg");
      // 为 data 中的数据赋值
      this.goods_info = res.message;
    },
    previewImage(item) {
      uni.previewImage({
        current: item,
        urls: this.goods_info.pics.map((x) => {
          return x.pics_big;
        }),
        longPressActions: {
          itemList: ["保存图片", "发送朋友"],
          success(data) {
            console.log(data.index, data.tapIndex);
          },
          fail: function (err) {
            console.log(err.errMsg);
          },
        },
      });
    },
    /* 底部事件 */
    onClick(e) {
      if (e.content.text == "购物车") {
        uni.switchTab({
          url: "/pages/cart/cart",
        });
      }
    },
    buttonClick(e) {
      if (e.content.text == "加入购物车") {
        this.options[1].info += 1;
        const goods = {
          goods_id: this.goods_info.goods_id, // 商品的Id
          goods_name: this.goods_info.goods_name, // 商品的名称
          goods_price: this.goods_info.goods_price, // 商品的价格
          goods_count: 1, // 商品的数量
          goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
          goods_state: true, // 商品的勾选状态
        };
        this.addToCart(goods);
      }
    },
  },
  computed: {
    ...mapState("m_cart", ["cart"]),
    ...mapGetters("m_cart", ["total"]),
  },
  watch: {
    total: {
      immediate: true,
      handler(newval) {
        const findresult = this.options.find((x) => x.text == "购物车");
        if (findresult) {
          findresult.info = newval;
        }
      },
    },
  },
  onLoad(options) {
    // 获取商品 Id
    const goods_id = options.goods_id;
    // 调用请求商品详情数据的方法
    this.getGoodsDetail(goods_id);
  },
};
</script>

<style lang="scss">
swiper {
  height: 450rpx;

  image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
// 商品信息区域的样式
.goods-info-box {
  padding: 10px;
  padding-right: 0;

  .price {
    color: #feb103;
    font-size: 18px;
    margin: 10px 0;
  }

  .goods-info-body {
    display: flex;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
      padding-right: 10px;
    }
    // 收藏区域
    .favi {
      width: 120px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #efefef;
      color: gray;
    }
  }

  // 运费
  .yf {
    margin: 10px 0;
    font-size: 12px;
    color: gray;
  }
}
.goods-detail-container {
  // 给页面外层的容器，添加 50px 的内padding，
  // 防止页面内容被底部的商品导航组件遮盖
  padding-bottom: 50px;
}

.goods_nav {
  // 为商品导航组件添加固定定位
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>

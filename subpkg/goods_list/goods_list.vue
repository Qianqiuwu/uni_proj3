<template>
  <view>
    <view class="goods-list">
      <view v-for="(item, i) in goodsList" :key="i" @click="gotoDetail(item)">
        <my-goods :goods="item"></my-goods>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      queryObj: {
        // 查询关键词,搜索页面
        query: "",
        // 商品分类Id，分类页面
        cid: "",
        // 页码值
        pagenum: 1,
        // 每页显示多少条数据
        pagesize: 10,
      },
      // 商品列表的数据
      goodsList: [],
      // 总数量，用来实现分页
      total: 0,
      // 节流阀
      isloading: false,
    };
  },
  methods: {
    async getGoodsList(cb) {
      this.isloading = true;
      const { data: res } = await uni.$http.get(
        "/api/public/v1/goods/search",
        this.queryObj
      );
      this.isloading = false;
      cb && cb();
      if (res.meta.status !== 200) return uni.$showMsg();
      // 页面加载后覆盖旧数据
      this.goodsList = [...this.goodsList, ...res.message.goods];
      this.total = res.message.total;
    },
    gotoDetail(item) {
      uni.navigateTo({
        url: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id,
      });
    },
  },
  onLoad(options) {
    this.queryObj.cid = options.cid || "";
    this.queryObj.query = options.query || "";
    this.getGoodsList();
  },
  // 上拉刷新
  onReachBottom() {
    // 重要的代码
    if (this.queryObj.pagenum * this.queryObj.pagenum >= this.total)
      return uni.$showMsg("数据加载完成！");
    if (this.isloading) return;
    this.queryObj.pagenum += 1;
    this.getGoodsList();
  },
  //
  onPullDownRefresh() {
    this.queryObj.pagenum = 1;
    this.total = 0;
    this.goodsList = [];
    this.isloading = false;
    this.getGoodsList(() => {
      uni.stopPullDownRefresh();
    });
  },
};
</script>

<style lang="scss"></style>

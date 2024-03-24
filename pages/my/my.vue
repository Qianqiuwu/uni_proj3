<template>
  <view class="my-container">
    <my-login v-if="!token"></my-login>

    <!-- 用户登录后，显示用户信息组件 -->
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
import badgeMix from "@/mixins/tabbar-badge.js";
import { mapState } from "vuex";
export default {
  mixins: [badgeMix],
  data() {
    return {};
  },
  onLoad() {},
  methods: {},
  computed: {
    // 2. 从 m_user 模块中导入需要的 token 字符串
    ...mapState("m_user", ["token"]),
  },
};
</script>

<style>
page,
.my-container {
  height: 100%;
}
</style>

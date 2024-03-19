// #ifndef VUE3
import Vue from "vue";
import App from "./App";
//导入网络请求包
import { $http } from "@escook/request-miniprogram";
// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http;
$http.baseUrl = "https://api-hmugo-web.itheima.net";
// 请求开始之前做一些事情（请求拦截器）
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: "数据加载中...",
  });
};

// 请求完成之后做一些事情（响应拦截器）
$http.afterRequest = function () {
  uni.hideLoading();
};
// 当数据请求失败之后，经常需要调用 uni.showToast({ /* 配置对象 */ }) 方法来提示用户。此时，可以在全局封装一个 uni.$showMsg() 方法，来简化 uni.showToast() 方法的调用。具体的改造步骤如下：
uni.$showMsg = function (title = "数据加载失败", duration = 1500) {
  uni.showToast({
    title,
    duration,
	icon: "none",
  });
};
Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
// #endif

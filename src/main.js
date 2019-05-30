import Vue from "vue";
import App from "./App.vue";
import Anchor from "../packages/index"
Vue.use(Anchor)

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

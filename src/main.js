import Vue from "vue";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    // fournit le store avec l'option `store`.
    // cela injectera l'instance du store dans tous les composants enfants.
    store,
}).$mount("#app");

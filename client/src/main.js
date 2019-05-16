import Vue from "vue";
import App from "./App.vue";
// Vuetify Package
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader
// VueSocketIO packagae
import VueSocketIO from "vue-socket.io";

Vue.use(Vuetify);
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://localhost:8500" // Local Express Server
  })
);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

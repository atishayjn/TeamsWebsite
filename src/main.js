import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import WebRTC from "vue-webrtc";
import * as io from "socket.io-client";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faVideo,
  faUser,
  faPodcast,
} from "@fortawesome/free-solid-svg-icons";

Vue.config.productionTip = false;
Vue.use(WebRTC);

library.add(faTrash, faVideo, faUser, faPodcast);
window.io = io;

// Mount App
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

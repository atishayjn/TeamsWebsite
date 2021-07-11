import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/AppHome.vue";
import Login from "../views/AppLogin.vue";
import Register from "../views/AppRegister.vue";
import TeamsList from "../views/TeamsList.vue";
import TeamsCheckIn from "../views/TeamsCheckIn.vue";
import TeamsCall from "../views/TeamsCall.vue";
import OpenCheckIn from "../views/OpenCheckIn.vue";
import OpenCall from "../views/OpenCall.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/rooms",
    name: "TeamsList",
    component: TeamsList,
  },
  {
    path: "/checkin/:hostID/:roomID",
    name: "TeamsCheckIn",
    component: TeamsCheckIn,
  },
  {
    path: "/chat/:hostID/:roomID",
    name: "TeamsCall",
    component: TeamsCall,
  },
  {
    path: "/meet",
    name: "OpenCheckIn",
    component: OpenCheckIn,
  },
  {
    // Pass host ID here and use it as room name for jitsi.
    path: "/meet/:meetName/:hostID",
    name: "OpenCall",
    component: OpenCall,
  },
  {
    // default path
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;

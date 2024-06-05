import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeComponent from "../components/HomeComponent.vue";
import LoginComponent from "../components/Auth/LoginComponent.vue";
import RegisterComponent from "../components/Auth/RegisterComponent.vue";
import MeetupComponent from "../components/Meetup/MeetupComponent.vue";
import store from "../store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomeComponent,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginComponent,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterComponent,
  },
  {
    path: "/meetup",
    name: "Meetup",
    component: MeetupComponent,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !store.getters.isAuthenticated
  ) {
    next("/login");
  } else {
    next();
  }
});

export default router;

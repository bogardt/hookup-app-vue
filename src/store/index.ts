import { createStore } from "vuex";
import auth from "./auth";
import meetups from "./meetups";

const store = createStore({
  modules: {
    auth,
    meetups,
  },
});

export default store;

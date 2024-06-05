import apiClient from "@/axiosConfig";
import { ActionContext } from "vuex";
import { State as MeetupState } from "./meetups"; // Import the State type from meetups module

interface User {
  id: number;
  name: string;
  email: string;
}

interface State {
  user: User | null;
  token: string;
}

const state: State = {
  user: null,
  token: localStorage.getItem("token") || "",
};

interface RootState {
  auth: State;
  meetups: MeetupState;
}

const getters = {
  isAuthenticated: (state: State) => !!state.token,
  getUser: (state: State) => state.user,
};

const actions = {
  async register(
    { commit }: ActionContext<State, RootState>,
    user: { name: string; email: string; password: string }
  ) {
    try {
      const response = await apiClient.post("/register", user);
      commit("setUser", response.data.user);
      commit("setToken", response.data.token);
    } catch (error) {
      console.error("Failed to register:", error);
    }
  },
  async login(
    { commit }: ActionContext<State, RootState>,
    user: { email: string; password: string }
  ) {
    try {
      const response = await apiClient.post("/login", user);
      commit("setUser", response.data.user);
      commit("setToken", response.data.token);
    } catch (error) {
      console.error("Failed to login:", error);
    }
  },
  logout({ commit }: ActionContext<State, RootState>) {
    commit("clearUser");
    localStorage.removeItem("token");
  },
};

const mutations = {
  setUser(state: State, user: User) {
    state.user = user;
  },
  setToken(state: State, token: string) {
    state.token = token;
    localStorage.setItem("token", token);
  },
  clearUser(state: State) {
    state.user = null;
    state.token = "";
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

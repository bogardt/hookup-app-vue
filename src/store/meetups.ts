import apiClient from "@/axiosConfig";
import { ActionContext } from "vuex";

export interface Meetup {
  id: number;
  distance: number;
  photo: string;
  description: string;
}

export interface State {
  meetups: Meetup[];
}

interface RootState {
  meetups: State;
}

const state: State = {
  meetups: [],
};

const getters = {
  getMeetups: (state: State) => state.meetups,
};

const actions = {
  async fetchMeetups(
    { commit }: ActionContext<State, RootState>,
    distance: number
  ) {
    try {
      const response = await apiClient.get(`/meetups?distance=${distance}`);
      commit("setMeetups", response.data);
    } catch (error) {
      console.error("Failed to fetch meetups:", error);
    }
  },
  async createMeetup(
    { dispatch }: ActionContext<State, RootState>,
    meetup: FormData
  ) {
    try {
      await apiClient.post("/meetups", meetup);
      const distance = Number(meetup.get("distance"));
      dispatch("fetchMeetups", distance);
    } catch (error) {
      console.error("Failed to create meetup:", error);
    }
  },
};

const mutations = {
  setMeetups(state: State, meetups: Meetup[]) {
    state.meetups = meetups;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

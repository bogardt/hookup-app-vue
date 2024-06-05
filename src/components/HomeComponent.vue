<template>
  <div class="container">
    <h1>Welcome to Hookup App</h1>
    <p>
      This is the home page of our Hookup App. Please login or register to start
      meeting new people around you.
    </p>
    <router-link class="btn btn-primary" to="/login" v-if="!isAuthenticated"
      >Login</router-link
    >
    <router-link
      class="btn btn-secondary"
      to="/register"
      v-if="!isAuthenticated"
      >Register</router-link
    >
    <router-link class="btn btn-success" to="/meetup" v-if="isAuthenticated"
      >View Meetups</router-link
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "HomeComponent",
  setup() {
    const store = useStore();

    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    return {
      isAuthenticated,
    };
  },
});
</script>

<style>
.container {
  text-align: center;
  margin-top: 50px;
}

.btn {
  margin: 5px;
}
</style>

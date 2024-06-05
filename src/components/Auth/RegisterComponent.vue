<template>
  <div class="container">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "RegisterComponent",
  setup() {
    const store = useStore();
    const router = useRouter();
    const name = ref("");
    const email = ref("");
    const password = ref("");

    const register = async () => {
      try {
        await store.dispatch("register", {
          name: name.value,
          email: email.value,
          password: password.value,
        });
        router.push("/");
      } catch (error) {
        console.error("Failed to register:", error);
      }
    };

    return {
      name,
      email,
      password,
      register,
    };
  },
});
</script>

<template>
  <div class="container">
    <h2>Meetups</h2>
    <div class="mb-3">
      <label for="distance" class="form-label">Distance</label>
      <select
        id="distance"
        class="form-select"
        v-model="selectedDistance"
        @change="fetchMeetups"
      >
        <option value="100">100m</option>
        <option value="500">500m</option>
        <option value="1000">1km</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="photo" class="form-label">Photo</label>
      <input
        type="file"
        class="form-control"
        id="photo"
        @change="onFileChange"
      />
    </div>
    <button class="btn btn-primary" @click="submitMeetup">Submit</button>
    <div class="mt-3">
      <h3>Meetups in {{ selectedDistance }}m radius</h3>
      <ul class="list-group">
        <li class="list-group-item" v-for="meetup in meetups" :key="meetup.id">
          <img :src="meetup.photo" alt="Meetup photo" class="img-thumbnail" />
          <p>{{ meetup.description }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "MeetupComponent",
  setup() {
    const store = useStore();
    const selectedDistance = ref<number>(100);
    const meetups = ref([]);

    const fetchMeetups = async () => {
      await store.dispatch("fetchMeetups", selectedDistance.value);
      meetups.value = store.getters.getMeetups;
    };

    const photo = ref<File | null>(null);

    const onFileChange = (event: Event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        photo.value = files[0];
      }
    };

    const submitMeetup = async () => {
      if (!photo.value) return;

      const formData = new FormData();
      formData.append("photo", photo.value);
      formData.append("distance", selectedDistance.value.toString());

      await store.dispatch("createMeetup", formData);
      fetchMeetups();
    };

    onMounted(fetchMeetups);

    return {
      selectedDistance,
      meetups,
      onFileChange,
      submitMeetup,
    };
  },
});
</script>

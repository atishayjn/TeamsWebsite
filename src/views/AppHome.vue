<template>
  <div class="mt-3">
    <div v-if="user" class="text-center">
      <h4>
        Hi
        <span class="font-weight-bold text-info">{{ user.displayName }}!</span>
      </h4>
    </div>
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-10 col-md-10 col-lg-8 col-xl-7">
          <h4 class="display-4 text-primary mb-2">
            Welcome to Microsoft Teams
          </h4>
          <p class="lead">
            Meet, chat, call, and collaborate in just one place.
          </p>
          <router-link
            v-if="!user"
            class="btn btn-outline-primary mx-1"
            to="/login"
            >Log In</router-link
          >
          <router-link
            v-if="!user"
            class="btn btn-outline-primary mx-1"
            to="/register"
            >Register</router-link
          >
          <router-link v-if="user" class="btn btn-primary mx-1" to="/meet"
            >Start Open Meeting</router-link
          >
          <router-link v-if="user" class="btn btn-primary mx-1" to="/rooms"
            >Teams List</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHome",
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
};
</script>

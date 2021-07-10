<template>
  <div>
    <nav class="navbar navbar-expand bg-primary navbar-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/"
          ><span class="h2 pr-1">Teams</span>
          <span v-if="user" class="navbar-text small">
            : Hi
            <span class="font-weight-bold text-white">
              {{ user.displayName }}
            </span>
          </span>
        </router-link>
        <div class="navbar-nav ml-auto">
          <router-link v-if="!user" class="nav-item nav-link" to="/login"
            >Log in</router-link
          >
          <router-link v-if="!user" class="nav-item nav-link" to="/register"
            >Register</router-link
          >
          <router-link v-if="user" class="nav-item nav-link" to="/rooms"
            >Your Teams</router-link
          >
          <button
            v-if="user"
            class="nav-item nav-link btn btn-link"
            @click="$emit('logout')"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "AppNavigation",
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
};
</script>

<template>
  <div>
    <nav class="navbar navbar-expand bg-primary navbar-dark">
      <div class="container-fluid">
        <!-- Brand Name -->
        <router-link class="navbar-brand me-2" to="/"
          ><span class="h2">vTeams</span>
          <span v-if="user" class="h2 navbar-text"> | </span>
        </router-link>
        <!-- Navigations Items -->
        <div
          v-if="user"
          id="navbarNavAltMarkup"
          class="collapse navbar-collapse"
        >
          <div class="navbar-nav">
            <router-link class="nav-link nav-item" to="/">Home</router-link>
            <router-link class="nav-link nav-item" to="/rooms">
              Your Teams
            </router-link>
          </div>
        </div>
        <!-- Login Options -->
        <div class="navbar-nav ml-auto">
          <router-link v-if="!user" class="nav-item nav-link" to="/login"
            >Log in
          </router-link>
          <router-link v-if="!user" class="nav-item nav-link" to="/register"
            >Register
          </router-link>
          <router-link v-if="user" class="nav-item nav-link" to="/">
            Hi
            <span class="font-weight-bold text-white">
              {{ user.displayName }}
            </span>
          </router-link>
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

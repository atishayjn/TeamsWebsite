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
          <h4 class="display-4 text-primary mb-2">Welcome to vTeams</h4>
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
          <router-link
            v-if="user"
            class="btn btn-primary mx-1"
            title="Open Meetings can be joined even without logging-in"
            to="/meet"
            >Start Open Meeting</router-link
          >
          <router-link v-if="user" class="btn btn-primary mx-1" to="/rooms"
            >Your Teams</router-link
          >
        </div>
      </div>
      <div class="row justify-content-center mt-5 ms-5 me-2 pt-5">
        <div class="col-lg-6 border border-2 text-start lead">
          <small>
            Instructions:
            <ol>
              <li>
                Select <strong>Start Open Meeting</strong> to instantly start a
                new meeting which can be joined even without logging-in.
              </li>
              <li>
                Select <strong>Your Teams</strong> to see and create new Teams.
                Within Teams you can save chats and have host controlled
                meetings.
              </li>
            </ol>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * This is the Home Page Component.
 */

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

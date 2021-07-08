<template>
  <form class="mt-3" @submit.prevent="handleCheckIn">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="card bg-light">
            <div v-if="user" class="card-body">
              <h1 class="font-weight-light mb-0">Check in</h1>
              <p class="font-weight-bold">Enter Meeting Name:</p>
              <section class="form-group">
                <label class="form-control-label sr-only" for="meetName"
                  >Meeting Name</label
                >
                <input
                  v-model="meetName"
                  required
                  class="form-control"
                  type="text"
                />
              </section>
              <div class="form-group text-right mb-0">
                <button class="btn btn-primary" type="submit">Check in</button>
              </div>
            </div>
            <div v-else class="card-body card-outline-danger text-center">
              <h1 class="text-danger card-title">Sorry</h1>
              <p class="card-text lead">
                Sorry, only registered users can start a meeting. Please
                <router-link to="/login">login</router-link> or
                <router-link to="/register">register</router-link> and try
                again.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  data: function () {
    return {
      // Find a way to pass meet name to InstantChat (Can pass in URL).
      meetName: null,
    };
  },
  methods: {
    handleCheckIn: function () {
      // Multiword meet names look weird on URL find another way.
      this.$router.push(`/meet/${this.meetName}/${this.user.uid}`);
    },
  },
};
</script>

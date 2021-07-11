<template>
  <form class="mt-3" @submit.prevent="handleCheckIn">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="card bg-light">
            <div v-if="user" class="card-body">
              <h3 class="font-weight-light mb-0">Enter Meeting Name</h3>
              <p class="font-weight-bold"></p>
              <section class="form-group">
                <input
                  v-model="meetName"
                  required
                  class="form-control"
                  type="text"
                  title="Enter Meeting Name"
                  placeholder="Meeting Name"
                />
              </section>
              <div class="form-group text-right mt-2">
                <button
                  class="btn btn-primary"
                  type="submit"
                  title="Start Meeting"
                >
                  Start Meeting
                </button>
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

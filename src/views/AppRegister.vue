<template>
  <div>
    <form class="mt-3" @submit.prevent="register">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card bg-light">
              <div class="card-body">
                <h3 class="font-weight-light mb-3">Register</h3>
                <div class="form-row">
                  <div v-if="error" class="col-12 alert alert-danger px-3">
                    {{ error }}
                  </div>
                  <section class="col-sm-12 form-group">
                    <label class="form-control-label sr-only" for="displayName"
                      >Display Name</label
                    >
                    <input
                      id="displayName"
                      v-model="displayName"
                      class="form-control mb-1"
                      type="text"
                      placeholder="Display Name"
                      name="displayName"
                      required
                    />
                  </section>
                </div>
                <section class="form-group">
                  <label class="form-control-label sr-only" for="email"
                    >Email</label
                  >
                  <input
                    id="email"
                    v-model="email"
                    class="form-control mb-2"
                    type="email"
                    placeholder="Email Address"
                    required
                    name="email"
                  />
                </section>
                <div class="form-row">
                  <section class="col-sm-6 form-group">
                    <input
                      v-model="passOne"
                      class="form-control mb-1"
                      type="password"
                      placeholder="Password"
                    />
                  </section>
                  <section class="col-sm-6 form-group">
                    <input
                      v-model="passTwo"
                      class="form-control mb-1"
                      type="password"
                      required
                      placeholder="Repeat Password"
                    />
                  </section>
                </div>
                <div class="form-group text-right mb-0">
                  <button class="btn btn-primary" type="submit">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <p class="text-center mt-2">
      or
      <router-link to="/login">login</router-link>
    </p>
  </div>
</template>

<script>
import Firebase from "firebase";

export default {
  data: function () {
    return {
      displayName: null,
      email: null,
      passOne: null,
      passTwo: null,
      error: null,
    };
  },

  watch: {
    passTwo: function () {
      /**
       * This function checks if the repeated password matches
       * with the original password.
       */
      if (
        this.passOne !== "" &&
        this.passTwo !== "" &&
        this.passTwo !== this.passOne
      ) {
        this.error = "Password do not match.";
      } else {
        this.error = null;
      }
    },
  },

  methods: {
    register: function () {
      const info = {
        email: this.email,
        password: this.passTwo,
        displayName: this.displayName,
      };
      if (!this.error) {
        // Add new user to database.
        Firebase.auth()
          .createUserWithEmailAndPassword(info.email, info.password)
          .then(
            // Add username to the record.
            (userCredentials) => {
              return userCredentials.user
                .updateProfile({
                  displayName: info.displayName,
                })
                .then(() => {
                  this.$router.replace("/");
                });
            },
            (error) => {
              this.error = error.message;
            }
          );
      }
    },
  },
};
</script>

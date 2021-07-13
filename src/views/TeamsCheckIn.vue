<template>
  <form class="mt-3" @submit.prevent="handleCheckIn">
    <div class="container">
      <div class="row justify-content-center mb-5">
        <div class="col-lg-6">
          <div class="card bg-light">
            <div v-if="user" class="card-body">
              <h1 class="font-weight-light mb-0">Check in</h1>
              <p v-if="roomName" class="font-weight-bold">
                To: <span class="text-primary">{{ roomName }}</span>
              </p>
              <section class="form-group">
                <label class="form-control-label sr-only" for="displayName">
                  Name
                </label>
                <input
                  v-model="displayName"
                  required
                  class="form-control"
                  type="text"
                  placeholder="Your Name (for this team)"
                />
              </section>
              <div class="form-group text-right mb-0 pt-2">
                <button class="btn btn-primary" type="submit">Check in</button>
              </div>
            </div>
            <div v-else class="card-body card-outline-danger text-center">
              <h1 class="text-danger card-title">Sorry</h1>
              <p class="card-text lead">
                Sorry, access to rooms is only available to registered users.
                Please
                <router-link to="/login">login</router-link> or
                <router-link to="/register">register</router-link> and try
                again.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="user" class="row justify-content-center pb-5">
        <div class="col-md-4"><InviteBox /></div>
      </div>
    </div>
  </form>
</template>

<script>
import Firebase from "firebase";
import db from "../db.js";
import InviteBox from "@/components/InviteLinkBox";

export default {
  components: {
    InviteBox,
  },

  props: {
    user: {
      type: Object,
      default: null,
    },
  },

  data: function () {
    return {
      hostID: this.$route.params.hostID,
      roomID: this.$route.params.roomID,
      displayName: null,
      roomName: null,
    };
  },

  mounted() {
    // Get the User displayName.
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.displayName = user.displayName;
      }
    });

    // Get the Room Name.
    db.collection("users")
      .doc(this.$route.params.hostID)
      .collection("rooms")
      .doc(this.$route.params.roomID)
      .get()
      .then((doc) => {
        // Check if such room exists.
        if (doc.exists) {
          this.roomName = doc.data().name;
        } else {
          this.$router.push("/");
        }
      });
  },

  methods: {
    handleCheckIn: function () {
      // Add the newly checked-in room to the list of rooms of the current user.
      if (this.user.uid != this.hostID) {
        db.collection("users")
          .doc(this.user.uid)
          .collection("rooms")
          .doc(this.roomID)
          .set({
            name: this.roomName,
            hostID: this.hostID,
            createdAt: Firebase.firestore.FieldValue.serverTimestamp(),
          });
      }

      // Add user to the list of attendees.
      this.$emit("checkIn", {
        hostID: this.hostID,
        roomID: this.roomID,
        roomName: this.roomName,
        displayName: this.displayName,
      });
    },
  },
};
</script>

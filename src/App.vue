<template>
  <div id="app">
    <AppNavigation :user="user" @logout="logout" />
    <router-view
      :user="user"
      :rooms="rooms"
      @logout="logout"
      @addRoom="addRoom"
      @deleteRoom="deleteRoom"
      @checkIn="checkIn"
    />
    <AppFooter />
  </div>
</template>

<script>
import db from "./db.js";
import Firebase from "firebase";
import AppNavigation from "@/components/AppNavigation";
import AppFooter from "@/components/AppFooter";

export default {
  name: "App",
  components: {
    AppNavigation,
    AppFooter,
  },
  data: function () {
    return {
      user: null,
      rooms: [],
    };
  },
  mounted() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Change Current User.
        this.user = user;
        // Get Rooms List for Current User.
        db.collection("users")
          .doc(this.user.uid)
          .collection("rooms")
          .onSnapshot((snapshot) => {
            const snapData = [];
            snapshot.forEach((doc) => {
              snapData.push({
                id: doc.id,
                name: doc.data().name,
                //----ADD HOST-ID here---
              });
            });
            this.rooms = snapData.sort((a, b) => {
              // Custom Comparator.
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              } else {
                return 1;
              }
            });
          });
      }
    });
  },
  methods: {
    logout: function () {
      Firebase.auth()
        .signOut()
        .then(() => {
          this.user = null;
          this.$router.push("/");
        });
    },
    addRoom: function (payload) {
      console.log(payload);
      db.collection("users").doc(this.user.uid).collection("rooms").add({
        name: payload,
        hostID: this.user.uid,
        createdAt: Firebase.firestore.FieldValue.serverTimestamp(),
      });
    },
    deleteRoom: function (payload) {
      db.collection("users")
        .doc(this.user.uid)
        .collection("rooms")
        .doc(payload)
        .delete();
    },
    checkIn: function (payload) {
      const roomRef = db
        .collection("users")
        .doc(payload.hostID)
        .collection("rooms")
        .doc(payload.roomID);

      // Add user to the list of attendees.
      roomRef.get().then((doc) => {
        if (doc.exists) {
          roomRef
            .collection("attendees")
            .doc(this.user.uid)
            .set({
              displayName: payload.displayName,
              createdAt: Firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() =>
              this.$router.push(`/chat/${payload.hostID}/${payload.roomID}`)
            );
        }
      });

      // Add the newly checked-in room to the list of rooms.
      if (this.user.uid != payload.hostID) {
        // Try doing this by calling addRoom method (hostID parameter to be passed in payload).
        db.collection("users").doc(this.user.uid).collection("rooms").add({
          name: payload.roomName,
          hostID: payload.hostID,
          createdAt: Firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
    },
  },
};
</script>

<style lang="scss">
$primary: #494b83;
@import "node_modules/bootstrap/scss/bootstrap";
</style>

<template>
  <div class="container-fluid mt-4">
    <div class="mb-3">
      <span class="mb-0 h2 text-primary">{{ roomName }}</span>
      <span v-if="user" class="ml-1">
        Hosted by: <strong class="text-danger">{{ hostDisplayName }} </strong>
      </span>
    </div>
    <div v-if="(user && user.uid == hostID) || attendeeApproved">
      <div class="row">
        <div class="col-md">
          <button
            v-if="!attendeeJoined && attendeeApproved"
            class="btn btn-primary me-1"
            @click="doJoin"
          >
            Join Call
          </button>
          <button
            v-if="attendeeApproved"
            type="button"
            class="btn btn-danger mr-1"
            @click="doLeaveRoom"
          >
            Exit Room
          </button>
        </div>
        <div class="col-md">
          <h4 class="mt-2">Attendees</h4>
          <ul class="list-unstyled">
            <li v-for="attendee in attendeesApproved" :key="attendee.id">
              <a
                v-if="user && user.uid == hostID"
                type="button"
                class="px-1 text-danger"
                title="Refuse attendee"
                @click="toggleApproval(attendee.id)"
              >
                <font-awesome-icon icon="user"></font-awesome-icon>
              </a>
              <span
                class="pe-2"
                :class="[attendee.webRTCID ? 'text-success' : 'text-secondary']"
                title="Approved Attendee"
              >
                <font-awesome-icon icon="podcast"></font-awesome-icon>
              </span>
              <span
                class="pl-1"
                :class="[attendee.id == user.uid ? 'font-weight-bold' : '']"
                >{{ attendee.displayName }}</span
              >
            </li>
          </ul>
        </div>
        <div class="col-md">
          <div v-if="user && user.uid == hostID">
            <h4 class="mt-2">Pending</h4>
            <ul class="list-unstyled">
              <li
                v-for="attendee in attendeesPending"
                :key="attendee.id"
                class="mb-1"
              >
                <span>
                  <a
                    type="button"
                    class="px-1 text-success"
                    title="Approve attendee"
                    @click="toggleApproval(attendee.id)"
                  >
                    <font-awesome-icon icon="user"></font-awesome-icon>
                  </a>
                  <a
                    type="button"
                    class="text-secondary pe-2 text-danger"
                    title="Delete Attendee"
                    @click="deleteAttendee(attendee.id)"
                  >
                    <font-awesome-icon icon="trash"></font-awesome-icon>
                  </a>
                </span>
                <span class="pl-1">{{ attendee.displayName }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-4"></div>
      </div>
      <div class="row pb-4 ps-1">
        <div
          v-if="attendeeJoined && attendeeApproved"
          class="col-md-8 vh-100 pb-5"
        >
          <vue-jitsi-meet
            ref="jitsiRef"
            domain="meet.jit.si"
            :options="jitsiOptions"
          ></vue-jitsi-meet>
        </div>
        <div v-else class="border border-2 col-md-8 vh-100"></div>
        <div v-if="user" class="col-md-4 vh-100">
          <!-- eslint-disable-next-line -->
          <Chatbox :user="user" :hostID="hostID" :roomID="roomID" />
        </div>
      </div>
      <div class="row justify-content-center pb-5">
        <div class="col-md-4"><InviteBox /></div>
      </div>
    </div>
    <div v-else>
      <p v-if="user" class="lead">
        Hi
        <strong class="text-primary font-weight-bold">{{
          user.displayName
        }}</strong
        >, you're currently in the room waiting for the owner of the chat to add
        you to the meeting. Please wait.
      </p>
    </div>
  </div>
</template>

<script>
import db from "../db.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { JitsiMeet } from "@mycure/vue-jitsi-meet";
import Chatbox from "@/components/Chatbox";
import InviteBox from "@/components/InviteLinkBox";

export default {
  name: "TeamsCall",

  components: {
    FontAwesomeIcon,
    VueJitsiMeet: JitsiMeet,
    Chatbox,
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
      roomName: null,
      hostDisplayName: null,
      attendeesPending: [],
      attendeesApproved: [],
      attendeeApproved: false,
      attendeeJoined: true,
    };
  },

  computed: {
    jitsiOptions() {
      /**
       * This computed property computes the props to be passed to JitsiMeet.
       */
      return {
        roomName: this.roomID,
        noSSL: false,
        id: this.user.uid,
        role: "none",
        userInfo: {
          email: "user@email.com",
          displayName: this.user.displayName,
        },
        configOverwrite: {
          enableNoisyMicDetection: false,
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          SHOW_CHROME_EXTENSION_BANNER: false,
        },
        onload: this.onIFrameLoad,
      };
    },
  },

  mounted() {
    const roomRef = db
      .collection("users")
      .doc(this.hostID)
      .collection("rooms")
      .doc(this.roomID);

    // Get Room Name.
    roomRef.get().then((roomDocument) => {
      if (roomDocument.exists) {
        this.roomName = roomDocument.data().name;
      } else {
        this.$router.replace("/");
      }
    });

    // Collection "Attendees" contains "name" and "id" of attendess.
    roomRef.collection("attendees").onSnapshot((attendeeSnap) => {
      let userCheckedIn = false;
      const tempPending = [];
      const tempApproved = [];

      // Get Host Name and Check Attendees.
      attendeeSnap.forEach((attendeeDoc) => {
        // Check Attendees.
        if (this.user.uid == attendeeDoc.id) {
          userCheckedIn = true;
        }
        // Get Host Name.
        if (this.hostID == attendeeDoc.id) {
          this.hostDisplayName = attendeeDoc.data().displayName;
        }
        // Check Approved Attendees.
        if (attendeeDoc.data().approved) {
          tempApproved.push({
            id: attendeeDoc.id,
            displayName: attendeeDoc.data().displayName,
            approved: attendeeDoc.data().approved,
            webRTCID: attendeeDoc.data().webRTCID,
          });

          // If this attendee is current user, make it approved.
          if (this.user.uid == attendeeDoc.id) {
            this.attendeeApproved = true;
          }
        } else {
          if (this.user.uid == attendeeDoc.id) {
            this.attendeeApproved = false;
          }

          // Add all unapproved attendees to tempPending Array.
          tempPending.push({
            id: attendeeDoc.id,
            displayName: attendeeDoc.data().displayName,
            approved: attendeeDoc.data().approved,
            webRTCID: attendeeDoc.data().webRTCID,
          });
        }
      });
      this.attendeesPending = tempPending;
      this.attendeesApproved = tempApproved;

      // Redirect to Team CheckIn if user not checked-in already.
      if (!userCheckedIn) {
        this.$router.push(`/checkin/${this.hostID}/${this.roomID}`);
      }
    });
  },

  methods: {
    deleteAttendee: function (attendeeID) {
      if (this.user && this.user.uid == this.hostID) {
        db.collection("users")
          .doc(this.user.uid)
          .collection("rooms")
          .doc(this.roomID)
          .collection("attendees")
          .doc(attendeeID)
          .delete();
      }
    },
    toggleApproval: function (attendeeID) {
      if (this.user && this.user.uid == this.hostID) {
        const attendee_ref = db
          .collection("users")
          .doc(this.user.uid)
          .collection("rooms")
          .doc(this.roomID)
          .collection("attendees")
          .doc(attendeeID);

        attendee_ref.get().then((attendeeDoc) => {
          const approval_status = attendeeDoc.data().approved;
          attendee_ref.update({
            approved: !approval_status,
          });
        });
      }
    },
    doJoin() {
      this.attendeeJoined = true;
    },
    doLeaveRoom() {
      this.$router.push("/rooms");
    },
    onIFrameLoad() {
      /**
       * This function is called on Jitsi load.
       */
      // Give Meeting Name as Subject.
      this.$refs.jitsiRef.addEventListener(
        "participantRoleChanged",
        (event) => {
          this.$refs.jitsiRef.executeCommand("subject", this.roomName);
        }
      );
      // Toggle attendeeJoined on leave call (removes jitsi frame from the page).
      this.$refs.jitsiRef.addEventListener("videoConferenceLeft", (event) => {
        this.attendeeJoined = false;
      });
    },
  },
};
</script>

<style lang="scss">
.video-list {
  margin-bottom: 10px;
  background: transparent !important;
}
.video-item {
  width: 50%;
  display: inline-block;
  background: transparent !important;
}
.video-item video {
  width: 100%;
  height: auto;
}
</style>

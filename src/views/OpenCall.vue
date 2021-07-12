<template>
  <div class="container-fluid mt-4">
    <div class="mb-3">
      <span class="mb-0 h2 text-primary">{{ meetName }}</span>
    </div>
    <div class="row mb-5">
      <div class="col-md-8 vh-100 pb-5">
        <vue-jitsi-meet
          ref="jitsiRef"
          domain="meet.jit.si"
          :options="jitsiOptions"
        ></vue-jitsi-meet>
      </div>
      <div class="col-md-4"><Invite /></div>
    </div>
  </div>
</template>

<script>
import { JitsiMeet } from "@mycure/vue-jitsi-meet";
import Invite from "@/components/InviteLinkBox";

export default {
  name: "OpenCall",
  components: {
    VueJitsiMeet: JitsiMeet,
    Invite,
  },
  data: function () {
    return {
      meetName: this.$route.params.meetName,
      hostID: this.$route.params.hostID,
      // attendeeJoined: true,
    };
  },
  computed: {
    jitsiOptions() {
      return {
        // Use host id for room name.
        roomName: this.hostID,
        noSSL: false,
        // id: this.user.uid,
        // role: "none",
        userInfo: {
          email: "",
          displayName: "",
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
  methods: {
    onIFrameLoad() {
      this.$refs.jitsiRef.addEventListener(
        "participantRoleChanged",
        (event) => {
          this.$refs.jitsiRef.executeCommand("subject", this.meetName);
          // event.id = this.user.uid;
          // event.role = "participant";
        }
      );
      // Give an option to join again after leaving the meeting.
      this.$refs.jitsiRef.addEventListener("videoConferenceLeft", (event) => {
        // this.attendeeJoined = false;
        this.$router.push("/");
        // window.location.reload();
      });
    },
  },
};
</script>

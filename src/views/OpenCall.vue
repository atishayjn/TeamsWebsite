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
      <div class="col-md-4"><InviteBox /></div>
    </div>
  </div>
</template>

<script>
import { JitsiMeet } from "@mycure/vue-jitsi-meet";
import InviteBox from "@/components/InviteLinkBox";

export default {
  name: "OpenCall",

  components: {
    VueJitsiMeet: JitsiMeet,
    InviteBox,
  },

  data: function () {
    return {
      meetName: this.$route.params.meetName,
      hostID: this.$route.params.hostID,
    };
  },

  computed: {
    jitsiOptions() {
      /**
       * This computed property computes the props to be passed to JitsiMeet.
       */
      return {
        roomName: this.hostID,
        noSSL: false,
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
      /**
       * This function is called when Jitsi loads.
       */
      // Give Meeting Name as Subject.
      this.$refs.jitsiRef.addEventListener(
        "participantRoleChanged",
        (event) => {
          this.$refs.jitsiRef.executeCommand("subject", this.meetName);
        }
      );
      // Go to Home page on call leave.
      this.$refs.jitsiRef.addEventListener("videoConferenceLeft", (event) => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<template>
  <div class="card bg-light">
    <div class="card-body justify-content-center text-center">
      <h5 class="font-weight-light mb-0">Invite Link</h5>
      <div class="pt-3 pb-2">
        Share this link with others that you want in the meeting
        <br />
        <a
          ref="mylink"
          :href="inviteLink"
          class="text-dark"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ inviteLink }}
        </a>
      </div>
      <div v-if="!isCopy" class="form-group text-right mt-2">
        <button
          class="btn btn-primary"
          type="button"
          title="Click to copy URL"
          @click="copyURL"
        >
          Copy to Clipboard
        </button>
      </div>
      <div v-else class="form-group text-right mt-2">
        <button
          class="btn btn-primary"
          type="button"
          title="Click to copy URL again"
          @click="copyURL"
        >
          Link Copied
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      inviteLink: this.$router.currentRoute.path,
      isCopy: false,
    };
  },

  methods: {
    copyURL() {
      /**
       * This function copies the invite link to clipboard.
       */
      let Url = this.$refs.mylink;
      Url.innerHTML = window.location.href;

      const clipboardData =
        event.clipboardData ||
        window.clipboardData ||
        event.originalEvent?.clipboardData ||
        navigator.clipboard;

      clipboardData.writeText(Url.innerHTML);

      // Toggle isCopy status (to toggle button)
      if (!this.isCopy) {
        this.isCopy = true;
      }
    },
  },
};
</script>

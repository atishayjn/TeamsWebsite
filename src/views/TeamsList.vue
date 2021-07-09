<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-12 col-md-9 col-lg-7">
        <h1 class="font-weight-light text-center">Add a Team</h1>
        <!-- Add New Team/Room box -->
        <div class="card bg-light">
          <div class="card-body text-center">
            <form class="formgroup">
              <div class="input-group input-group-lg">
                <input
                  ref="roomName"
                  v-model="roomName"
                  type="text"
                  class="form-control"
                  name="roomName"
                  placeholder="Team name"
                  aria-describedby="buttonAdd"
                />
                <div class="input-group-append">
                  <button
                    id="buttonAdd"
                    type="submit"
                    class="btn btn-sm btn-info"
                    @click.prevent="handleAdd"
                  >
                    +
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Display the list of your Teams/Rooms -->
    <div class="row justify-content-center">
      <div class="col-11 col-md-8 col-lg-6">
        <div class="card border-top-0 rounded-0">
          <div class="card-body py-2">
            <h4 class="card-title m-0 text-center">Your Teams</h4>
          </div>
          <div class="list-group list-group-flush">
            <!-- Team/Room List Item-->
            <div
              v-for="item in rooms"
              :key="item.id"
              class="list-group-item d-flex"
            >
              <section
                class="btn-group align-self-center"
                role="group"
                aria-label="Room Options"
              >
                <!-- Delete Team/Room -->
                <button
                  class="btn btn-sm btn-outline-secondary"
                  title="Delete Team"
                  @click="$emit('deleteRoom', item.id)"
                >
                  <font-awesome-icon icon="trash"></font-awesome-icon>
                </button>
                <!-- CheckIn to Team/Room  -->
                <!-- CHECK HERE -->
                <router-link
                  class="btn btn-sm btn-outline-secondary"
                  title="Check In"
                  :to="`/checkIn/${item.hostID}/${item.id}`"
                >
                  <font-awesome-icon icon="user"></font-awesome-icon>
                </router-link>
                <!-- Start/Join Call -->
                <!-- CHECK HERE -->
                <router-link
                  class="btn btn-sm btn-outline-secondary"
                  title="Join Call"
                  :to="`/chat/${item.hostID}/${item.id}`"
                >
                  <font-awesome-icon icon="video"></font-awesome-icon>
                </router-link>
              </section>
              <!-- Team/Roome Name -->
              <section class="pl-3 text-left align-self-center mx-2">
                {{ item.name }}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Importing fontawesome components.
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "TeamsList",
  components: {
    FontAwesomeIcon,
  },
  props: {
    user: {
      type: Object,
      default: null,
    },
    rooms: {
      type: Array,
      default: null,
    },
  },
  data: function () {
    return {
      roomName: null,
    };
  },
  methods: {
    handleAdd: function () {
      // Check if input field (roomName) is empty.
      if (this.roomName != null) {
        this.$emit("addRoom", this.roomName);
        this.roomName = null;
        this.$refs.roomName.focus();
      }
    },
  },
};
</script>

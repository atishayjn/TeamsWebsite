<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-12 col-md-9 col-lg-7">
        <h1 class="font-weight-light text-center">Add a Team</h1>

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
    <div class="row justify-content-center">
      <div class="col-11 col-md-8 col-lg-6">
        <div class="card border-top-0 rounded-0">
          <div class="card-body py-2">
            <h4 class="card-title m-0 text-center">Your Teams</h4>
          </div>
          <div class="list-group list-group-flush">
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
                <button
                  class="btn btn-sm btn-outline-secondary"
                  title="Delete Team"
                  @click="$emit('deleteRoom', item.id)"
                >
                  <font-awesome-icon icon="trash"></font-awesome-icon>
                </button>

                <router-link
                  class="btn btn-sm btn-outline-secondary"
                  title="Check In"
                  :to="`/checkIn/${user.uid}/${item.id}`"
                >
                  <font-awesome-icon icon="user"></font-awesome-icon>
                </router-link>

                <router-link
                  class="btn btn-sm btn-outline-secondary"
                  title="Chat"
                  :to="`/chat/${user.uid}/${item.id}`"
                >
                  <font-awesome-icon icon="video"></font-awesome-icon>
                </router-link>
              </section>
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
      if (this.roomName != null) {
        this.$emit("addRoom", this.roomName);
        this.roomName = null;
        this.$refs.roomName.focus();
      }
    },
  },
};
</script>

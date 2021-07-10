<template>
  <div class="container">
    <h5 class="text-center">Team Messages</h5>
    <div class="messaging">
      <div class="inbox_msg">
        <div class="mesgs">
          <div class="msg_history">
            <div v-for="msg in messages" :key="msg.createdAt.seconds">
              <div
                :class="[
                  msg.author_id == user.uid ? 'sent_msg' : 'received_msg',
                ]"
              >
                <span class="time_date">
                  {{ msg.author }}
                </span>
                <p>{{ msg.message }}</p>
              </div>
            </div>
          </div>
          <div class="type_msg">
            <div class="input_msg_write">
              <input
                v-model="message"
                type="text"
                class="write_msg"
                placeholder="Type a message"
                @keyup.enter="saveMessage"
              />
              <button class="msg_send_btn" type="button" @click="saveMessage">
                &#10148;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/db.js";

export default {
  name: "Chatbox",
  props: {
    user: {
      type: Object,
      default: null,
    },
    hostID: {
      type: String,
      default: null,
    },
    roomID: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      message: null,
      messages: [],
    };
  },
  created() {
    this.fetchMessages();
  },
  methods: {
    fetchMessages() {
      // Fetch from firebase and feed to messages.
      db.collection("users")
        .doc(this.hostID)
        .collection("rooms")
        .doc(this.roomID)
        .collection("messages")
        .orderBy("createdAt")
        .onSnapshot((querySnapshot) => {
          let allMessages = [];
          querySnapshot.forEach((doc) => {
            allMessages.push(doc.data());
          });
          this.messages = allMessages;
        });

      // Scroll to bottom when new message fetched.
      setTimeout(() => {
        this.scrollToBottom();
      }, 500);
    },

    saveMessage() {
      // Save to firestore.
      db.collection("users")
        .doc(this.hostID)
        .collection("rooms")
        .doc(this.roomID)
        .collection("messages")
        .add({
          message: this.message,
          createdAt: new Date(),
          author: this.user.displayName,
          author_id: this.user.uid,
        })
        .then(() => {
          this.scrollToBottom();
        });

      // Clear Typed Message.
      this.message = null;
    },

    // To scroll to the bottom of chat window.
    scrollToBottom() {
      let box = document.querySelector(".msg_history");
      box.scrollTop = box.scrollHeight;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 100%;
  margin: auto;
  float: right;
}
img {
  max-width: 100%;
}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%;
  border-right: 1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac {
  margin: 20px 0 0;
}

.recent_heading {
  float: left;
  width: 40%;
}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
}
.headind_srch {
  padding: 10px 29px 10px 20px;
  overflow: hidden;
  border-bottom: 1px solid #c4c4c4;
}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}
.srch_bar input {
  border: 1px solid #cdcdcd;
  border-width: 0 0 1px 0;
  width: 80%;
  padding: 2px 0 4px 6px;
  background: none;
}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon {
  margin: 0 0 0 -27px;
}

.chat_ib h5 {
  font-size: 15px;
  color: #464646;
  margin: 0 0 8px 0;
}
.chat_ib h5 span {
  font-size: 13px;
  float: right;
}
.chat_ib p {
  font-size: 14px;
  color: #989898;
  margin: auto;
}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people {
  overflow: hidden;
  clear: both;
}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat {
  height: 550px;
  overflow-y: scroll;
}

.active_chat {
  background: #ebebeb;
}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
}
.received_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg {
  width: 57%;
}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 100%;
}

.sent_msg p {
  background: #494b83 none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0;
  color: #fff;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.outgoing_msg {
  overflow: hidden;
  margin: 26px 0 26px;
}
.sent_msg {
  float: right;
  width: 64%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {
  border-top: 1px solid #c4c4c4;
  position: relative;
}
.msg_send_btn {
  background: #494b83 none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.messaging {
  padding: 0 0 50px 0;
}
.msg_history {
  height: 516px;
  overflow-y: auto;
}
</style>

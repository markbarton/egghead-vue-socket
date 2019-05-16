<template>
  <v-card color="indigo" class="white--text mx-auto">
    <v-card-title class="mb-0 pb-0">
      <v-icon large left dark>record_voice_over</v-icon>
      <div class="title font-weight-light text-md-left">Send Message</div>
      <v-container>
        <v-layout row wrap>
          <v-flex md6 xs12 class="pr-2">
            <v-select dark :items="names" label="Person" v-model="name"></v-select>
          </v-flex>
          <v-flex md6 xs12>
            <v-select dark :items="groups" label="Group" v-model="group"></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex md12 xs12>
            <v-textarea outline dark label="Message to send" v-model="message"></v-textarea>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex md6 xs12>
            <v-select dark :items="colors" label="Message Color" v-model="color"></v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-title>

    <v-card-actions class="mt-0 pt-0">
      <v-btn color="green" dark @click="sendMessage()">Send Message To User</v-btn>
      <v-btn color="purple" dark @click="sendMessage(true)">Send Message To Group</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    message: "",
    groups: ["Alpha", "Beta", "Charlie"],
    names: ["John Adams", "Judy Mason", "Amy Smith", "Jack White"],
    colors: ["red", "pink", "purple", "black"],
    name: "",
    group: "",
    color: "red"
  }),

  methods: {
    sendMessage(send_to_group = false) {
      const message_data = {};
      if (send_to_group) {
        message_data.group = this.group;
      } else {
        message_data.name = this.name;
      }
      message_data.color = this.color;
      message_data.message = this.message;
      this.$socket.emit("SEND_MESSAGE", message_data);
    }
  }
};
</script>
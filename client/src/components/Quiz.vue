<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <v-card-title class="headline">Select what the Image is</v-card-title>
      <v-img :src="image" aspect-ratio="2"></v-img>
      <v-layout row>
        <v-flex xs5 offset-xs1>
          <v-select :items="['Dog', 'Cat', 'Bird']" v-model="answer" label="Image" required></v-select>
        </v-flex>
        <v-flex xs4 offset-xs1>
          <v-btn color="green darken-1" @click="send_response()" >Send Answer</v-btn>
        </v-flex>
      </v-layout>

      <v-card-actions>
        <v-alert
          :value="server_result"
          type="success"
          icon="check_circle"
          outline
          >{{ server_result }}</v-alert>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  sockets: {
    SHOW_IMAGE: function(socket_data) {
      this.image = "data:image/jpeg;base64," + socket_data.buffer;
      this.dialog = true;
      this.answer = "";
      this.server_result = "";
    }
  },
  data: () => ({
    dialog: false,
    answer: "",
    image: "",
    server_result: ""
  }),

  methods: {
    send_response() {
      const message_data = {};
      message_data.response = this.answer;
      this.$socket.emit("QUIZ_RESPONSE", message_data, result => {
        this.server_result = result;
      });
    }
  }
};
</script>

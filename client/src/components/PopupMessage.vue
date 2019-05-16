<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" :color="color" top>
    {{notification_text}}
    <v-btn flat @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    snackbar: false,
    notification_text: "",
    timeout: 3000,
    color: "success"
  }),

  sockets: {
    POPUP_NOTIFICATION: function(socket_data) {
      this.notification_text = socket_data.message;
      this.color = socket_data.color || "success";

      // Display
      this.snackbar = true;
    }
  }
};
</script>``
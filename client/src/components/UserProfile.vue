<template>
  <v-card color="blue-grey darken-2" class="mx-auto white--text">
    <v-card-title primary-title>
      <v-icon large left dark>portrait</v-icon>
      <div class="title font-weight-light text-md-left">
        User Profile
        <div class="caption text-md-right">{{socket_id}}</div>
      </div>
      <v-container>
        <v-layout row wrap>
          <v-flex md6 xs12 class="pr-2">
            <v-select dark :items="names" label="Person" v-model="name"></v-select>
          </v-flex>
          <v-flex md6 xs12>
            <v-select dark :items="items" label="Group" v-model="group"></v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-title>

    <v-card-actions>
      <v-btn color="orange" dark @click="saveUserDetails()">Update</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
sockets: {
    connect: function(){
        this.socket_id = this.$socket.id;
        this.readLocalUser();
    }
}, 
  data: () => ({
    items: ["Alpha", "Beta", "Charlie"],
    names: ["John Adams", "Judy Mason", "Amy Smith", "Jack White"],
    name: "",
    group: "",
    socket_id: ""
  }),
  methods: {
    sendUserDetails() {
      const user_data = {};
      user_data.name = this.name;
      user_data.group = this.group;
      this.$socket.emit("UPDATE_USER", user_data);
    },
    saveUserDetails() {
        sessionStorage.name = this.name;
        sessionStorage.group = this.group;
        this.sendUserDetails();
    },
    readLocalUser() {
        this.name = sessionStorage.name;
        this.group = sessionStorage.group;
        if (this.name || this.group){
            this.sendUserDetails();
        }
    }
    
  }
};
</script>
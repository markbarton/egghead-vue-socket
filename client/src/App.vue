<template>
  <v-app>
    <v-toolbar dark fixed app>
      <v-icon>speaker_phone</v-icon>
      <v-toolbar-title>Power Vuejs using Socket.io</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout row mb-4>
          <v-flex class="mx-1">
            <UserProfile></UserProfile>
           </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer dark></v-footer>
    <PopupMessage></PopupMessage>
  </v-app>
</template>

<script>
import PopupMessage from "@/components/PopupMessage";
import UserProfile from "@/components/UserProfile";
export default {
  components: {
    PopupMessage,
    UserProfile
  }
};
</script>

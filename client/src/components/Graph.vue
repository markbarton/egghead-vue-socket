<template>
  <v-card class="mx-auto" color="grey lighten-4" max-width="400">
    <v-card-title>
      <v-icon :color="'red'" class="mr-5" size="64">favorite</v-icon>
      <v-layout column align-start>
        <div class="caption grey--text text-uppercase">Heart rate</div>
        <div>
          <span class="display-2 font-weight-black" v-text="display_beat || '—'"></span>
          <strong v-if="display_beat">BPM</strong>
        </div>
      </v-layout>
    </v-card-title>

    <v-sheet color="transparent">
      <v-sparkline
        :smooth="16"
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        :line-width="3"
        :key="String(display_beat)"
        :value="heartbeats"
        stroke-linecap="round"
      ></v-sparkline>
    </v-sheet>
    <v-card-actions></v-card-actions>
  </v-card>
</template>

<script>
export default {
  sockets: {
    PULSE: function(beat) {
      this.heartbeats.push(beat);
      this.heartbeats.shift();
    }
  },

  data: () => ({
    heartbeats: []
  }),

  computed: {
    display_beat() {
      return this.heartbeats[this.heartbeats.length - 1];
    }
  },

  created() {
    this.takeInitialPulse();
  },

  methods: {
    takeInitialPulse() {
      this.heartbeats = Array.from({ length: 10 }, this.random_heartbeat);
    },
    random_heartbeat() {
      return Math.ceil(Math.random() * (120 - 80) + 80);
    }
  }
};
</script>

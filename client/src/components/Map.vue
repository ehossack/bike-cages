<template>
  <div id="map" class="container">
    <b-button
      name="mapButton"
      v-show="!showMap"
      v-on:click="showMap = !showMap"
      variant="outline-info"
    >Show Map</b-button>
    <img
      v-show="showMap"
      v-on:click="showMap = !showMap"
      src="../assets/cage-map-2018.jpg"
      alt="Map of the cages"
      class="img-fluid"
    >
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Map extends Vue {
  private showMap = false;
}
</script>
<style lang="scss" scoped>
button {
  margin: 0 auto;
}
img {
  border: 1px solid black;
  border-radius: 4px;
}
</style>


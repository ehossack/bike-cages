<template>
  <div class="container">
    <span v-html="description"></span>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class About extends Vue {
  @Prop(String)
  private description!: string;
}
</script>

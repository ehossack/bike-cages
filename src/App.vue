<template>
  <div id="app">
    <div v-if="inError">Oops!</div>
    <div v-else>
      <AboutTheCages/>
      <InputDetails/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import AboutTheCages from './components/AboutTheCages.vue';
import InputDetails from './components/InputDetails.vue';

@Component({
  components: {
    AboutTheCages,
    InputDetails
  }
})
export default class App extends Vue {
  @Prop({
    default: false
  })
  public inError!: boolean;
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 5em;
}
</style> 

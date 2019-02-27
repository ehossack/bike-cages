<template>
  <div id="app">
    <div v-if="inError">Oops!</div>
    <div class="mt-5 mb-5" v-else>
      <About :description="aboutText"/>
      <Map/>
      <InputDetails v-if="!user" v-on:submit-user="handleSubmitUser"/>
      <div class="submitted" v-if="user">{{submitText}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import About from '@/components/AboutTheCages.vue';
import Map from '@/components/Map.vue';
import InputDetails from '@/components/InputDetails.vue';
import { Prop } from 'vue-property-decorator';
import CageUser from '@/models/CageUser';

@Component({
  components: {
    About,
    Map,
    InputDetails
  }
})
export default class App extends Vue {
  private inError: boolean;
  private user: CageUser | null;

  constructor() {
    super();
    this.inError = false;
    this.user = null;
  }

  // TODO: dynamic
  get aboutText(): string {
    return `
    <p>The Bike Kitchen administers 10 secure bike parking cages around campus.<br/>
    These facilities offer you additional security by providing covered bike racks within a secure
    enclosure and are available for use by any UBC student, faculty or staff member.<br/>
    More details available at:
    <a href="https://www.thebikekitchen.ca/bike-cages">thebikekitchen.ca/bike-cages</a></p>
    <p>To request access to the bike cages, please fill out the form below.
    A staff member will grant you access to the requested facilities.<br/>
    If you have any questions about the registration process, please contact
    <a href="mailto:info@bikecoop.ca?subject=Bike%20Cage%20Registration">info [at] bikecoop.ca</a>
    </p>
  `;
  }

  // TODO: dynamic
  get submitText(): string {
    const user = this.user;
    if (!user) {
      throw Error('user is not defined');
    }
    return `Thanks ${user.firstName}, your access should come in 48 hours`;
  }

  protected handleSubmitUser(user: CageUser): void {
    this.user = user.copy();
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  & > div {
    max-width: 1024px;
    margin: 0 auto;
  }

  .submitted {
    padding: 20%;
    font-size: 120%;
    font-style: italic;
  }
}
</style>


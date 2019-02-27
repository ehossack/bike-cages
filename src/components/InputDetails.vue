<template>
  <div class="card mt-4 input-form">
    <div class="mb-2 ml-2" v-if="shouldRenderForm">
      <small>* Required</small>
    </div>
    <b-form
      class="card-body pl-4 pr-4"
      @submit.prevent="onSubmit"
      @reset.prevent="onReset"
      v-if="shouldRenderForm
    "
    >
      <b-form-group label="Your Name:" label-for="firstName">
        <b-form-input
          id="firstName"
          type="text"
          name="first"
          placeholder="First"
          v-model="cageUser.firstName"
          v-validate="'required'"
          :state="validateState('first')"
        />
        <b-form-input
          id="lastName"
          type="text"
          name="last"
          placeholder="Last"
          class="mt-1"
          v-model="cageUser.lastName"
          v-validate="'required'"
          :state="validateState('last')"
        />
      </b-form-group>

      <b-form-group
        label="Student/Staff/Faculty Number:"
        label-for="studentStaffNumber"
        :description="numberDescription"
      >
        <b-form-input
          id="studentStaffNumber"
          name="number"
          type="text"
          placeholder="XXXXXXXX"
          v-model="cageUser.studentStaffNumber"
          v-validate="'required|numeric|min:7|max:8'"
          :state="validateState('number')"
          aria-describedby="numberFeedback"
        />
        <b-form-invalid-feedback id="numberFeedback">Only 7-8 numeric digits are valid</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Email address:" label-for="emailInput" :description="emailDescription">
        <b-form-input
          id="emailInput"
          type="email"
          name="email"
          placeholder="Enter email"
          ref="email"
          v-model.trim="cageUser.email"
          aria-describedby="email-feedback"
          v-validate="'required|email'"
          :state="validateState('email')"
        />
        <b-form-invalid-feedback id="email-feedback">Please enter a valid address</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Confirm email:" label-for="confirmEmail">
        <b-form-input
          id="confirmEmail"
          type="email"
          name="confirmEmail"
          placeholder="Enter email"
          v-model.trim="confirmEmail"
          aria-describedby="confirm-feedback"
          v-validate="'required|email|confirmed:email'"
          :state="validateState('confirmEmail')"
        />
        <b-form-invalid-feedback id="confirm-feedback">Email is not the same</b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        name="submit"
        :disabled="!cageUser.isValid()"
        :variant="cageUser.isValid() && confirmEmail ? 'primary' : 'outline-primary'"
        class="mr-1"
      >Submit</b-button>
      <b-button type="reset" variant="outline-secondary">Clear</b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CageUser from '@/models/CageUser';
import { Component, Emit } from 'vue-property-decorator';

@Component
export default class InputDetails extends Vue {
  private shouldRenderForm = true;
  private cageUser = new CageUser();
  private confirmEmail = '';

  get emailDescription(): string {
    return `If there are any issues with the cage, such as temporary closure due to construction,
            break-ins or other maintenance, we will need to be able to contact you.`;
  }

  get numberDescription(): string {
    return `For students, provide your UBC ID number: 8-digit student number or reference number.
    If you are staff, this is your UBC ID number:
    7-digit employee number (on your pay stub, or available from your department administrator)`;
  }

  protected validateState(property: string): boolean | null {
    if (this.fields[property] && (this.fields[property].dirty || this.fields[property].validated)) {
      return !this.errors.has(property);
    }
    return null;
  }

  @Emit('submit-user')
  protected onSubmit(): CageUser {
    const submittedUser = this.cageUser.copy();
    this.resetData();
    this.shouldRenderForm = false;
    return submittedUser;
  }

  protected onReset(): void {
    this.resetFormStateInBrowser();
    this.resetData();
  }

  private resetData(): void {
    this.cageUser = new CageUser();
    this.confirmEmail = '';
    this.$validator.reset();
  }

  private resetData(): void {
    this.cageUser = new CageUser();
    this.confirmEmail = '';
    this.$validator.reset();
  }

  private resetFormStateInBrowser(): void {
    this.shouldRenderForm = false;
    this.$nextTick(() => {
      this.shouldRenderForm = true;
    });
  }
}
</script>

<style lang="scss">
$red-color: rgb(216, 92, 92);
small {
  color: $red-color;
}
label::after {
  content: ' *';
  color: $red-color;
}
</style>


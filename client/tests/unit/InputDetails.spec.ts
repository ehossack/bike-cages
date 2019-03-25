import InputDetails from '@client/components/InputDetails.vue';
import CageUser from '@client/models/CageUser';
import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
import Vue from 'vue';

describe('InputDetails.vue', () => {
  const factory = () => {
    const localVue = createLocalVue();
    localVue.use(BootstrapVue);
    localVue.use(VeeValidate);

    return mount(InputDetails, {
      sync: false, // FIXME: https://github.com/vuejs/vue-test-utils/issues/1130
      localVue
    });
  };

  it('renders the vue', () => {
    const wrapper = factory();

    const isVueInstance = wrapper.isVueInstance();

    expect(isVueInstance).toBeTruthy();
  });

  it('emits requires student/staff number to submit', done => {
    jest
      .spyOn(console, 'error')
      .mockImplementationOnce(assertErrorLoggedAsString)
      .mockImplementationOnce(assertErrorLoggedAsObject);
    const wrapper = factory();

    wrapper.find('form').trigger('submit');

    function assertErrorLoggedAsString(error: any | undefined) {
      expect(typeof error).toEqual('string');
    }
    function assertErrorLoggedAsObject(error: any | undefined) {
      expect(typeof error).toEqual('object');
      expect(error.message).toMatch(/Missing data for user: /);
      done();
    }
  });

  it('emits submit-user on submit', async function test(done) {
    const wrapper = factory();
    const emitted = wrapper.emitted();
    const user = setAllUserData(wrapper);

    await wrapper.vm.$nextTick();
    wrapper.find('form').trigger('submit');

    const emittedEvents = emitted['submit-user'];
    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents).toHaveLength(1);
    expect(emittedEvents[0]).toContainEqual(user);
    done();
  });

  it('removes and re-adds on reset', async function test(done) {
    const wrapper = factory();
    setAllUserData(wrapper);

    wrapper.find('form').trigger('reset');
    await wrapper.vm.$nextTick();

    const numberInput = numberInputIn(wrapper).element as HTMLInputElement;
    expect(numberInput.value).toBeFalsy();
    done();
  });

  it('does not enable submit until user is valid and email confirmed', async function test(done) {
    const wrapper = factory();
    setAllUserData(wrapper);
    const getInputButton = () => wrapper.find('[name="submit"]').element as HTMLInputElement;
    expect(getInputButton().disabled).toBeTruthy();

    (wrapper.find('input[name="email"]').element as HTMLInputElement).value = 'email@example.com';
    wrapper.find('input[name="email"]').trigger('change');

    await wrapper.vm.$nextTick();
    expect(getInputButton().disabled).toBeTruthy();

    (wrapper.find('input[name="confirmEmail"]').element as HTMLInputElement).value = 'email@example.com';
    wrapper.find('input[name="confirmEmail"]').trigger('change');

    await wrapper.vm.$nextTick();
    expect(getInputButton().disabled).toBeFalsy();
    done();
  });

  function setAllUserData(wrapper: Wrapper<Vue>): CageUser {
    const user = new CageUser();
    user.firstName = 'first';
    user.lastName = 'last';
    user.email = 'email';
    user.studentStaffNumber = 1234567;
    (numberInputIn(wrapper).element as HTMLInputElement).value = String(user.studentStaffNumber);
    (wrapper.find('[name="first"]').element as HTMLInputElement).value = user.firstName;
    (wrapper.find('[name="last"]').element as HTMLInputElement).value = user.lastName;
    (wrapper.find('[name="email"]').element as HTMLInputElement).value = user.email;

    numberInputIn(wrapper).trigger('change');
    wrapper.find('[name="first"]').trigger('change');
    wrapper.find('[name="last"]').trigger('change');
    wrapper.find('[name="email"]').trigger('change');
    return user;
  }

  function numberInputIn(wrapper: Wrapper<Vue>) {
    return wrapper.find('input[name="number"]');
  }
});

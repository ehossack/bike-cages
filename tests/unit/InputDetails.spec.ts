import InputDetails from '@/components/InputDetails.vue';
import CageUser from '@/models/CageUser';
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
      expect(error.message).toMatch(/studentStaffNumber should be defined/);
      done();
    }
  });

  it('emits submit-user on submit', async function test(done) {
    const wrapper = factory();
    const emitted = wrapper.emitted();
    const user = new CageUser();
    user.studentStaffNumber = setStudentStaffNumberIn(wrapper);

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
    setStudentStaffNumberIn(wrapper);

    wrapper.find('form').trigger('reset');
    await wrapper.vm.$nextTick();

    const numberInput = numberInputIn(wrapper).element as HTMLInputElement;
    expect(numberInput.value).toBeFalsy();
    done();
  });

  function setStudentStaffNumberIn(wrapper: Wrapper<Vue>) {
    const numberToSet = 1234567;
    const numberInput = numberInputIn(wrapper).element as HTMLInputElement;
    numberInput.value = String(numberToSet);
    numberInputIn(wrapper).trigger('change');
    return numberToSet;
  }

  function numberInputIn(wrapper: Wrapper<Vue>) {
    return wrapper.find('input[name="number"]');
  }
});

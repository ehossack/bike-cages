import App from '@client/App.vue';
import About from '@client/components/AboutTheCages.vue';
import InputDetails from '@client/components/InputDetails.vue';
import { shallowMount } from '@vue/test-utils';
import CageUser from '@client/models/CageUser';

describe('App.vue', () => {
  it('renders the vue', () => {
    const wrapper = shallowMount(App);

    const isVueInstance = wrapper.isVueInstance();

    expect(isVueInstance).toBeTruthy();
    expect(wrapper.find(About).exists()).toBeTruthy();
    expect(wrapper.find(InputDetails).exists()).toBeTruthy();
  });

  it('shows error on error', () => {
    const wrapper = shallowMount(App);

    wrapper.setData({ inError: true });

    expect(wrapper.find(About).exists()).toBeFalsy();
    expect(wrapper.find(InputDetails).exists()).toBeFalsy();
    expect(wrapper.html()).toContain('Oops!');
  });

  it('validates user', () => {
    const wrapper = shallowMount(App);
    const app = wrapper.vm as any;
    const user = new CageUser();

    const submitInvalid = () => app.handleSubmitUser(user);

    expect(submitInvalid).toThrowError();
  });

  it('does not provide submitText without user', () => {
    const wrapper = shallowMount(App);
    const app = wrapper.vm as any;
    const user = new CageUser();
    user.firstName = 'hi';
    user.lastName = 'hi';
    user.studentStaffNumber = 123;
    user.email = 'hi';

    app.handleSubmitUser(user);

    wrapper.vm.$nextTick(() => {
      expect(wrapper.html()).toContain(app.submitText);
    });
  });

  it('does not provides submitText with user', () => {
    const wrapper = shallowMount(App);
    const app = wrapper.vm as any;

    const submitWithoutUser = () => app.submitText;

    expect(submitWithoutUser).toThrowError('user is not defined');
  });
});

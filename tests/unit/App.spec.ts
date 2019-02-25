import App from '@/App.vue';
import AboutTheCages from '@/components/AboutTheCages.vue';
import InputDetails from '@/components/InputDetails.vue';
import { shallowMount } from '@vue/test-utils';

describe('App.vue', () => {
  it('renders the vue', () => {
    const wrapper = shallowMount(App);

    const isVueInstance = wrapper.isVueInstance();

    expect(isVueInstance).toBeTruthy();
    expect(wrapper.find(AboutTheCages).exists()).toBeTruthy();
    expect(wrapper.find(InputDetails).exists()).toBeTruthy();
  });

  it('shows error on error', () => {
    const wrapper = shallowMount(App);

    wrapper.setProps({ inError: true });

    expect(wrapper.find(AboutTheCages).exists()).toBeFalsy();
    expect(wrapper.find(InputDetails).exists()).toBeFalsy();
    expect(wrapper.html()).toContain('Oops!');
  });
});

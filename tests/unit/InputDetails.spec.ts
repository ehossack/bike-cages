import BootstrapVue from 'bootstrap-vue';
import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import InputDetails from '@/components/InputDetails.vue';

describe('InputDetails.vue', () => {
  const anyChildSelector = '#exampleInputGroup1';
  const localVue = createLocalVue();
  localVue.use(BootstrapVue);

  it('renders the vue', () => expect(shallowMount(InputDetails, { localVue }).isVueInstance()).toBeTruthy());

  it('removes and re-adds on reset', done => {
    const wrapper = mount(InputDetails, { localVue });
    expect(wrapper.find(anyChildSelector).exists()).toBeTruthy();

    wrapper.find('form').trigger('reset.prevent');

    expect(wrapper.find(anyChildSelector).exists()).toBeFalsy();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find(anyChildSelector).exists()).toBeTruthy();
      done();
    });
  });
});

import { shallowMount } from '@vue/test-utils';
import AboutTheCages from '@/components/AboutTheCages.vue';

describe('AboutTheCages.vue', () => {
  it('renders the image', () => {
    const wrapper = shallowMount(AboutTheCages);
    const img = wrapper.find('img');
    expect(img.exists()).toBeTruthy();
    expect(img.attributes('src')).toContain('.jpg');
  });
});

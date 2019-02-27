import About from '@/components/AboutTheCages.vue';
import { shallowMount } from '@vue/test-utils';

describe('AboutTheCages.vue', () => {
  it('renders the vue', () => expect(shallowMount(About).isVueInstance()).toBeTruthy());

  it('renders the description', () => {
    const wrapper = shallowMount(About);
    const htmlText = 'some <em>cool</em> text';
    wrapper.setProps({ description: htmlText });

    const descriptionSpan = wrapper.find('span');

    expect(descriptionSpan.exists()).toBeTruthy();
    expect(descriptionSpan.html()).toContain(htmlText);
  });
});

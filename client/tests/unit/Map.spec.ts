import Map from '@client/components/Map.vue';
import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';

describe('Map.vue', () => {
  const factory = () => {
    const localVue = createLocalVue();
    localVue.use(BootstrapVue);
    return mount(Map, { localVue });
  };

  it('renders the vue', () => {
    const wrapper = factory();

    const isVueInstance = wrapper.isVueInstance();

    expect(isVueInstance).toBeTruthy();
    expect(styleOf(wrapper, 'img').display).toEqual('none');
  });

  it('shows the map when the button is clicked', done => {
    const wrapper = factory();

    triggerClickAndExpectImgStyleToBe(wrapper, '[name="mapButton"]', '')
      .then(() => triggerClickAndExpectImgStyleToBe(wrapper, '[name="mapButton"]', 'none'))
      .then(done);
  });

  it('shows the map when the map clicked', done => {
    const wrapper = factory();

    triggerClickAndExpectImgStyleToBe(wrapper, 'img', '')
      .then(() => triggerClickAndExpectImgStyleToBe(wrapper, 'img', 'none'))
      .then(done);
  });

  function styleOf(element: Wrapper<Vue>, selector: string): CSSStyleDeclaration {
    const domElement = element.find(selector);
    return domElement && domElement.element.style;
  }

  function triggerClickAndExpectImgStyleToBe(wrapper: Wrapper<Vue>, selector: string, style: string): Promise<any> {
    wrapper.find(selector).trigger('click');
    return wrapper.vm.$nextTick().then(() => expect(styleOf(wrapper, 'img').display).toBe(style));
  }
});

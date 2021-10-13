import { mount } from '@vue/test-utils'
import TestComponent from './TestComponent'

describe('Tests calculator', () => {
  test('test add functionality', () => {
    const wrapper = mount(TestComponent, {
      propsData: {
        massage: 'Hello World'
      }
    })
    expect(wrapper.html()).toEqual('<div>The massage is: Hello World</div>')
  })
})

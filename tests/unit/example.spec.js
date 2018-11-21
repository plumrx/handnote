import { shallowMount } from '@vue/test-utils'
import CommonHeader from '@/components/CommonHeader.vue'

describe('CommonHeader.vue', () => {
  it('renders props.pinned when passed', () => {
    const pinned = true
    const wrapper = shallowMount(CommonHeader, {
      propsData: { pinned },
    })
    expect(wrapper.classes('pinned')).toBe(pinned)
  })
})

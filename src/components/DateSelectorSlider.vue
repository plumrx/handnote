<template>
  <div class="c-date-selector-slider" :class="[direction]">
    <button v-if="jump" class="prev" @click="current -= jump"><i class="el-icon-d-arrow-left" /></button>
    <div class="slide-wrap">
      <ul v-slide="{index: current, direction}" class="slide-list">
        <li
          v-for="(item, i) in list"
          :key="i"
          class="slide-item"
          @click="current = i"
          v-text="item"
        />
      </ul>
    </div>
    <button v-if="jump" class="next" @click="current += jump"><i class="el-icon-d-arrow-right" /></button>
  </div>
</template>

<script>
const touch = {
  x: 0, // 触摸点初始 x 坐标
  y: 0, // 触摸点初始 y 坐标
  left: 0, // 容器 x 偏移量
  top: 0, // 容器 y 偏移量
  offsetX: 0, // 触摸点 x 偏移量
  offsetY: 0, // 触摸点 y 偏移量
  width: 0, // 子元素宽度
  heigth: 0, // 子元素高度
  containerWidth: 0, // 容器可见区宽度
  containerHeight: 0, // 容器可见区高度
  duration: '0s', // 动画时间
}

export default {
  name: 'DateSelectorSlider',
  directives: {
    slide: {
      bind (el, binding) {
        el.addEventListener('touchstart', onTouchStart.bind({ el, binding }))
        el.addEventListener('touchmove', onTouchMove.bind({ el, binding }))
        el.addEventListener('touchend', onTouchEnd.bind({ el, binding }))
      },
      inserted: updateSliderView,
      update: updateSliderView,
      unbind (el) {
        el.removeEventListener('touchstart', onTouchStart)
        el.removeEventListener('touchend', onTouchMove)
        el.removeEventListener('touchmove', onTouchEnd)
      },
    },
  },
  props: {
    /** * 选项列表 * @type {string[]} */
    list: { type: Array, required: true },
    /** * 当前选中项的索引 * @type {number} */
    index: { type: Number, default: 0, validator (index) { return index >= 0 && index % 1 === 0 } },
    /** * 排列方向 * @type {string} enum: [row, column] */
    direction: { type: String, default: 'row', validator (val) { return ['row', 'column'].includes(val) } },
    /** * 跳转 * @type {number|boolean} 快速导航跳转索引 */
    jump: { type: [Boolean, Number], default: 0 },
  },
  computed: {
    current: {
      get () { return this.index },
      set (index) {
        if (index < 0) index = 0
        if (index >= this.list.length) index = this.list.length - 1
        this.$emit('update:index', index)
      },
    },
  },
}

function updateSliderView (el, binding) {
  const { index, direction } = binding.value
  const currentItem = el.querySelectorAll('.slide-item')[index]
  let offset
  if (direction === 'row') {
    offset = (el.offsetWidth - currentItem.offsetWidth) / 2 - currentItem.offsetLeft
    el.style.left = `${offset}px`
  } else {
    offset = (el.offsetHeight - currentItem.offsetHeight) / 2 - currentItem.offsetTop
    el.style.top = `${offset}px`
  }
}

/**
 * 触摸点按下时初始化触摸信息
 */
function onTouchStart (event) {
  const { el } = this
  touch.x = event.touches[0].pageX
  touch.y = event.touches[0].pageY
  touch.left = el.offsetLeft
  touch.top = el.offsetTop
  touch.width = el.querySelector('.slide-item').offsetWidth
  touch.height = el.querySelector('.slide-item').offsetHeight
  touch.containerWidth = el.offsetWidth
  touch.containerHeight = el.offsetHeight
  touch.duration = el.style.transitionDuration
}

/**
 * 触摸点移动时更新偏移量、滚轴视图
 */
function onTouchMove (event) {
  const { el, binding } = this
  const { direction } = binding.value
  touch.offsetX = event.touches[0].pageX - touch.x
  touch.offsetY = event.touches[0].pageY - touch.y
  el.style.transitionDuration = '0s'
  if (direction === 'row') {
    el.style.left = `${touch.left + touch.offsetX}px`
  } else {
    el.style.top = `${touch.top + touch.offsetY}px`
  }
}

/**
 * 触摸结束时计算偏移量，更新选中元素
 */
function onTouchEnd (event) {
  const { el, binding } = this
  const { direction } = binding.value
  el.style.transitionDuration = touch.duration
  let target
  if (direction === 'row') {
    const { left, width, offsetX, containerWidth } = touch
    // 容差
    if (Math.abs(offsetX) < 4) return

    // 当前选中元素索引
    const index = Math.floor((-left + containerWidth / 2) / width)
    // 滑动偏移索引
    const offsetIndex = -Math[offsetX > 0 ? 'ceil' : 'floor'](offsetX / width)
    target = index + offsetIndex
  } else {
    const { top, height, offsetY, containerHeight } = touch
    if (Math.abs(offsetY) < 4) return
    const index = Math.floor((-top + containerHeight / 2) / height)
    const offsetIndex = -Math[offsetY > 0 ? 'ceil' : 'floor'](offsetY / height)
    target = index + offsetIndex
  }
  const itemLength = el.querySelectorAll('.slide-item').length
  if (target < 0) target = 0
  if (target >= itemLength) target = itemLength - 1
  updateSliderView(el, Object.assign({}, binding, { value: { ...binding.value, index: target } }))
  el.querySelectorAll('.slide-item')[target].click()
}

</script>

<style lang="stylus" scoped>
$itemWidth = 4em
$itemHeight = 2em

.c-date-selector-slider
  display flex
  align-items center
  width 100%
  border-style solid

  > .prev
  > .next
    flex none
    display block
    color $tertiary
    width $itemWidth
    height $itemHeight
    padding 0

  .slide-wrap
    position relative
    flex auto
    min-width 0
    overflow hidden
    height 100%
    width 100%

    &::before
    &::after
      content ''
      position absolute
      display block
      pointer-events none
      z-index 1

    ul.slide-list
      position relative
      left 0
      display flex
      list-style none
      margin 0
      padding 0

      li.slide-item
        flex none
        display block
        display flex
        align-items center
        justify-content center
        font-family Georgia

  &.row
    flex-direction row
    width 100%
    border-width 1px 0
    border-image linear-gradient(to right, transparent 10%, $secondary 50%, transparent 90%) 10

    .slide-wrap
      &::before
        top 0
        bottom 0
        left calc(50% - 6px)
        width 0
        border-style solid
        border-width 8px 6px
        border-color 'hsla(%s, 95%, 50%, 0.1)' % $colorAngle #0000
      &::after
        left -1px
        right -1px
        top 0
        bottom 0
        background linear-gradient(to right, #fff, transparent 50%, #fff)

      .slide-list
        flex-direction row
        height 100%

        .slide-item
          width $itemWidth

  &.column
    flex-direction column
    height 100%
    border-width 0 1px
    border-image linear-gradient(to bottom, transparent 10%, $secondary 50%, transparent 90%) 10

    > .prev
    > .next
      transform rotateZ(90deg)

    .slide-wrap
      &::before
        left 0
        right 0
        top calc(50% - 6px)
        height 0
        border-style solid
        border-width 6px 8px
        border-color #0000 'hsla(%s, 95%, 50%, 0.1)' % $colorAngle
      &::after
        left 0
        right 0
        top 0
        bottom 0
        background linear-gradient(to bottom, #fff, #0000 50%, #fff)

      .slide-list
        flex-direction column
        height 100%

        .slide-item
          height $itemHeight
          width 100%

</style>

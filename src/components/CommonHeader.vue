<template>
  <header :class="{pinned}" class="c-common-header">
    <div class="left" @click="onBackClick">
      <slot name="left">
        <i class="el-icon-back" />
      </slot>
    </div>
    <div class="title">
      <h1 class="title-wrap"><slot /></h1>
    </div>
    <div class="right">
      <slot name="right" />
    </div>
  </header>
</template>

<script>
import { noop } from '@/utils'

export default {
  name: 'CommonHeader',
  props: {
    back: { type: Function, default: noop },
    pinned: { type: Boolean, default: true },
  },
  methods: {
    onBackClick () {
      if (this.back === noop) this.goBack()
      else this.back()
    },
  },
}
</script>

<style lang="stylus" scoped>
.c-common-header
  position relative
  bottom initial
  display flex
  justify-content space-between
  flex none
  width 100%
  height $header-height
  overflow hidden
  background #fff
  border-bottom 1px solid #ededed
  color inherit
  z-index 10

  &.pinned
    position fixed

  .left, .right, .title
    display flex
    align-items center
    justify-content center

  .left, .right
    flex none
    width fit-content
    min-width @height

    > i
      font-size 20px

  .title
    flex auto

    > h1.title-wrap
      display block
      margin 0
      font-size 18px
      font-weight 400
      text-overflow ellipsis
      white-space nowrap
      overflow hidden
      word-wrap break-word
      word-break break-all

</style>

<style lang="stylus">
.c-common-header
  + main
    width 100%
    padding-bottom $footer-height

  &.pinned + main
    padding-top $header-height

</style>

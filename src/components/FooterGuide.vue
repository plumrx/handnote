<template>
  <nav class="c-footer-nav">
    <router-link :to="{name: 'calendar'}" tag="button">日历</router-link>
    <router-link :to="{name: 'events'}" tag="button">事件</router-link>
    <router-link :to="{name: 'wishes'}" tag="button">愿望单</router-link>
    <router-link :to="{name: 'create'}" tag="button" class="plus"><i class="el-icon-plus" /></router-link>
    <router-link :to="{name: 'inventory'}" tag="button">囤货</router-link>
    <router-link :to="{name: 'profile'}" tag="button">设置</router-link>
  </nav>
</template>

<script>
export default {
  name: 'FooterGuide',
}
</script>

<style lang="stylus" scoped>
.c-footer-nav
  position fixed
  bottom 0
  left 0
  right 0
  display flex
  justify-content space-around
  align-items center
  height $footer-height
  background $secondary

  &::before
    content ''
    position absolute
    top 0
    left 0
    right 0
    height 1px
    display block
    background linear-gradient(to right, #0000 5%, $primary 50%, #0000 95%)
    opacity .2

  > button
    cursor pointer
    color $light
    border none
    outline none
    background-color transparent

    &:not(.plus)
      padding 6px 16px

    &.plus
      font-size 36px
      background-color $light
      color $secondary
      border 2px solid @color
      border-radius $sm
      margin-top -($md)
      z-index 1

</style>

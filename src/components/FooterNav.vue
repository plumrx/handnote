<template>
  <nav class="c-footer-nav">
    <button @click="randomColor">换个心情</button>
    <button @click="clearAppCache">清除缓存</button>
  </nav>
</template>

<script>
import { types } from '@/store'

export default {
  name: 'FooterNav',
  methods: {
    randomColor () {
      const colorAngle = (Math.random() * 360) << 0
      this.$store.commit(types.SAVE_THEME_COLOR, colorAngle)
    },
    clearAppCache () {
      window.applicationCache.update()
    },
  },
}
</script>

<style lang="stylus" scoped>
.c-footer-nav
  position fixed
  bottom 0
  width 100%
  display flex
  justify-content space-around
  align-items center
  padding 12px

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
    color $primary
    border none
    border-bottom 1px solid $secondary
    background-color transparent
    border-radius 1vw
    padding 6px 16px
    outline none
    // box-shadow inset 0 0px 1px $secondary

</style>

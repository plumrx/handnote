<template>
  <el-collapse-item class="setting-item about" name="about">
    <span slot="title" class="item-title">关于 Handnote</span>
    <el-form class="item-content" label-width="6em" label-position="left">
      <el-card class="about-card">
        <h2>Handnote</h2>
        <p>Handnote 是一个综合了日程、备忘录、TODO、生理期、账单、愿望单、囤货清单等功能，将这些功能集中在一张日历上。 </p>
        <blockquote class="quote"> 做你生命进程的小管家。 </blockquote>
      </el-card>
      <el-button class="item-btn" @click="randomColor">换个心情</el-button>
    </el-form>
  </el-collapse-item>
</template>

<script>
import { types } from '@/stores'

export default {
  name: 'SettingAbout',
  methods: {
    randomColor () {
      const colorAngle = (Math.random() * 360) << 0
      this.$store.commit(types.SAVE_THEME_COLOR, colorAngle)
    },
  },
}
</script>

<style lang="stylus" scoped>
.setting-item.about
  .about-card
    margin-bottom 24px

    .quote
      margin 1em 0
      border-left 4px solid $secondary
      padding-left 1em
      color #999
      font-style italic

  .item-btn
    display block
    width 100%
    margin 0
    border none
    padding 16px
    text-align left

    + &
      border-top 1px solid $secondary

</style>

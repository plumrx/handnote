<template>
  <div class="p-settings">
    <el-collapse accordion>
      <SettingMenstrual />
    </el-collapse>
  </div>
</template>

<script>
import SettingMenstrual from './SettingMenstrual'

export default {
  name: 'Settings',
  components: { SettingMenstrual },
  data () {
    return { }
  },
}
</script>

<style lang="stylus">
.p-settings

  .setting-item
    padding 0 16px

    .item-title
      color #aaa

      &.active
        color inherit

  .el-collapse-item__content
    padding-bottom 0

</style>

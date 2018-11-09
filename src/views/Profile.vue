<template>
  <div class="p-profile">
    <el-collapse v-model="activeItem" accordion>
      <SettingMenstrual />
      <SettingAbout />
    </el-collapse>
  </div>
</template>

<script>
import SettingMenstrual from '@/components/SettingMenstrual'
import SettingAbout from '@/components/SettingAbout'

export default {
  name: 'Profile',
  components: {
    SettingMenstrual,
    SettingAbout,
  },
  data () {
    return {
      activeItem: 'about',
    }
  },
}
</script>

<style lang="stylus">
.p-profile

  .setting-item
    .item-title
      &.disabled
        color #aaa

  .el-collapse-item__header
  .el-collapse-item__wrap
    padding 0 16px

</style>

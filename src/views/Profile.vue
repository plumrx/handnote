<template>
  <div class="p-profile">
    <el-collapse v-model="activeItem" accordion>
      <SettingMenstrual />
      <SettingAbout />
    </el-collapse>
    <FooterGuide />
  </div>
</template>

<script>
import FooterGuide from '@/components/FooterGuide'
import SettingMenstrual from '@/components/SettingMenstrual'
import SettingAbout from '@/components/SettingAbout'

export default {
  name: 'Profile',
  components: {
    FooterGuide,
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

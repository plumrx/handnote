<template>
  <div id="app">
    <router-view />
    <FooterGuide />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Utils from '@/utils'
import FooterGuide from '@/components/FooterGuide'

export default {
  components: { FooterGuide },
  computed: {
    ...mapState(['color']),
  },
  watch: {
    color (val) {
      Utils.setThemeColor(val)
    },
  },
  created () {
    Utils.setThemeColor(this.color)
  },
}
</script>

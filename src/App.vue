<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Utils from '@/utils'

export default {
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

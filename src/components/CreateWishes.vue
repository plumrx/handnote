<template>
  <div class="c-create-wishes">
    CreateWishes
  </div>
</template>

<script>
export default {
  name: 'CreateWishes',
  data () {
    return {}
  },
  created () {
    this.$parent.$on('save', this.onSave)
  },
  methods: {
    onSave () {
      console.log('save')
    },
  },
}
</script>

<style lang="stylus" scoped>
.c-create-wishes
  display flex

</style>

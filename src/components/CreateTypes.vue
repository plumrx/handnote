<template>
  <ul class="c-create-type">
    <router-link
      v-for="type in types"
      :key="type.name"
      :to="type.name"
      extra
      replace
      tag="li"
      class="type-item"
      exact-active-class="active"
    >
      {{ type.title }}
    </router-link>
  </ul>
</template>

<script>
const createTypes = [
  { name: 'schedule', title: '日程' },
  { name: 'memorial', title: '纪念日' },
  { name: 'wishes', title: '愿望单' },
  { name: 'inventory', title: '囤货' },
]

export default {
  name: 'CreateTypes',
  data () {
    return {
      types: createTypes,
    }
  },
}
</script>

<style lang="stylus" scoped>
ul.c-create-type
  display flex
  flex-direction row
  justify-content space-around
  align-items center
  height 64px
  margin 0
  padding 0
  border-bottom $border
  list-style-type none

  > li.type-item
    display flex
    flex-direction column
    justify-content center
    align-items center
    flex auto
    height 100%

    &.active
      color $primary

</style>

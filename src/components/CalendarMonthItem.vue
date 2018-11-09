<template>
  <div class="c-calendar-month-item" @click="setSelectedDay">
    <div :class="{selected: isSelectedDay, today: isToday}" class="item">
      {{ day.display }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import { types } from '@/stores'

export default {
  name: 'CalendarMonthItem',
  props: {
    day: { type: Object, required: true },
  },
  computed: {
    ...mapState(['current', 'selected']),
    isSelectedDay () {
      return this.day.moment && this.selected.isSame(this.day.moment, 'day')
    },
    isToday () {
      return this.day.moment && moment().isSame(this.day.moment, 'day')
    },
  },
  methods: {
    setSelectedDay () {
      if (this.day.type !== 'current') return
      this.$store.commit(types.UPDATE_SELECTED, this.day.moment)
    },
  },
}
</script>

<style lang="stylus" scoped>
.c-calendar-month-item
  display flex
  flex none
  width (98vw / 7)
  height @width
  padding 4px

  .item
    display flex
    align-items center
    justify-content center
    flex auto
    border-radius 1vw
    border 1px solid transparent

    &.today
      background-color $secondary

    &.selected
      border-color $primary

</style>

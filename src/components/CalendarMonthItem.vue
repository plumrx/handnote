<template>
  <div class="c-calendar-month-item" @click="setSelectedDay">
    <div :class="dayClasses" class="item">
      {{ day.display }}
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import moment from 'moment'
import { types } from '@/stores'

export default {
  name: 'CalendarMonthItem',
  props: {
    day: { type: Object, required: true },
  },
  computed: {
    ...mapState(['current', 'selected']),
    ...mapState('menstrual', { showMenstrual: 'enable' }),
    ...mapGetters('menstrual', ['isMenstrualDay', 'daysInCycle']),
    isSelectedDay () {
      return this.day.moment && this.selected.isSame(this.day.moment, 'day')
    },
    isToday () {
      return this.day.moment && moment().isSame(this.day.moment, 'day')
    },
    dayClasses () {
      return {
        selected: this.isSelectedDay,
        today: this.isToday,
        menstrual: this.showMenstrual && this.isMenstrualDay(this.day.moment),
      }
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
    position relative
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

    &.menstrual::after
      content ''
      position absolute
      top 50%
      left 50%
      display block
      width 26px
      height 12px
      margin-left -(@width / 2)
      border-bottom 2px solid lighten(red, 80%)
      border-radius (@height / 4)
      z-index -1

</style>

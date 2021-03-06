<template>
  <div class="c-calendar-month">
    <nav class="year-month-select-wrap">
      <div class="select-wrap year-select">
        <span class="pre" @click="yearDec">{{ current.year() - 1 }}</span>
        <span class="current">{{ current.year() }}</span>
        <span class="next" @click="yearInc">{{ current.year() + 1 }}</span>
      </div>
      <div class="select-wrap">年</div>
      <div class="select-wrap month-select">
        <span class="pre" @click="monthDec">{{ preMonthText }}</span>
        <span class="current">{{ current.month() + 1 }}</span>
        <span class="next" @click="monthInc">{{ nextMonthText }}</span>
      </div>
      <div class="select-wrap">月</div>
    </nav>
    <main>
      <header class="calendar-month-item-wrap">
        <span v-for="week in weeks" :key="week" class="week-item">{{ week }}</span>
      </header>
      <transition-group name="flip-list" tag="section" class="calendar-month-item-wrap">
        <CalendarMonthItem v-for="(day, index) in days" :key="index" :day="day" />
      </transition-group>
    </main>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'
import Day from '@/core/Day'
import { types } from '@/stores'
import CalendarMonthItem from './CalendarMonthItem'

export default {
  name: 'CalendarMonth',
  components: { CalendarMonthItem },
  data () {
    return {
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
    }
  },
  computed: {
    ...mapState({ current: 'current' }),
    ...mapGetters({ yearMonth: 'currentYearMonth' }),
    days () {
      return [...this.preDays, ...this.currentDays, ...this.nextDays]
    },
    currentDays () {
      const daysInMonth = moment(this.current).daysInMonth()
      return new Array(daysInMonth).fill(null).map((value, index) => new Day({
        display: index + 1,
        moment: moment(this.current).date(1).add(index, 'days'),
      }))
    },
    preDays () {
      const preDays = moment(this.yearMonth).day()
      return new Array(preDays).fill(null).map(() => new Day({ type: 'pre' }))
    },
    nextDays () {
      const nextDays = 6 - moment(this.yearMonth).day()
      return new Array(nextDays).fill(null).map(() => new Day({ type: 'next' }))
    },
    preMonthText () {
      const currentMonth = this.current.month()
      return currentMonth === 0 ? 12 : currentMonth
    },
    nextMonthText () {
      const nextMonth = this.current.month() + 2
      return nextMonth > 12 ? 1 : nextMonth
    },
  },
  methods: {
    monthInc () {
      const date = moment(this.current).add(1, 'months')
      this.$store.commit(types.UPDATE_CURRENT, date)
    },
    monthDec () {
      const date = moment(this.current).subtract(1, 'months')
      this.$store.commit(types.UPDATE_CURRENT, date)
    },
    yearInc () {
      const date = moment(this.current).add(1, 'years')
      this.$store.commit(types.UPDATE_CURRENT, date)
    },
    yearDec () {
      const date = moment(this.current).subtract(1, 'years')
      this.$store.commit(types.UPDATE_CURRENT, date)
    },
  },
}
</script>

<style lang="stylus" scoped>
.c-calendar-month
  nav.year-month-select-wrap
    display flex
    flex-direction row
    justify-content center
    align-items center
    padding 0 25vw
    margin 2.5vh 0

    .select-wrap
      display flex
      flex-direction column
      align-items center
      justify-content center
      margin 0 2vw

      .pre, .next
        position relative
        color #ccc
        &::after
          content ''
          position absolute
          display block
          top 0
          left 0
          right 0
          bottom 0

      .pre
        transform rotate3d(1, 0, 0, 30deg)
        &::after
          background linear-gradient(#fff, #fff0 66%)

      .next
        transform rotate3d(1, 0, 0, -30deg)
        &::after
          background linear-gradient(#fff0 33%, #fff)

  .calendar-month-item-wrap
    display flex
    flex-direction row
    align-items flex-start
    flex-wrap wrap
    padding 1vw

    .week-item
      display flex
      justify-content center
      align-items center
      flex none
      width (98vw / 7)
      color #ccc

</style>

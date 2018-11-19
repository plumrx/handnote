<template>
  <div class="c-date-selector" :style="{zIndex: visible ? undefined : -1}">
    <transition name="fade">
      <div v-if="visible" class="cover" @click="close" />
    </transition>

    <transition name="slide-fade">
      <div v-if="visible" class="wrap">
        <header>
          <span>{{ yearText }}{{ monthList[monthIndex] }}{{ dateList[dayIndex] }} {{ weekday }}</span>
          <span>{{ fromNow }}</span>
        </header>
        <main class="selector-wrap">
          <DateSelectorSlider
            :list="yearList"
            :index.sync="yearIndex"
            :jump="10"
            class="year-selector"
            direction="row"
          />
          <div class="days-wrap">
            <DateSelectorSlider
              :list="monthList"
              :index.sync="monthIndex"
              class="month-selector"
              direction="column"
              :jump="6"
            />
            <DateSelectorSlider
              :list="dateList"
              :index.sync="dayIndex"
              class="days-selector"
              direction="column"
              :jump="10"
            />
          </div>
        </main>
        <footer>
          <div class="tools">
            <el-button size="small" type="secondary" @click="isLunar = !isLunar">切换为{{ isLunar ? '公历' : '农历' }}</el-button>
          </div>
          <div class="buttons">
            <el-button size="small" @click="close">取消</el-button>
            <el-button size="small" type="primary" @click="submit">确定</el-button>
          </div>
        </footer>
      </div>
    </transition>
  </div>
</template>

<script>
import moment from 'moment'
import Utils from '@/utils'
import calendar from '@/utils/calendar'
import DateSelectorSlider from './DateSelectorSlider'

export default {
  name: 'DateSelector',
  components: {
    DateSelectorSlider,
  },
  props: {
    date: {
      type: Object,
      default: () => ({
        isLunar: false,
        year: new Date().getFullYear(),
        monthIndex: new Date().getMonth(),
        day: new Date().getDay(),
      }),
    },
  },
  data () {
    return {
      visible: false,
      isLunar: this.date.isLunar,
      year: this.date.year,
      monthIndex: this.date.monthIndex,
      day: this.date.day,
      yearList: Utils.getYearList(),
    }
  },
  computed: {
    yearText () {
      if (!this.isLunar) return `公历${this.year}年`
      const lunarYear = calendar.toChinaYear(this.year)
      return `农历${lunarYear}年`
    },
    weekday () {
      const { isLunar, year, monthIndex, day } = this.$data
      let date
      if (isLunar) date = calendar.lunar2solar(year, monthIndex, day)
      else date = calendar.solar2lunar(year, monthIndex + 1, day)
      return date.ncWeek
    },
    yearIndex: {
      get () {
        return this.year - Utils.yearRange[0]
      },
      set (val) {
        this.year = val + Utils.yearRange[0]
      },
    },
    dayIndex: {
      get () {
        return this.day - 1
      },
      set (val) {
        this.day = val + 1
      },
    },
    monthList () {
      if (this.isLunar) return Utils.getLunarMonthList(this.year)
      return Utils.getSolarMonthList()
    },
    dateList () {
      if (!this.isLunar) return Utils.getSolarDateList(this.year, this.monthIndex + 1)
      return Utils.getLunarDateList(this.year, this.monthIndex + 1)
    },
    leapMonth () {
      return calendar.leapMonth(this.year)
    },
    /**
     * 获取目标时间与当天的相对时间 如 "18天后", "4个月前"
     * @returns {string}
     */
    fromNow () {
      let date = {
        year: this.year,
        month: this.monthIndex + 1,
        day: this.day,
      }
      // 如果是农历则转化为公历
      if (this.isLunar) {
        const { cYear, cMonth, cDay } = calendar.lunar2solar(this.year, this.monthIndex, this.day)
        date = { year: cYear, month: cMonth, day: cDay }
      }
      date.month--
      // 如果是当天
      if (moment().isSame(Object.values(date), 'day')) return '今天'

      // 返回精确到日的相对时间
      const now = moment().format('YYYY-MM-DD').split('-')
      now[1]--
      return moment(Object.values(date)).from(now)
    },
  },
  watch: {
    /**
     * 监听公农历切换，保持当天日期不变
     */
    isLunar (toLunar) {
      const { year, monthIndex, day } = this.$data
      if (toLunar) {
        const leap = calendar.leapMonth(year)
        const date = calendar.solar2lunar(year, monthIndex + 1, day)
        this.year = date.lYear
        if (!leap || leap < monthIndex) date.lMonth -= 1 // 闰月修正
        this.monthIndex = date.lMonth
        this.day = date.lDay
      } else {
        const date = calendar.lunar2solar(year, monthIndex, day)
        this.year = date.cYear
        this.monthIndex = date.cMonth - 1
        this.day = date.cDay
      }
    },
    /**
     * 监听月份变动，避免某月不存在的日子被选中，比如从大月31日切换为小月时
     */
    monthIndex () {
      const maxDayIndex = this.dateList.length - 1
      const dayIndex = this.day - 1
      if (dayIndex > maxDayIndex) this.dayIndex = maxDayIndex
    },
  },
  methods: {
    open () {
      this.visible = true
      this.isLunar = this.date.isLunar
      this.year = this.date.year
      this.monthIndex = this.date.monthIndex
      this.day = this.date.day
    },
    close () {
      this.visible = false
      this.$emit('close')
    },
    submit () {
      this.visible = false
      const result = {
        isLunar: this.isLunar,
        year: this.year,
        monthIndex: this.monthIndex,
        day: this.day,
        leapMonth: calendar.leapMonth(this.year),
      }
      this.$emit('update:date', result)
    },
  },
}
</script>

<style lang="stylus" scoped>
.c-date-selector
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  display flex
  align-items center
  justify-content center
  z-index 100

  .cover
    position absolute
    left 0
    top 0
    display block
    width 100%
    height 100%
    background-color rgba(#000, .2)
    z-index @z-index - 1

  .wrap
    position relative
    display flex
    flex-direction column
    width 90%
    background-color #fff
    padding $md
    border-radius $sm
    box-shadow inset 0 0 8px 'hsla(%s, 0%, 80%, 0.4)' % $colorAngle
    z-index @z-index + 1

    header
      display flex
      justify-content space-between

  .selector-wrap
    display flex
    flex-direction column

    .year-selector
      overflow hidden
      height 3em
      margin $md 0

      > span
        margin 0 1em

    .days-wrap
      display flex
      justify-content center
      height 200px

      .month-selector
        flex none
        width 4.5em

      .days-selector
        flex none
        width 4.5em
        margin-left $lg

  footer
    display flex
    justify-content space-between
    margin-top $md

</style>

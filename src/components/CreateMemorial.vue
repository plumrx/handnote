<template>
  <div class="c-create-memoria">
    <form
      ref="form"
      class="form-wrap"
      onsubmit="return false;"
      @submit="onSave"
    >
      <label class="form-item">
        <span class="label">类型</span>
        <el-radio-group v-model="memorial.type">
          <el-radio-button
            v-for="(label, type) in types"
            :key="type"
            :label="type"
          > {{ label }} </el-radio-button>
        </el-radio-group>
      </label>

      <el-collapse-transition>
        <label v-if="['birthday'].includes(memorial.type)" class="form-item">
          <span class="label">{{ nameLabel }}</span>
          <el-input
            ref="name"
            v-model="memorial.name"
            autofocus
            clearable
          />
        </label>
      </el-collapse-transition>

      <label class="form-item">
        <span class="label">{{ dateLabel }}</span>
        <el-input
          prefix-icon="el-icon-date"
          :value="selectedDateText"
          :readonly="true"
          @focus="openDateSelector"
        />
      </label>

      <button class="hidden" type="submit" />
    </form>

    <DateSelector ref="date" :date.sync="memorial.date" />

  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import moment from 'moment'
import calendar from '@/utils/calendar'
import { types } from '@/stores/memorial'
import DateSelector from '@/components/DateSelector'

export default {
  name: 'CreateMemorial',
  components: {
    DateSelector,
  },
  data () {
    return {
      memorial: {
        type: 'birthday',
        name: '',
        date: {
          isLunar: false,
          year: new Date().getFullYear(),
          monthIndex: new Date().getMonth(),
          day: new Date().getDate(),
          leapMonth: 0,
        },
      },
      showHelp: false,
    }
  },
  computed: {
    ...mapState('memorial', ['types']),
    year () {
      const { isLunar, year } = this.memorial.date
      if (!isLunar) return `${year}年`
      return `${calendar.toChinaYear(year)}年`
    },
    month () {
      const { monthIndex, isLunar, leapMonth } = this.memorial.date
      if (!isLunar) return `${monthIndex + 1}月`
      const months = [...calendar.nStr3]
      if (leapMonth > 0) months.splice(leapMonth, 0, `闰${months[leapMonth]}`)
      return `${months[monthIndex]}月`
    },
    day () {
      const { day, isLunar } = this.memorial.date
      if (!isLunar) return `${day}日`
      return calendar.toChinaDay(day)
    },
    weekday () {
      const { year, monthIndex, day } = this.memorial.date
      const weekday = moment([year, monthIndex, day]).day() || 10
      return `星期${calendar.nStr1[weekday]}`
    },
    selectedDateText () {
      const { isLunar } = this.memorial.date
      if (!isLunar) return `${this.year}${this.month}${this.day} ${this.weekday}`
      return `农历${this.year}${this.month}${this.day}`
    },
    nameLabel () {
      switch (this.memorial.type) {
        case 'birthday': return '寿星'
        default: return '名称'
      }
    },
    dateLabel () {
      switch (this.memorial.type) {
        case 'birthday': return '出生日期'
        case 'loveAnniversary': return '相恋时间'
        default: return '日期'
      }
    },
  },
  created () {
    this.$parent.$on('save', this.onSave)
  },
  methods: {
    ...mapMutations('memorial', {
      'updateList': types.UPDATE_LIST,
    }),
    onSave () {
      const item = { ...this.memorial }
      const { isLunar, year, monthIndex, day } = item.date
      // 保存事件发生时的公农历信息
      if (isLunar) {
        item.solar = calendar.lunar2solarByIndex(year, monthIndex, day)
      } else {
        item.solar = calendar.solar2lunar(year, monthIndex + 1, day)
      }
      this.updateList(item)
      this.clear()
      this.$router.replace({ name: 'events' })
    },
    clear () {
      this.$refs.form.reset()
    },
    openDateSelector () {
      this.$refs.date.open()
    },
  },
}
</script>

<style lang="stylus" scoped>
.c-create-memoria
  display flex
  flex-direction column
  padding $md

  .form-wrap
    display flex
    flex-direction column
    width 100%
    margin-bottom $md

    .form-item
      display flex
      align-items center
      height 60px

      .label
        display flex
        justify-content flex-end
        flex none
        width 5em
        padding-right 1em

      .more
        margin-left 1em

      .year-picker
        width 10em
        margin-left 1em

  .help
    align-self flex-start
    color $secondary
    margin-bottom $sm

  .description
    h2
      margin-top 0

    .tips
      font-style italic
      color $dark * 3

</style>

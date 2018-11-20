<template>
  <el-card>
    <div class="c-event-card love-anniversary" :class="{verbose}" @click="onClick">
      <div class="left">
        <h3 class="name">❤ 我们在一起 {{ days }} 天啦！</h3>
        <el-collapse-transition>
          <p v-if="verbose" class="information">{{ information }}</p>
        </el-collapse-transition>
      </div>
      <div class="right">
        {{ remaining ? `${remaining}天后` : '今天' }} {{ age }} 周年
      </div>
    </div>

  </el-card>
</template>

<script>
import moment from 'moment'

export default {
  name: 'EventCardLoveAnniversary',
  props: {
    type: { type: String, required: true, validator: val => val === 'loveAnniversary' },
    date: { type: Object, required: true },
    solar: { type: Object, required: true },
    remaining: { type: Number, required: true },
    level: { type: String, required: true, validator: val => ['today', 'tomorrow', 'week', 'month', 'future'].includes(val) },
  },
  data () {
    return {
      verbose: ['today', 'tomorrow', 'week'].includes(this.level),
    }
  },
  computed: {
    days () {
      const { year, monthIndex, day } = this.date
      return moment().diff([year, monthIndex, day], 'days')
    },
    age () {
      const { cYear, cMonth, cDay } = this.solar
      return moment().diff([cYear, cMonth - 1, cDay], 'year') + 1
    },
    information () {
      const { solar } = this.$props
      return `${solar.cYear}年${solar.cMonth}月${solar.cDay}日开始我们在一起啦`
    },
  },
  methods: {
    onClick () {
      this.verbose = !this.verbose
    },
  },
}
</script>

<style lang="stylus" scoped>
.c-event-card.love-anniversary
  position relative
  display flex
  flex-direction row
  justify-content space-between

  &::before
    content 'LOVE'

  .left
    display flex
    flex-direction column

    .name
      font-weight bold
      color $secondary

    .information
      font-size 80%
      color #999

  &.verbose
    .name
      color $primary

</style>

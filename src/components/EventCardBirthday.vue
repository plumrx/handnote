<template>
  <el-card>
    <div class="c-event-card birthday" :class="{verbose}" @click="onClick">
      <div class="left">
        <h3 class="name" :title="name">{{ name }}</h3>
        <el-collapse-transition>
          <p v-if="verbose" class="information">{{ information }}</p>
        </el-collapse-transition>
      </div>
      <div class="right">
        {{ remaining ? `${remaining}天后` : '今天' }} {{ age }} 岁生日
      </div>
    </div>

  </el-card>
</template>

<script>
import moment from 'moment'

export default {
  name: 'EventCardBirthday',
  props: {
    type: { type: String, required: true, validator: val => val === 'birthday' },
    name: { type: String, required: true },
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
    isLunar () { return this.date.isLunar },
    age () {
      const { cYear, cMonth, cDay } = this.solar
      return moment().diff([cYear, cMonth - 1, cDay], 'year') + 1
    },
    information () {
      const { solar } = this.$props
      if (this.isLunar) {
        return `农历${solar.lYear}年${solar.IMonthCn}${solar.IDayCn} ${solar.Animal}年 ${solar.astro}`
      }
      return `公历${solar.cYear}年${solar.cMonth}月${solar.cDay}日 ${solar.Animal}年 ${solar.astro}`
    },
  },
  methods: {
    onClick () {
      this.verbose = !this.verbose
      // this.$dialog.confirm('确认要删除?')
      //   .then(() => {
      //     this.$emit('delete')
      //   })
    },
  },
}
</script>

<style lang="stylus" scoped>
.c-event-card.birthday
  position relative
  display flex
  flex-direction row
  justify-content space-between

  &::before
    content 'BIRTHDAY'

  .left
    display flex
    flex-direction column

    .name
      font-weight bold
      color #666

    .information
      font-size 80%
      color #999

  &.verbose
    .name
      color #333

</style>

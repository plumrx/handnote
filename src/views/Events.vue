<template>
  <div class="p-events">
    <CommonHeader :pinned="true">
      NOTE
      <span slot="left" />
    </CommonHeader>
    <main class="container">
      <section v-for="(group, label) in groups" :key="label" class="group">
        <template v-if="group && group.length">
          <h3 class="slogan">{{ groupMap[label] || label }}</h3>
          <ul class="card-list">
            <li v-for="(item, index) in group" :key="`${item.type}-${index}`" class="card-item">
              <component
                :is="componentsMap[item.type]"
                v-bind="item"
                :level="label"
                @delete="onDelete(label, index)"
              />
            </li>
          </ul>
        </template>
      </section>
    </main>

    <FooterGuide />

  </div>
</template>

<script>
import _ from 'lodash'
import FooterGuide from '@/components/FooterGuide'
import EventCardBirthday from '@/components/EventCardBirthday'
import EventCardLoveAnniversary from '@/components/EventCardLoveAnniversary'

const componentsMap = {
  birthday: EventCardBirthday,
  loveAnniversary: EventCardLoveAnniversary,
}
const groupMap = {
  today: '今天',
  tomorrow: '明天',
  week: '一周内',
  month: '一个月内',
  future: '未来',
}

export default {
  name: 'Events',
  components: { FooterGuide },
  data () {
    return {
      componentsMap,
      groupMap,
    }
  },
  computed: {
    list () {
      const list = [
        ...this.memorialList,
      ]
      return list.map(item => {
        return item
      })
    },
    groups () {
      const group = _.groupBy(this.list, item => {
        if (item.remaining < 1) return 'today'
        if (item.remaining < 2) return 'tomorrow'
        if (item.remaining < 7) return 'week'
        if (item.remaining < 30) return 'month'
        return 'future'
      })
      return {
        today: group.today,
        tomorrow: group.tomorrow,
        week: group.week,
        month: group.month,
        future: group.future,
      }
    },
    memorialList () {
      return this.$store.getters['memorial/list'] || []
    },
  },
  methods: {
    onDelete (group, index) {
      console.log(group, index)
    },
  },
}
</script>

<style lang="stylus">
.p-events

  main.container
    position relative
    padding-left $md
    padding-right $md

    &::before
      content ''
      position absolute
      top 0
      bottom 0
      left $lg
      display block
      border-left 8px solid 'hsl(%s, 100%, 96%)' % $colorAngle
      z-index -1

  .group
    margin $xl 0

    .slogan
      position relative
      padding-left $xl
      margin 0

      &::before
        content ''
        position absolute
        left 5px
        top 50%
        width 12px
        height @width
        margin-top -8px
        border 1px solid $tertiary
        border-radius @width
        background $secondary

    ul.card-list
      margin-top $sm

      li.card-item
        margin-bottom $sm

        .el-card__body
          padding 0 $md

  .c-event-card
    display flex
    align-items center
    justify-content flex-start
    height 50px

    &::before
      position absolute
      color 'hsla(%s, 100%, 50%, 0.04)' % $colorAngle
      font-size 400%
      font-weight bold
      left -0.2em
      bottom -30px
      z-index 1
      pointer-events none

    &.verbose
      height 80px

      &::before
        font-size 500%

</style>

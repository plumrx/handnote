<template>
  <div class="p-wishes">
    <common-header :pinned="false">
      愿望单
      <span slot="left" />
    </common-header>
    <main v-if="list.length">
      <section v-for="category in categories" :key="category.label">
        <table class="category-table">
          <caption>{{ category.label }}</caption>
          <thead>
            <tr>
              <th class="name">name</th>
              <th class="price">unit price</th>
              <th class="count" />
            </tr>
          </thead>
          <tbody>
            <tr v-for="wish in wishes[category.label]" :key="wish.updateAt" @click="onWishClick(wish)">
              <td class="name">{{ wish.name }}</td>
              <td class="price">{{ wish.price.toFixed(2) }}</td>
              <td class="count">x{{ wish.count || 1 }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td class="name" colspan="3">共 {{ wishes[category.label].length }} 件</td>
            </tr>
            <tr>
              <td class="name"><strong>小结</strong></td>
              <td class="price node-summary">{{ summaryCategory(category) }}</td>
              <td class="count" />
            </tr>
          </tfoot>
        </table>
      </section>
      <footer class="summary">
        SUM
        <output>¥ {{ summary }}</output>
        <small>FOR {{ list.length }} ITEMS</small>
      </footer>
    </main>
    <main v-else class="empty">
      <h2>你的愿望单是空的</h2>
      <p>赶紧添加一个愿望吧</p>
    </main>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapMutations } from 'vuex'
import { types } from '@/stores/wishes'

export default {
  name: 'Wishes',
  computed: {
    ...mapState('wishes', ['list', 'categories']),
    wishes () {
      return _.groupBy(this.list, 'category')
    },
    summary () {
      return _.map(this.list, 'price').reduce((total, val) => total + val).toFixed(2)
    },
  },
  methods: {
    ...mapMutations('wishes', {
      updateList: types.UPDATE_LIST,
      deleteItem: types.DELETE_ITEM,
    }),
    summaryCategory (cate) {
      const prices = _.map(this.wishes[cate.label], 'price')
      return prices.reduce((total, val) => total + val).toFixed(2)
    },
    onWishClick (wish) {
      if (window.confirm('确定要删除这一项？')) {
        this.deleteItem(wish)
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.p-wishes
  background-color #fff

  main.empty
    height 100%
    display flex
    flex-direction column
    justify-content space-around
    align-items center
    text-align center
    color $dark * 3

  table.category-table
    width 100%
    padding $lg $xl * 2
    border-bottom $border
    border-spacing 0

    caption
      padding-top $lg
      font-size 18px

    thead th
      border-bottom 1px dashed $border-color
      padding-bottom $sm

    tbody
      td
        padding ($sm / 2) 0
      tr:nth-child(2n)
        background-color "hsla(%s, 100%, 99%, 1)" % $colorAngle

    tfoot
      td
        padding-top $sm
      tr:nth-child(1)
        td
          border-top 2px solid $border-color

    .name
      text-align center

    .price
      text-align right
      width 5em

      &.node-summary::before
        content '¥'

    .count
      text-align left
      width 3em
      padding-left .5em

  .summary
    text-align center
    padding $lg 0
    font-size 2em
    color $dark * 3

    output
      display block
      font-size 2em
      color $secondary

</style>

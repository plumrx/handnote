<template>
  <div class="p-wishes">
    <common-header>愿望单</common-header>
    <main>
      <section v-for="category in categories" :key="category.label">
        <table class="category-table">
          <caption>{{ category.label }}</caption>
          <thead>
            <tr>
              <th class="name">name</th>
              <th class="price">price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="wish in wishes[category.label]" :key="wish.updateAt">
              <td class="name">{{ wish.name }}</td>
              <td class="price">{{ wish.price.toFixed(2) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td class="name">小结</td>
              <td class="price">{{ summaryCategory(category) }}</td>
            </tr>
          </tfoot>
        </table>
      </section>
      <footer class="summary">
        SUMMARY
        <output>{{ summary }}</output>
      </footer>
    </main>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'

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
    summaryCategory (cate) {
      const prices = _.map(this.wishes[cate.label], 'price')
      return prices.reduce((total, val) => total + val).toFixed(2)
    },
  },
}
</script>

<style lang="stylus" scoped>
.p-wishes
  background-color #fff

  table.category-table
    width 100%
    padding $lg $xl * 2
    border-bottom $border

    caption
      padding-top $lg
      font-size 18px

    tfoot td
      border-top 1px dashed $border-color
      padding-top $sm

    .name
      text-align center

    .price
      text-align right

  .summary
    text-align center
    padding-top $lg

    output
      display block
      font-size 40px

</style>

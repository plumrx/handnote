<template>
  <div class="p-inventory">
    <common-header :pinned="false">
      囤货清单
      <span slot="left" />
    </common-header>
    <main v-if="list.length">
      <el-tabs v-model="activeName">
        <el-tab-pane
          v-for="rootCate in filterCategory('')"
          :key="`${rootCate.root}-${rootCate.label}`"
          :label="rootCate.label"
          :name="rootCate.label"
        >
          <section v-for="subCate in filterCategory(rootCate.label)" :key="subCate.label">
            <table v-if="filterInventory(`${rootCate.label}-${subCate.label}`).length" class="category-table">
              <caption>{{ subCate.label }}</caption>
              <thead>
                <tr>
                  <th class="name">name</th>
                  <th class="name" colspan="2">count</th>
                  <th class="expired">expired</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in filterInventory(`${rootCate.label}-${subCate.label}`)" :key="index">
                  <td class="name">{{ item.name }}</td>
                  <td class="count">x{{ item.count }}</td>
                  <td class="unit">{{ item.unit }}</td>
                  <td class="expired">{{ item.expired | timeTo }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td class="name" colspan="4">共 {{ 1 }} 件</td>
                </tr>
              </tfoot>
            </table>
          </section>
        </el-tab-pane>
      </el-tabs>

    </main>
    <main v-else class="empty">
      <h2>你的囤货单是空的</h2>
      <p>赶紧添加一些囤货吧</p>
    </main>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapMutations } from 'vuex'
import { types } from '@/stores/inventory'

export default {
  name: 'Inventory',
  data () {
    return {
      activeName: '日用品',
    }
  },
  computed: {
    ...mapState('inventory', ['list', 'categories']),
    inventory () {
      return _.groupBy(this.list, 'category')
    },
  },
  methods: {
    ...mapMutations('inventory', {
      updateList: types.UPDATE_LIST,
      deleteItem: types.DELETE_ITEM,
    }),
    filterCategory (parent) {
      return this.categories.filter(c => c.parent === parent)
    },
    filterInventory (category) {
      return this.list.filter(i => i.category.join('-') === category)
    },
  },
}
</script>

<style lang="stylus" scoped>
.p-inventory
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

    .count
      text-align right
      width 3em
      padding-left .5em

    .unit
      text-align left
      width 2em

    .expired
      text-align right

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

<style lang="stylus">
.p-inventory
  .el-tabs__nav-wrap
    padding 0 $md

</style>

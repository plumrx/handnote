<template>
  <div class="c-create-inventory">
    <form class="form-wrap" onsubmit="return false;" @submit="onSave">
      <label class="form-item">
        <span class="label">分类</span>
        <el-cascader
          v-model="inventory.category"
          :options="categories"
          filterable
          change-on-select
          placeholder="请选择或搜索"
        />
        <el-button tabindex="-1" class="more" type="text">管理</el-button>
      </label>
      <label class="form-item">
        <span class="label">品名</span>
        <el-input
          ref="name"
          v-model="inventory.name"
          autofocus
          clearable
        />
      </label>
      <label class="form-item">
        <span class="label">数量</span>
        <el-input-number
          v-model="inventory.count"
          :min="0"
          size="small"
        />
        <el-radio-group v-model="inventory.unit" size="small">
          <el-radio-button label="个" />
          <el-radio-button label="克" />
          <el-radio-button label="毫升" />
        </el-radio-group>
      </label>
      <label class="form-item">
        <span class="label">保质期</span>
        <el-date-picker
          v-model="inventory.expired"
          align="right"
          :picker-options="expiredOptions"
        />
      </label>
      <label class="form-item">
        <span class="label">备注</span>
        <el-input
          v-model="inventory.remarks"
          :autosize="{minRows: 3, maxRows: 10}"
          type="textarea"
          placeholder="放在..."
        />
      </label>
      <button class="hidden" type="submit" />
    </form>

    <button
      class="help"
      type="button"
      tabindex="-1"
      @click="showHelp = !showHelp"
    >
      囤货是什么 <i class="el-icon-question" />
    </button>
    <el-collapse-transition>
      <el-card v-if="showHelp" class="description">
        <h2>囤货</h2>
        <p>
          你已经买了许多东西，却苦于不知道有多少，多久过期，放在哪里。
          <br>
          现在你可以把你的囤货，列在这个清单里并统一管理它们。
        </p>
        <hr>
        <p>
          <strong>分类：</strong>
          你需要点击先点击管理按钮管理分类，添加好新的分类后才能在这里选择或者搜索。
          <br>
          <small class="tips">tips: 你可以选择或搜索已有的分类</small>
        </p>
        <p>
          <strong>品名：</strong>
          物品的名称，没什么可多说的。
        </p>
        <p>
          <strong>数量&单位：</strong>
          物品的数量和单位，没什么可多说的。
        </p>
        <p>
          <strong>保质期：</strong>
          物品过期日期。
          <br>
          <small class="tips">tips: 物品的过期时间会显示在日历中，在快过期的前 1 个月、1 周和当天会提示你。</small>
        </p>
        <p>
          <strong>备注：</strong>
          你可以在这里填写一些其他的信息，比如物品存放的位置等。
        </p>
      </el-card>
    </el-collapse-transition>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { types } from '@/stores/inventory'
import { onFuture } from '@/utils/datetimePicker'

export default {
  name: 'CreateInventory',
  data () {
    return {
      inventory: {
        category: [],
        name: '',
        count: 1,
        unit: '个',
        expired: new Date(),
        remarks: '',
      },
      showHelp: false,
      expiredOptions: {
        shortcuts: [
          { text: '明天', onClick: onFuture(1) },
          { text: '3天后', onClick: onFuture(3) },
          { text: '1周后', onClick: onFuture(7) },
          { text: '2周后', onClick: onFuture(14) },
          { text: '1个月后', onClick: onFuture(30) },
        ],
      },
    }
  },
  computed: {
    ...mapState('inventory', { originCategories: 'categories' }),
    categories () {
      const origin = this.$store.state.inventory.categories
      const categories = origin.map(item => ({
        parent: item.parent,
        label: item.label,
        value: item.label,
      }))
      return this.convertCategories(categories, '')
    },
  },
  created () {
    this.$parent.$on('save', this.onSave)
  },
  methods: {
    ...mapMutations('inventory', {
      'updateList': types.UPDATE_LIST,
    }),
    onSave () {
      this.updateList({
        ...this.inventory,
        updateAt: +new Date(),
      })
      this.clear()
      this.$refs.name.focus()
    },
    clear () {
      this.inventory.name = ''
      this.inventory.count = 1
      this.inventory.remarks = ''
    },
    /**
     * 将分类的平行数据结构转化为树形结构
     */
    convertCategories (array, parent) {
      const result = []
      for (const category of array) {
        if (category.parent === parent) {
          const children = this.convertCategories(array, category.label)
          if (children.length) category.children = children
          result.push(category)
        }
      }
      return result
    },
  },
}
</script>

<style lang="stylus" scoped>
.c-create-inventory
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

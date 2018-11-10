<template>
  <div class="c-create-wishes">
    <form class="form-wrap" onsubmit="return false;" @submit="onSave">
      <label class="form-item">
        <span class="label">分类</span>
        <el-select
          v-model="wish.category"
          filterable
          allow-create
          default-first-option
          placeholder="购物津贴满减"
        >
          <el-option
            v-for="category in categories"
            :key="category.label"
            :label="category.label"
            :value="category.label"
          />
        </el-select>
        <el-button tabindex="-1" class="more" type="text">管理</el-button>
      </label>
      <label class="form-item">
        <span class="label">店铺</span>
        <el-select
          v-model="wish.shop"
          filterable
          allow-create
          default-first-option
          placeholder="可选择或直接输入"
          tabindex="-1"
        >
          <el-option
            v-for="shop in shops"
            :key="shop"
            :label="shop"
            :value="shop"
          />
        </el-select>
        <el-button tabindex="-1" class="more" type="text">管理</el-button>
      </label>
      <label class="form-item">
        <span class="label">物品</span>
        <el-input
          ref="name"
          v-model="wish.name"
          autofocus
          clearable
        />
      </label>
      <label class="form-item">
        <span class="label">数量</span>
        <el-input-number v-model="wish.count" :min="1" :precision="0" />
      </label>
      <label class="form-item price">
        <span class="label">价格</span>
        <el-input
          v-model.number="wish.price"
          :step="0.01"
          type="number"
          placeholder="0.00"
        />
      </label>
      <label class="form-item summary price">
        <span class="label">总价</span>
        <DynamicNumber :value="summary" :precision="2" />
      </label>
      <button class="hidden" type="submit" />
    </form>

    <button class="help" type="button" @click="showHelp = !showHelp">愿望单是什么 <i class="el-icon-question" /></button>
    <el-collapse-transition>
      <el-card v-if="showHelp" class="description">
        <h2>愿望单</h2>
        <p>
          你是不是有很多想买的东西却又没钱。
          <br>
          现在你可以把你想要的东西，列在这里，然后慢慢清空它。
        </p>
        <p>
          <strong>分类：</strong>
          每个分类下的物品可以独立计算总价，并且可以设置满减活动。
          <br>
          你还可以给分类设置一个时间，它会同步到日程表上。
          <br>
          <small class="tips">tips: 你可以直接输入一个新的分类或选择已有的分类</small>
        </p>
        <p>
          <strong>店铺：</strong>
          你还可以给某个物品设置所属店铺，用于计算店铺满减。
          <br>
          <small class="tips">tips: 你可以直接输入一个新的店铺或选择已有的店铺</small>
        </p>
        <p>
          <strong>物品：</strong>
          物品的名称，没什么可多说的。
        </p>
        <p>
          <strong>价格：</strong>
          物品单品参与满减前的价格，但是可以先减去商品自己的折扣。
        </p>
      </el-card>
    </el-collapse-transition>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { types } from '@/stores/wishes'
import DynamicNumber from '@/components/DynamicNumber'

export default {
  name: 'CreateWishes',
  components: { DynamicNumber },
  data () {
    return {
      wish: {
        category: '未分类',
        shop: undefined,
        name: '',
        count: 1,
        price: undefined,
      },
      showHelp: false,
    }
  },
  computed: {
    ...mapState('wishes', ['categories', 'shops']),
    summary () {
      const { price, count } = this.wish
      const sum = price * count || 0
      return sum
    },
  },
  created () {
    this.$parent.$on('save', this.onSave)
  },
  methods: {
    ...mapMutations('wishes', {
      'updateCategories': types.UPDATE_CATEGORIES,
      'updateShops': types.UPDATE_SHOPS,
      'updateList': types.UPDATE_LIST,
    }),
    onSave () {
      this.updateCategories({ label: this.wish.category })
      this.updateShops({ label: this.wish.shop })
      this.updateList({
        ...this.wish,
        updateAt: +new Date(),
      })
      this.clear()
      this.$refs.name.focus()
    },
    clear () {
      this.wish.name = ''
      this.wish.price = undefined
    },
  },
}
</script>

<style lang="stylus" scoped>
.c-create-wishes
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

<style lang="stylus">
.c-create-wishes
  .form-item
    &.price
      height 70px !important

      input.el-input__inner
        height @height - 20
        font-size 2em
        letter-spacing 4px

    &.summary
      span.c-dynamic-number
        padding 0 15px
        border none
        background-color transparent
        color $primary
        font-size 2.4em
        letter-spacing 4px

</style>

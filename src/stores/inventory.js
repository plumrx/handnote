import _ from 'lodash'
import localStore from '@/utils/localStore'

const initCategories = [
  { parent: '', label: '未分类' },
  { parent: '', label: '日用品' },
  { parent: '日用品', label: '纸巾' },
  { parent: '日用品', label: '洗脸巾' },
  { parent: '日用品', label: '姨妈巾' },
  { parent: '日用品', label: '棉条' },
  { parent: '日用品', label: '洗衣液' },
  { parent: '日用品', label: '洗手液' },
  { parent: '日用品', label: '沐浴露' },
  { parent: '日用品', label: '洗发水' },
  { parent: '日用品', label: '牙膏牙刷' },
  { parent: '日用品', label: '鞋垫袜子' },
  { parent: '日用品', label: '安全套' },
  { parent: '', label: '彩妆' },
  { parent: '彩妆', label: '妆前乳' },
  { parent: '彩妆', label: '粉底' },
  { parent: '彩妆', label: '散粉' },
  { parent: '彩妆', label: '定妆喷雾' },
  { parent: '彩妆', label: '眉部产品' },
  { parent: '彩妆', label: '眼影' },
  { parent: '彩妆', label: '眼线' },
  { parent: '彩妆', label: '睫毛膏' },
  { parent: '彩妆', label: '修容' },
  { parent: '彩妆', label: '腮红' },
  { parent: '彩妆', label: '唇部产品' },
  { parent: '彩妆', label: '高光' },
  { parent: '彩妆', label: '香水' },
  { parent: '', label: '护肤品' },
  { parent: '护肤品', label: '卸妆' },
  { parent: '护肤品', label: '防晒' },
  { parent: '护肤品', label: '洁面' },
  { parent: '护肤品', label: '爽肤水' },
  { parent: '护肤品', label: '精华' },
  { parent: '护肤品', label: '乳液' },
  { parent: '护肤品', label: '眼霜' },
  { parent: '护肤品', label: '面霜' },
  { parent: '护肤品', label: '护手霜' },
  { parent: '护肤品', label: '身体乳' },
  { parent: '', label: '食品' },
  { parent: '食品', label: '生鲜' },
  { parent: '食品', label: '干货' },
  { parent: '食品', label: '速食品' },
  { parent: '食品', label: '饮品' },
]

const state = {
  categories: localStore.getData('inventory_categories') || initCategories,
  list: localStore.getData('inventory_list') || [],
}

const getters = {
  groupedCategories: state => {
    return _.groupBy(state.categories, 'parent')
  },
}

export const types = {
  UPDATE_CATEGORIES: 'UPDATE_CATEGORIES',
  UPDATE_LIST: 'UPDATE_LIST',
  DELETE_ITEM: 'DELETE_ITEM',
}

const mutations = {
  [types.UPDATE_CATEGORIES] (state, categories) {
    if (categories instanceof Object) {
      if (categories.label) { categories = [categories] } else return
    }
    state.categories = _.unionBy(state.categories, categories, c => `${c.parent}-${c.label}`)
    localStore.setData('inventory_categories', state.categories)
  },

  [types.UPDATE_LIST] (state, list) {
    if (list instanceof Object) {
      if (list.name) { list = [list] } else return
    }
    state.list = _.unionBy(state.list, list, item => `${item.parent}-${item.category}-${item.name}`)
    localStore.setData('inventory_list', state.list)
  },

  [types.DELETE_ITEM] (state, inventory) {
    state.list = _.reject(state.list, item => inventory.category === item.category && inventory.name === item.name)
    localStore.setData('inventory_list', state.list)
  },

}

const actions = { }

export default { namespaced: true, state, getters, mutations, actions }

import _ from 'lodash'
import localStore from '@/utils/localStore'

const state = {
  categories: localStore.getData('wishes_categories') || [{ label: '未分类', sort: 0 }],
  shops: localStore.getData('wishes_shops') || [],
  list: localStore.getData('wishes_list') || [],
}

const getters = { }

export const types = {
  UPDATE_CATEGORIES: 'UPDATE_CATEGORIES',
  UPDATE_SHOPS: 'UPDATE_SHOPS',
  UPDATE_LIST: 'UPDATE_LIST',
}

const mutations = {
  [types.UPDATE_CATEGORIES] (state, categories) {
    if (categories instanceof Object) {
      if (categories.label) { categories = [categories] } else return
    }
    state.categories = _.unionBy(state.categories, categories, 'label')
    localStore.setData('wishes_categories', state.categories)
  },

  [types.UPDATE_SHOPS] (state, shops) {
    if (shops instanceof Object) {
      if (shops.label) { shops = [shops] } else return
    }
    state.shops = _.unionBy(state.shops, shops, 'label')
    localStore.setData('wishes_shops', state.shops)
  },

  [types.UPDATE_LIST] (state, list) {
    if (list instanceof Object) {
      if (list.name) { list = [list] } else return
    }
    state.list = _.unionBy(state.list, list, wish => wish.category + wish.name)
    localStore.setData('wishes_list', state.list)
  },
}

const actions = {
}

export default { namespaced: true, state, getters, mutations, actions }

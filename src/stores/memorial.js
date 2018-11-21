import _ from 'lodash'
import calendar from '@/utils/calendar'
import localStore from '@/utils/localStore'

const state = {
  types: {
    birthday: '生日',
    loveAnniversary: '恋爱纪念日',
  },
  list: localStore.getData('memorial_list') || [],
}

const getters = {
  list: state => state.list.map(item => {
    item.remaining = calendar.getRemainingDay(item.solar, item.date.isLunar)
    return item
  }),
}

export const types = {
  UPDATE_LIST: 'UPDATE_LIST',
  DELETE_ITEM: 'DELETE_ITEM',
}

const mutations = {

  [types.UPDATE_LIST] (state, list) {
    if (list instanceof Object) {
      if (list.type) { list = [list] } else return
    }
    state.list = _.unionBy(state.list, list, item => `${item.type}-${item.name}`)
    localStore.setData('memorial_list', state.list)
  },

  [types.DELETE_ITEM] (state, memorial) {
    state.list = _.reject(state.list, item => memorial.name === item.name)
    localStore.setData('memorial_list', state.list)
  },

}

const actions = { }

export default { namespaced: true, state, getters, mutations, actions }

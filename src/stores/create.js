import localStore from '@/utils/localStore'

const state = {
  type: localStore.getData('create_type', true),
}

const getters = { }

export const types = {
  CHANGE_TYPE: 'CHANGE_TYPE',
}

const mutations = {
  [types.CHANGE_TYPE] (state, type) {
    state.type = type
    localStore.setData('create_type', type, true)
  },
}

const actions = { }

export default { namespaced: true, state, getters, mutations, actions }

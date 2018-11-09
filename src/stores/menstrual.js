import localStore from '@/utils/localStore'
import Utils from '@/utils'

const state = {
  enable: localStore.getData('menstrual_enable') || false,
  lastDate: localStore.getData('menstrual_lastDate') || null,
  cycle: localStore.getData('menstrual_cycle') || 28,
  during: localStore.getData('menstrual_during') || 6,
}

const getters = {
  /**
   * 根据目标日期是一个周期中的第几天
   */
  daysInCycle: state => target => {
    const startDay = Utils.getDayTimestamp(state.lastDate)
    const endDay = Utils.getDayTimestamp(target.lastDate)
    const offset = (endDay - startDay) / 86400 // 86400 == 24 * 3600
    return offset % state.cycle
  },
  /**
   * 目标日期是否在经期内
   */
  isMenstrualDay: (state, getters) => target => {
    return getters.daysOfCycle(target) < state.during
  },
}

export const types = {
  TOGGLE_ENABLE: 'TOGGLE_ENABLE',
  UPDATE_STATE: 'UPDATE_STATE',
}

const mutations = {
  [types.TOGGLE_ENABLE] (state, status) {
    if (status === undefined) state.enable = !state.enable
    state.enable = status
    localStore.setData('menstrual_enable', status)
  },
  [types.UPDATE_STATE] (state, { key, value }) {
    state[key] = value
    localStore.setData(`menstrual_${key}`, value)
  },
}

const actions = {
  toggleEnable ({ commit }, status) {
    commit(types.TOGGLE_ENABLE, status)
  },
  updateCycle ({ commit }, cycle) {
    commit(types.UPDATE_STATE, { key: 'cycle', value: cycle })
  },
  updateDuring ({ commit }, during) {
    commit(types.UPDATE_STATE, { key: 'during', value: during })
  },
  updateDate ({ commit }, date) {
    commit(types.UPDATE_STATE, { key: 'lastDate', value: date })
  },
}

export default { namespaced: true, state, getters, mutations, actions }

import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import localStore from '@/utils/localStore'

import menstrual from './menstrual'

window.moment = moment

Vue.use(Vuex)

const rootState = {
  current: moment(), // 当前页面时间
  selected: moment(), // 当前选择时间
  color: localStore.getData('themeColor') || '0', // 主题色 HUE 角度
}

const rootGetters = {
  /**
   * 获取当月的第一天
   * @returns {moment.Moment}
   */
  currentYearMonth: state => {
    const year = state.current.year()
    const month = state.current.month()
    return moment([year, month])
  },
}

export const types = {
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  UPDATE_CURRENT: 'UPDATE_CURRENT',
  UPDATE_SELECTED: 'UPDATE_SELECTED',
  SAVE_THEME_COLOR: 'SAVE_THEME_COLOR',
}

const rootMutations = {
  /**
   * 更新当前视图的时间
   * @author mutoe <mutoe@foxmail.com>
   * @param {*} state
   * @param {moment.Moment} momentObject
   */
  [types.UPDATE_CURRENT] (state, momentObject) {
    state.current = moment(momentObject)
  },

  /**
   * 更新当前选择的时间
   * @author mutoe <mutoe@foxmail.com>
   * @param {*} state
   * @param {momnetMoment} momentObject
   */
  [types.UPDATE_SELECTED] (state, momentObject) {
    state.selected = moment(momentObject)
  },

  /**
   * 保存主题色 HUE 角度
   * @author mutoe <mutoe@foxmail.com>
   * @param {*} state
   * @param {*} color
   */
  [types.SAVE_THEME_COLOR] (state, color) {
    state.color = color
    localStore.setData('themeColor', color)
  },

  /**
   * 切换侧栏
   * @author mutoe <mutoe@foxmail.com>
   * @param {*} state
   * @param {boolean} [status]
   */
  [types.TOGGLE_SIDEBAR] (state, status) {
    if (status === undefined) state.sidebar = !state.sidebar
    else state.sidebar = status
  },
}

const rootActions = {}

export default new Vuex.Store({
  state: rootState,
  getters: rootGetters,
  mutations: rootMutations,
  actions: rootActions,
  modules: {
    menstrual,
  },
})

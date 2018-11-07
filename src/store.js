import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import localStore from '@/utils/localStore'

Vue.use(Vuex)

export const types = {
  UPDATE_CURRENT: 'UPDATE_CURRENT',
  UPDATE_SELECTED: 'UPDATE_SELECTED',
  SAVE_THEME_COLOR: 'SAVE_THEME_COLOR',
}

export default new Vuex.Store({
  state: {
    current: moment(),
    selected: moment(),
    color: localStore.getData('themeColor') || '0', // 主题色 HUE 角度
  },
  getters: {
    /**
     * 获取当月的第一天
     */
    currentYearMonth: state => {
      const year = state.current.year()
      const month = state.current.month()
      return moment([year, month])
    },
  },
  mutations: {
    /**
     * 更新当前视图的时间
     *
     * @author mutoe <mutoe@foxmail.com>
     * @param {*} state
     * @param {moment.Moment} momentObject
     */
    [types.UPDATE_CURRENT] (state, momentObject) {
      state.current = moment(momentObject)
    },

    /**
     * 更新当前选择的时间
     *
     * @author mutoe <mutoe@foxmail.com>
     * @param {*} state
     * @param {momnetMoment} momentObject
     */
    [types.UPDATE_SELECTED] (state, momentObject) {
      state.selected = moment(momentObject)
    },

    [types.SAVE_THEME_COLOR] (state, color) {
      state.color = color
      localStore.setData('themeColor', color)
    },

  },
  actions: {

  },
})

import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

export const types = {
  UPDATE_CURRENT: 'UPDATE_CURRENT',
}

export default new Vuex.Store({
  state: {
    current: moment(), // timestamp
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
     * 更新当前操作的时间
     *
     * @author mutoe <mutoe@foxmail.com>
     * @param {*} state
     * @param {moment.Moment} momentObject
     */
    [types.UPDATE_CURRENT] (state, momentObject) {
      state.current = moment(momentObject)
    },
  },
  actions: {

  },
})

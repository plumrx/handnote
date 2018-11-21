import moment from 'moment'
import calendar from './calendar'

// noop
export const noop = () => {}

export default {

  /**
   * 设置主题色
   *
   * @author mutoe <mutoe@foxmail.com>
   * @static
   * @param {number} colorAngle 主题色 HUE 色相环角度
   * @memberof Utils
   */
  setThemeColor (colorAngle) {
    const rootStyle = document.documentElement.style
    rootStyle.setProperty('--color-primary', `hsla(${colorAngle}, 100%, 66%, 1)`)
    rootStyle.setProperty('--color-secondary', `hsla(${colorAngle}, 100%, 80%, 1)`)
    rootStyle.setProperty('--color-tertiary', `hsla(${colorAngle}, 100%, 90%, 1)`)
    rootStyle.setProperty('--color-angle', colorAngle)
  },

  /**
   * 获取某个时间的当日0时的时间戳
   *
   * @author mutoe <mutoe@foxmail.com>
   * @static
   * @param {*} time
   * @returns {number} timestamp
   * @memberof Utils
   */
  getDayTimestamp (time) {
    return +new Date(moment(time).format('YYYY-MM-DD'))
  },

  yearRange: [1900, 2100],

  getYearList () {
    return new Array(this.yearRange[1] - this.yearRange[0])
      .fill()
      .map((val, index) => this.yearRange[0] + index)
  },

  getSolarMonthList () {
    return new Array(12).fill().map((val, index) => `${1 + index}月`)
  },

  getLunarMonthList (year) {
    const leap = calendar.leapMonth(year)
    const monthCN = calendar.nStr3
    const list = monthCN.map((val, index) => calendar.toChinaMonth(index + 1))
    if (leap > 0) list.splice(leap, 0, `润${monthCN[leap - 1]}月`)
    return list
  },

  getSolarDateList (year, month) {
    const days = calendar.solarDays(year, month)
    return new Array(days).fill().map((val, index) => `${index + 1}日`)
  },

  getLunarDateList (year, month) {
    const leap = calendar.leapMonth(year)
    const monthDays = leap ? calendar.leapDays(year) : calendar.monthDays(year, month)
    return new Array(monthDays).fill().map((val, index) => calendar.toChinaDay(index + 1))
  },

  /**
   * 返回某日凌晨时间
   *
   * @author mutoe <mutoe@foxmail.com>
   * @param {*} [time] moment-like 如果不填则获取今天
   * @returns {moment.Moment}
   */
  getToday (time) {
    const YMD = moment(time).format('YYYY-MM-DD').split('-')
    YMD[1]--
    return moment(YMD)
  },

}

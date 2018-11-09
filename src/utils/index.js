import moment from 'moment'

export default class Utils {
  /**
   * 设置主题色
   *
   * @author mutoe <mutoe@foxmail.com>
   * @static
   * @param {number} colorAngel 主题色 HUE 色相环角度
   * @memberof Utils
   */
  static setThemeColor (colorAngel) {
    const rootStyle = document.documentElement.style
    rootStyle.setProperty('--color-primary', `hsla(${colorAngel}, 100%, 60%, 1)`)
    rootStyle.setProperty('--color-secondary', `hsla(${colorAngel}, 100%, 90%, 1)`)
  }

  /**
   * 获取某个时间的当日0时的时间戳
   *
   * @author mutoe <mutoe@foxmail.com>
   * @static
   * @param {*} time
   * @returns {number} timestamp
   * @memberof Utils
   */
  static getDayTimestamp (time) {
    return +new Date(moment(time).format('YYYY-MM-DD'))
  }
}

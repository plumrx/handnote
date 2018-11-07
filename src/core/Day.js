import moment from 'moment'

class Day {
  /**
   * Creates an instance of Day.
   * @author mutoe <mutoe@foxmail.com>
   * @param {Object} args
   * @param {string} args.type
   * @param {number|string} args.day
   * @memberof Day
   */
  constructor (args = {}) {
    this.moment = moment(args.moment) // 当天的 Moment 对象
    this.type = args.type || 'current' // current: 本月, pre: 上个月, next: 下个月
    this.display = args.display || '' // 当月的日期
  }

  add (event) {}
  remove (eventId) {}
}

export default Day

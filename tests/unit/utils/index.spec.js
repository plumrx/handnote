import utils from '@/utils'
import moment from 'moment'

describe('getToday()', () => {
  it('should be return a moment object', () => {
    const result = utils.getToday()
    expect(moment.isMoment(result))
  })

  it('should get today‘s date when there are no params passed', () => {
    const result = utils.getToday()
    const today = +new Date(new Date().setHours(0, 0, 0, 0))
    expect(+result).toBe(today)
  })
})

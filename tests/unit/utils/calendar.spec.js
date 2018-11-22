import calendar from '@/utils/calendar'

describe('公历转农历', () => {
  it('公历2018-11-22 => 农历2018年十月十五', () => {
    const solar = [2018, 11, 22]
    const lunar = [2018, 10, 15, false]
    const date = calendar.solar2lunar(...solar)
    expect(date).toEqual(expect.objectContaining({
      lYear: lunar[0],
      lMonth: lunar[1],
      lDay: lunar[2],
      isLeap: lunar[3],
    }))
  })

  it('公历2023-03-31 => 农历2023年闰二月初十', () => {
    const solar = [2023, 3, 31]
    const lunar = [2023, 2, 10, true]
    const date = calendar.solar2lunar(...solar)
    expect(date).toEqual(expect.objectContaining({
      lYear: lunar[0],
      lMonth: lunar[1],
      lDay: lunar[2],
      isLeap: lunar[3],
    }))
  })
})

describe('农历转公历', () => {
  it('农历2018年十月十五 => 公历2018-11-22', () => {
    const lunar = [2018, 10, 15, false]
    const solar = [2018, 11, 22]
    const date = calendar.lunar2solar(...lunar)
    expect(date).toEqual(expect.objectContaining({
      cYear: solar[0],
      cMonth: solar[1],
      cDay: solar[2],
    }))
  })

  it('农历2023年闰二月初十 => 公历2023-03-31', () => {
    const lunar = [2023, 2, 10, true]
    const solar = [2023, 3, 31]
    let date = calendar.lunar2solar(...lunar)
    expect(date).toEqual(expect.objectContaining({
      cYear: solar[0],
      cMonth: solar[1],
      cDay: solar[2],
    }))
  })
})

describe('农历转公历（索引方法）', () => {
  it('农历2023年闰二月初十 => 公历2023-03-31', () => {
    const lunar = [2023, 2, 10]
    const solar = [2023, 3, 31]
    let date = calendar.lunar2solarByIndex(...lunar)
    expect(date).toEqual(expect.objectContaining({
      cYear: solar[0],
      cMonth: solar[1],
      cDay: solar[2],
    }))
  })
})

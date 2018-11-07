/**
 * localStore
 *
 * 轻量级 localStorage 封装
 * 支持 sessionStorage
 * 支持 Cookie
 */
export default {
  isSupported: (() => {
    try {
      return (
        window.sessionStorage.setItem('calendar', 'lalala'),
        window.sessionStorage.removeItem('calendar'),
        true
      )
    } catch (err) {
      console.warn('你的浏览器不支持本地存储')
      return false
    }
  })(),

  /**
   * @author mutoe <mutoe@foxmail.com>
   * @param {string} key
   * @param {*} value
   * @param {boolean} [session=false]
   */
  setData (key, value, session = false) {
    const store = session ? 'sessionStorage' : 'localStorage'
    value = JSON.stringify(value)
    this.isSupported && window[store] && (window[store][key] = value)
  },

  /**
   * @author mutoe <mutoe@foxmail.com>
   * @param {string} key
   * @param {boolean} [session=false]
   * @returns
   */
  getData (key, session = false) {
    const store = session ? 'sessionStorage' : 'localStorage'
    if (this.hasData(key, session)) {
      try {
        return JSON.parse(window[store][key])
      } catch (error) {
        return window[store][key]
      }
    }
    return null
  },

  /**
   * 判断 local[key] 是否存在
   * @param {string}  key
   * @param {boolean} [session=false]
   * @return {boolean}
   */
  hasData (key, session = false) {
    const store = session ? 'sessionStorage' : 'localStorage'
    try {
      if (window[store] && window[store][key]) return true
    } catch (error) {
      throw new Error(error)
    }
    return false
  },

  /**
   * @author mutoe <mutoe@foxmail.com>
   * @param {string} key
   * @param {boolean} [session=false]
   */
  removeData (key, session = false) {
    const store = session ? 'sessionStorage' : 'localStorage'
    this.isSupported &&
      window[store] &&
      window[store][key] &&
      window[store].removeItem(key)
  },

  /**
   * @author mutoe <mutoe@foxmail.com>
   * @param {boolean} [session=false]
   */
  clearData (session = false) {
    const store = session ? 'sessionStorage' : 'localStorage'
    this.isSupported && window[store] && window[store].clear()
  },

  /**
   * 添加 item 至 local[key]
   * 默认为追加，当 index 值为 "start" 时，表示插入 local[key] 的首位
   *
   * @author mutoe <mutoe@foxmail.com>
   * @param {string} key
   * @param {*} value
   * @param {string} [prepend=false] 是否追加
   * @param {boolean} [session=false]
   */
  addItem (key, value, prepend = false, session = false) {
    const store = session ? 'sessionStorage' : 'localStorage'
    if (this.isSupported && window[store]) {
      const data = this.hasData(key, session) ? this.getData(key, session) : []
      prepend ? data.unshift(value) : data.push(value)
      this.setData(key, data, session)
    }
  },

  /**
   * 获取 local[key] 指定项的值
   *
   * @author mutoe <mutoe@foxmail.com>
   * @param {string} key
   * @param {string|number} property
   * @param {boolean} [session=false]
   * @returns
   */
  getItem (key, property, session = false) {
    const data = this.getData(key, session)
    return data && data[property] ? data[property] : null
  },

  /**
   * @author mutoe <mutoe@foxmail.com>
   * @param {string} key
   * @returns
   */
  getCookie (key) {
    const reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)')
    let cookie
    return document.cookie.length > 0 && (cookie = document.cookie.match(reg))
      ? unescape(cookie[2])
      : null
  },

  /**
   * @author mutoe <mutoe@foxmail.com>
   * @param {string} key
   * @param {string} value
   * @param {number} [expires=0] cookie 生命周期 单位 day，设置为0时只具有 session 有效期
   */
  setCookie (key, value, expires = 0) {
    const exp = +new Date() + expires * 24 * 60 * 60 * 1000
    let cookie = `${key}=${escape(value)}`
    if (expires) cookie += `;expires=${exp.toGMTString()}`
    document.cookie = cookie
  },

  /**
   * @author mutoe <mutoe@foxmail.com>
   * @param {string} key
   */
  clearCookie (key) {
    this.setCookie(key, '', -1)
  },

}


export default {
  /**
   * 设置主题色
   *
   * @author mutoe <mutoe@foxmail.com>
   * @param {number} colorAngel 主题色 HUE 色相环角度
   */
  setThemeColor (colorAngel) {
    const rootStyle = document.documentElement.style
    rootStyle.setProperty('--color-primary', `hsla(${colorAngel}, 100%, 60%, 1)`)
    rootStyle.setProperty('--color-secondary', `hsla(${colorAngel}, 100%, 90%, 1)`)
  },
}

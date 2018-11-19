import moment from 'moment'
import CommonHeader from '@/components/CommonHeader'

moment.updateLocale('zh-cn', {
  relativeTime: {
    future: '%s后',
  },
})

export default {
  components: {
    CommonHeader,
  },
  filters: {
    timeTo (time) {
      return moment().to(time)
    },
  },
  methods: {
    goBack (num = -1) {
      window.history.length <= 1
        ? this.$router.replace('/')
        : this.$router.back(num)
    },
  },
}

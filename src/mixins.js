import CommonHeader from '@/components/CommonHeader'

export default {
  components: {
    CommonHeader,
  },
  methods: {
    goBack (num = -1) {
      window.history.length <= 1
        ? this.$router.replace('/')
        : this.$router.back(num)
    },
  },
}

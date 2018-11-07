<template>
  <div class="home">
    <CalendarMonth />
    <FooterNav />
  </div>
</template>

<script>
import CalendarMonth from '@/components/CalendarMonth'
import FooterNav from '@/components/FooterNav'

export default {
  name: 'Home',
  components: {
    CalendarMonth,
    FooterNav,
  },
}
</script>

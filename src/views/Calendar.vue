<template>
  <div class="p-calendar">
    <CalendarMonth />
    <FooterGuide />
  </div>
</template>

<script>
import FooterGuide from '@/components/FooterGuide'
import CalendarMonth from '@/components/CalendarMonth'

export default {
  name: 'Calendar',
  components: {
    FooterGuide,
    CalendarMonth,
  },
}
</script>

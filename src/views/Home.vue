<template>
  <div class="home">
    <CalendarMonth />
  </div>
</template>

<script>
import CalendarMonth from '@/components/CalendarMonth.vue'

export default {
  name: 'Home',
  components: {
    CalendarMonth,
  },
}
</script>

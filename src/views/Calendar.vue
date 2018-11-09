<template>
  <div class="p-calendar">
    <CalendarMonth />
  </div>
</template>

<script>
import CalendarMonth from '@/components/CalendarMonth'

export default {
  name: 'Calendar',
  components: { CalendarMonth },
}
</script>

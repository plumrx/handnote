<template>
  <div class="c-calendar-month-item">
    {{ day.display }}
  </div>
</template>

<script>
export default {
  name: 'CalendarMonthItem',
  props: {
    day: { type: Object, required: true },
  },
  computed: { },
}
</script>

<style lang="stylus" scoped>
.c-calendar-month-item
  display flex
  justify-content center
  align-items center
  flex none
  width (98vw / 7)
  height @width

</style>

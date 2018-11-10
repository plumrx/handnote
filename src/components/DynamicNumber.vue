<template>
  <span class="c-dynamic-number">{{ tweeningValue }}</span>
</template>

<script>
import TWEEN from '@tweenjs/tween.js'

export default {
  name: 'DynamicNumber',
  props: {
    value: { type: Number, default: 0 },
    precision: { type: Number, default: 0 },
  },
  data () {
    return {
      tweeningValue: 0,
    }
  },
  watch: {
    value (val, old) {
      this.tween(old, val)
    },
  },
  mounted () {
    this.tween(0, this.value)
  },
  methods: {
    tween (start, end) {
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }

      new TWEEN.Tween({ number: start })
        .to({ number: end }, 500)
        .onUpdate(obj => {
          this.tweeningValue = obj.number.toFixed(this.precision)
        })
        .start()

      animate()
    },
  },
}
</script>

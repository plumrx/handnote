<template>
  <div class="p-create">
    <common-header>
      创建事件
      <span slot="right" @click="$emit('save')">保存</span>
    </common-header>
    <main>
      <CreateTypes />
      <router-view />
    </main>
  </div>
</template>

<script>
import { types } from '@/stores/create'
import { mapMutations } from 'vuex'
import CreateTypes from '@/components/CreateTypes'

export default {
  name: 'Create',
  components: { CreateTypes },
  computed: {
    savedType () {
      return this.$store.state.create.type || 'wishes'
    },
    currentType () {
      const type = this.$route.path.split('/').pop()
      return type === 'create' ? undefined : type
    },
  },
  watch: {
    currentType (to, from) {
      if (to !== from) this.changeType(to)
    },
  },
  mounted () {
    if (!this.currentType) this.$router.replace(`/create/${this.savedType}`)
  },
  methods: {
    ...mapMutations('create', {
      changeType: types.CHANGE_TYPE,
    }),
  },
}
</script>

<style lang="stylus" scoped>
.p-create
  display flex

</style>

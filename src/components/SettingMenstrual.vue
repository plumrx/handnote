<template>
  <el-collapse-item class="setting-item" name="menstrual">
    <span slot="title" :class="{ disabled: !enable }" class="item-title">生理期视图</span>
    <el-form class="item-content" label-width="6em" label-position="left">
      <el-form-item label="启用">
        <el-switch :value="enable" @change="toggleEnable" />
      </el-form-item>
      <el-collapse-transition>
        <div v-show="enable">
          <el-form-item label="上次时间">
            <el-date-picker
              v-model="date"
              type="date"
              placeholder="最近一次开始的时间"
              size="small"
            />
          </el-form-item>
          <el-form-item label="间隔时间">
            <el-input-number
              :value="cycle"
              :min="1"
              size="small"
              @change="updateCycle"
            /> 天
          </el-form-item>
          <el-form-item label="持续时间">
            <el-input-number
              :value="during"
              :min="1"
              size="small"
              @change="updateDuring"
            /> 天
          </el-form-item>
        </div>
      </el-collapse-transition>
      <el-card>
        <p>
          生理期视图为您展示您的生理期。
          <br>
          您可以在上面设置最近一次生理期来访的日子、每两次来访间隔时间和每次到访持续时间，
          程序将自动为你计算以后的生理期到访日期。
        </p>
        <p> 关心女友，更关心你。 </p>
      </el-card>
    </el-form>
  </el-collapse-item>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('menstrual')

export default {
  name: 'SettingMenstrual',
  computed: {
    ...mapState(['enable', 'lastDate', 'cycle', 'during']),
    date: {
      get () {
        return this.lastDate
      },
      set (val) {
        this.updateDate(val)
      },
    },
  },
  methods: {
    ...mapActions([
      'toggleEnable',
      'updateDate',
      'updateCycle',
      'updateDuring',
    ]),
  },
}
</script>

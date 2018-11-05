import Vue from 'vue'
import { Message, MessageBox, Notification } from 'element-ui'

Vue.prototype.$dialog = MessageBox
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification

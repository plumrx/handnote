/* eslint-disable no-console */

import { register } from 'register-service-worker'
import { Message } from 'element-ui'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log('Service worker is active.')
    },
    registered (registration) {
      console.log('Service worker has been registered.')
      registration.update()
    },
    cached (registration) {
      console.log('Content has been cached for offline use.')
    },
    updatefound (registration) {
      console.log('New content is downloading.')
    },
    updated (registration) {
      console.log('New content is available; please refresh.')
      Message.success('已获取新版本，将会在下次启动时应用')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    },
  })
}

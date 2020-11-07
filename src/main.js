import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faStopwatch, faCog, faBell, faTimes, faPen, faCheck, faList, faPlay, faPause, faStepForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import VuePageTransition from 'vue-page-transition'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import draggable from 'vuedraggable'

import './styles/style.styl'
import 'noto-sans-tc/noto_sans_tc_regular/css.css'

Vue.use(VuePageTransition)
Vue.use(VueSweetalert2)

library.add(faStopwatch, faCog, faBell, faTimes, faPen, faCheck, faList, faPlay, faPause, faStepForward)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('draggable', draggable)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

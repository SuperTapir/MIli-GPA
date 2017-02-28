// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import cadaMethod from 'components/cadaMethod/cadaMethod'
import rankMethod from 'components/rankMethod/rankMethod'
import standMethod from 'components/standMethod/standMethod'

import 'common/stylus/index.styl'

Vue.use(VueRouter)
Vue.use(ElementUi)
/* eslint-disable no-new */
var router = new VueRouter({
  routes: [
    { path: '/cadaMethod', component: cadaMethod },
    { path: '/rankMethod', component: rankMethod },
    { path: '/standMethod', component: standMethod }
  ],
  linkActiveClass: 'active'
})
router.push('/standMethod')
new Vue({
  el: '#app',
  template: '<App/>',
  router: router,
  components: { App }
})

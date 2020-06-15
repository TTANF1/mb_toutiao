import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引用全局样式表
import './styles/index.less'

// 导入vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'

// 适配设置rem基准值插件
import 'amfe-flexible'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

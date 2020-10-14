import * as uni from './lib/uni'
import * as utils from './lib/utils'
import router from './lib/router'
import vuexState from './lib/vuex'

const util = { ...uni, ...utils }

const install = Vue => {
  Vue.prototype.$util = { ...util, router }
}

export { router, util, vuexState }

export default install

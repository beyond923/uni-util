import vuexState from './lib/vuex';

import router from './lib/router';
import * as uni from './lib/uni';
import * as routine from './lib/routine';

export const util = {
  router,
  ...uni,
  ...routine
};

export { vuexState };

const install = Vue => {
  Vue.prototype.$util = util;
};

export default install;

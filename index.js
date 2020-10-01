import vuexState from './lib/vuex';

import router from './lib/router';
import * as uni from './lib/uni';
import * as utils from './lib/utils';

const util = {
  router,
  ...uni,
  ...utils
};

const install = Vue => {
  Vue.prototype.$util = util;
};

export { vuexState, util };

export default install;

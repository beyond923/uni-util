/**
 * 原vuex
 * 取值 this.$store.state.xxx
 * 设值 this.$store.commit('$vuexState', { property, value })
 *
 * 下面则
 * 取值 this.$state.xxx
 * 设值 this.$state.xxx = xxx
 * */
const vuexState = store => Vue => {
  Vue.prototype.$state = new Proxy(
    {},
    {
      get(target, property) {
        return store.state[property];
      },
      set(target, property, value) {
        store.commit('$vuexState', { property, value });
        return true;
      }
    }
  );
};

vuexState.mutations = {
  $vuexState(state, { property, value }) {
    if (property) state[property] = value;
  }
};

export default vuexState;

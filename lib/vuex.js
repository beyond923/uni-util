/**
 * 原vuex
 * 取值 this.$store.state.xxx
 * 设值 this.$store.commit('_state', { prop, value })
 *
 * 下面则
 * 取值 this.$state.xxx
 * 设值 this.$state.xxx = xxx
 * */
const vuexState = store => Vue => {
  Vue.prototype.$state = new Proxy(
    {},
    {
      get(target, prop) {
        return store.state[prop]
      },
      set(target, prop, value) {
        store.commit('_state', { prop, value })
        return true
      }
    }
  )
}

vuexState.mutations = {
  _state(state, { prop, value }) {
    if (prop) state[prop] = value
  }
}

export default vuexState

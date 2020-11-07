import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const timeleft = parseInt(process.env.VUE_APP_TIMELEFT)
const timeleftBreak = parseInt(process.env.VUE_APP_TIMELEFT_BREAK)

export default new Vuex.Store({
  state: {
    todos: [],
    current: '',
    timeleft: timeleft,
    alarmSelected: './alarms/supercar_short.mp3',
    isbreak: false
  },
  mutations: {
    todoAdd (state, data) {
      state.todos.push({ name: data, edit: false, model: data })
    },
    todoDelete (state, data) {
      state.todos.splice(data, 1)
    },
    todoToggleEdit (state, data) {
      state.todos[data].edit = !state.todos[data].edit
    },
    todoSave (state, data) {
      state.todos[data].edit = false
      state.todos[data].name = state.todos[data].model
    },
    todoCancel (state, data) {
      state.todos[data].edit = false
      state.todos[data].model = state.todos[data].name
    },
    todoDrag (state, data) {
      state.todos = data
    },
    alarmSet (state, data) {
      state.alarmSelected = data
    },
    setTimeleft (state, data) {
      state.timeleft = data
    },
    setCurrent (state, data) {
      state.current = data
    },
    start (state) {
      if (!state.isbreak && (state.current.length === 0 && state.todos.length > 0)) {
        state.current = state.todos[0].name
        state.todos.splice(0, 1)
      } else if (state.isbreak) state.current = '休息一下'
    },
    finish (state) {
      if (state.todos.length > 0) state.isbreak = !state.isbreak
      state.current = ''
      state.timeleft = state.isbreak ? timeleftBreak : timeleft
    }
  },
  getters: {
    todos (state) {
      return state.todos
    },
    alarmSelected (state) {
      return state.alarmSelected
    },
    current (state) {
      return state.current
    },
    timeleft (state) {
      return state.timeleft
    },
    isbreak (state) {
      return state.isbreak
    }
  },
  plugins: [createPersistedState()]
})

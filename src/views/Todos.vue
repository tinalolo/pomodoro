<template lang="pug">
  #todos
    h1.text-center 待辦事項
    b-form-input(v-model="newtodo" placeholder="新增事項..." @keydown.enter="todoAdd")
    b-table-simple.text-white
      draggable(v-model="todos" tag="tbody")
        b-tr(v-if="todos.length === 0")
          td(colspan="2") 沒有資料
        b-tr(v-else v-for="(todo, index) in todos" :key="'key' + index")
          b-td
            b-form-input(v-model="todo.model" v-if="todo.edit" @keydown.enter="todoSave(index)" @keydown.esc="todoCancel(index)")
            span(v-else) {{ todo.name }}
          b-td
            font-awesome-icon.mx-2.cusrsor-pointer(:icon="['fas', ['times']]" @click="todoDelete(index)")
            font-awesome-icon.mx-2.cusrsor-pointer(:icon="['fas', ['pen']]" @click="todoToggleEdit(index)")
</template>

<script>
export default {
  name: 'todos',
  data () {
    return {
      newtodo: '',
      fields: [
        {
          key: 'name',
          label: '事項'
        },
        {
          key: 'action',
          label: '動作'
        }
      ]
    }
  },
  computed: {
    todos: {
      get () {
        return this.$store.getters.todos
      },
      set (value) {
        this.$store.commit('todoDrag', value)
      }
    },
    current () {
      const data = this.$store.getters.current
      return data.length === 0 ? '無事項' : data
    }
  },
  methods: {
    todoAdd () {
      if (this.newtodo.length > 0) {
        this.$store.commit('todoAdd', this.newtodo)
        this.newtodo = ''
      }
    },
    todoDelete (index) {
      this.$store.commit('todoDelete', index)
    },
    todoToggleEdit (index) {
      this.$store.commit('todoToggleEdit', index)
    },
    todoSave (index) {
      this.$store.commit('todoSave', index)
    },
    todoCancel (index) {
      this.$store.commit('todoCancel', index)
    }
  }
}
</script>

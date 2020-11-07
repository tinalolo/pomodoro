<template lang="pug">
  #home.text-center
    h1 番茄鐘
    hr.bg-white
    h1
      font-awesome-icon(:icon="['fas', 'pause']" @click="pause" v-if="status === 'counting'")
      font-awesome-icon(:icon="['fas', 'play']" @click="start" v-else)
      | &emsp;
      font-awesome-icon(:icon="['fas', 'step-forward']" @click="finish(true)" v-if="status !== ''")
    img.w-50(:src="'./img/hourglass.svg'")
    br
    h2 {{ currentText }}
    h2#time {{ timetext }}
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      timer: 0,
      status: ''
    }
  },
  computed: {
    timetext () {
      const m = Math.floor(this.timeleft / 60)
      const s = Math.floor(this.timeleft % 60)
      return `${m} : ${s}`
    },
    currentText () {
      return this.current.length > 0 ? this.current : this.todos.length > 0 ? '點擊開始' : '沒有事項'
    },
    current () {
      return this.$store.getters.current
    },
    timeleft: {
      get () {
        return this.$store.getters.timeleft
      },
      set (value) {
        this.$store.commit('setTimeleft', value)
      }
    },
    todos () {
      return this.$store.getters.todos
    },
    alarmSelected () {
      return this.$store.getters.alarmSelected
    },
    isbreak () {
      return this.$store.getters.isbreak
    }
  },
  methods: {
    start () {
      if (this.status === 'pause') {
        this.status = 'counting'
        this.timer = setInterval(() => {
          this.timeleft--
          if (this.timeleft < 0) {
            this.finish(false)
          }
        }, 1000)
      } else {
        if (this.todos.length > 0 || this.current.length > 0) {
          this.$store.commit('start')
          this.status = 'counting'
          this.timer = setInterval(() => {
            this.timeleft--
            if (this.timeleft < 0) {
              this.finish(false)
            }
          }, 1000)
        }
      }
    },
    finish (skip) {
      clearInterval(this.timer)
      this.status = ''
      this.$store.commit('finish')
      if (!skip) {
        const audio = new Audio()
        audio.src = this.alarmSelected
        audio.play()
      }
      if (this.todos.length > 0) {
        this.start()
      } else {
        this.$swal({
          icon: 'success',
          title: '結束',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success mx-1',
            cancelButton: 'btn btn-danger mx-1'
          }
        })
      }
    },
    pause () {
      clearInterval(this.timer)
      this.status = 'pause'
    }
  }
}
</script>

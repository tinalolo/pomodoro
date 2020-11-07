<template lang="pug">
  div.text-center.h-100
    b-row.h-100(align-h="center" align-v="center")
      b-col(cols="4" @click="goto('/')")
        h3
          font-awesome-icon(:icon="['fas', 'stopwatch']")
        h3 首頁
      b-col(cols="4" @click="goto('/todos')")
        h3
          font-awesome-icon(:icon="['fas', 'list']")
        h3 待辦
      b-col(cols="4" @click="goto('/settings')")
        h3
          font-awesome-icon(:icon="['fas', 'cog']")
        h3 設定
</template>

<script>
export default {
  methods: {
    goto (link) {
      if (this.$route.path !== link) {
        this.$router.push(link)
      }
    }
  }
}
</script>

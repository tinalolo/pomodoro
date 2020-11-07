<template lang="pug">
  #app
    b-container
      #content
        vue-page-transition(name="fade")
          keep-alive
            router-view.h-100.w-100
      #footer
        Nav
</template>

<script>
import Nav from './components/Nav'

export default {
  components: {
    Nav
  }
}
</script>

<template>
<main>
  <paintArea/>
</main>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import paintArea from "./components/paintArea.vue"
export default defineComponent({
  components: { paintArea },
  setup(props,ctx){
    return{}
  }
})

</script>

<style lang="scss">
main{
  min-height: calc(100vh - 100px);
}
</style>

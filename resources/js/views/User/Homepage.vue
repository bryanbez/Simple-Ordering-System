<template>
  <div>
      <h3> This is User Homepage </h3>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted } from 'vue'
export default {
   setup() {
    const storeModule = useStore();

     onMounted(() => {
        // storeModule.dispatch('addProfile')
       // storeModule.dispatch('saveUserIDToAddress')
    });
  }
}
</script>

<style>

</style>
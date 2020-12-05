<template>
  <div class="container">
      <NavbarHeader></NavbarHeader>
      <router-view></router-view>
      
      <br />
      <br />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import NavbarHeader from '../components/Navbar'
export default {
  components: {
    NavbarHeader
  },

 
}
</script>

<style>
router-view {
  margin-bottom: 2em;
}
</style>
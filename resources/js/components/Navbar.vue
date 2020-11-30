<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#"> Ordering System </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarNav" v-if="username === 'admin'">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link to="/admin/dashboard" class="nav-link"> Home <span class="sr-only">(current)</span></router-link>
      </li>
      <li class="nav-item">
        <router-link to="/products" class="nav-link"> Products </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/categories" class="nav-link"> Categories </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/" class="nav-link"> Users </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/archive" class="nav-link"> Archives </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/courier" class="nav-link"> Couriers </router-link>
      </li>
    </ul>
     <span class="navbar-text">
           <a @click="logoutUser()" class="nav-link"> Logout <b>({{ username }})</b> </a>
      </span>
  </div>

    <div class="collapse navbar-collapse" id="navbarNav" v-if="username !== 'admin' && username !== ''">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link to="/user/dashboard" class="nav-link"> Home <span class="sr-only">(current)</span></router-link>
      </li>
      <li class="nav-item">
        <router-link to="/productlist" class="nav-link"> Products </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/cart" class="nav-link"> Cart ({{ cartCount }}) </router-link>
      </li>
       <li class="nav-item">
        <router-link to="/profile" class="nav-link"> Profile  </router-link>
      </li>
    </ul>
      <span class="navbar-text">
           <a @click="logoutUser()" class="nav-link"> Logout <b>({{ username }})</b> </a>
      </span>
  </div>

   <div class="collapse navbar-collapse" id="navbarNav" v-if="username == ''">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link to="/" class="nav-link"> Login </router-link>
      </li>
       <li class="nav-item">
        <router-link to="/registeruser" class="nav-link"> Register </router-link>
      </li>
   
    </ul>
  </div>

</nav>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
export default {
  setup() {

      const storeModule = useStore();
      const username = computed(() => storeModule.state.loginAndlogout.loginUsername);
      const cartCount = computed(() => storeModule.state.cart.cartCount);

       onMounted(() => {
            storeModule.dispatch('fetchUserName');
            storeModule.dispatch('getCartItemsCount');
        });

      function logoutUser() {
          storeModule.dispatch('LogoutAction');
      }

      return {
        logoutUser,
        username,
        cartCount
      }
  }
}
</script>

<style>
a {
  cursor: pointer;
}
</style>
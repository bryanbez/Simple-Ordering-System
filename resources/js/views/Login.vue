<template>
  <div class="container">

      <h3> Login to your account </h3>

      <form action="" method="post" @submit.prevent="loginAccount()">
            <div class="form-group">
                <label> Email </label>
                <input type="text" class="form-control" v-model="loginCredentials.email">
            </div>
            <div class="form-group">
                <label> Password </label>
                <input type="password" class="form-control" v-model="loginCredentials.password">
            </div>
            <div class="form-group">
                <input type="submit" value="Login" class="btn btn-primary">
            </div>

            <div class="alert alert-danger" v-if="loginMessage">
                {{ loginMessage.email }}
            </div>
      </form>

  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
export default {
    setup() {

        const storeModule = useStore();

        const loginMessage = computed(() => storeModule.state.loginAndlogout.loginMessage);

        const loginCredentials = {
            email: '',
            password: ''
        }

        function loginAccount() {
            storeModule.dispatch('LoginAction', loginCredentials);

        }

        return {
            loginCredentials,
            loginAccount,
            loginMessage
        }

    }
}
</script>

<style>

</style>
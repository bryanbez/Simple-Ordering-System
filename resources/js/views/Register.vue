<template>
  <div class="container">

        <h3> Register </h3>
        <form action="" @submit.prevent="registerUser()">
            <div class="form-group">
                <label> Name </label>
                <input type="text" class="form-control" v-model="register.name">
                <span v-if="errorOnInputMessage.name" class="font-weight-light text-danger"> {{ errorOnInputMessage.name }} </span>
            </div>
            <div class="form-group">
                <label> Email </label>
                <input type="email" class="form-control" v-model="register.email">
                <span v-if="errorOnInputMessage.email" class="font-weight-light text-danger"> {{ errorOnInputMessage.email }} </span>
            </div>
            <div class="form-group">
                <label> Password </label>
                <input type="password" class="form-control" v-model="register.password">
                <span v-if="errorOnInputMessage.password" class="font-weight-light text-danger"> {{ errorOnInputMessage.password }} </span>
            </div>
            <div class="form-group">
                <label> Confirm Password </label>
                <input type="password" class="form-control" v-model="register.password_confirmation">
            </div>
            <div class="form-group">
                <input type="submit" value="Register" class="btn btn-primary">
            </div>

        </form>

        <div class="alert alert-danger" v-if="passwordNotMatch">
            {{ passwordNotMatch }}
        </div>


  </div>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, computed, onMounted } from 'vue'
export default {
    setup() {
        
        const storeModule = useStore();
        const register = reactive({
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        })

        const errorOnInputMessage = computed(() => storeModule.state.register.errorOnInputMessage);
       

        const passwordNotMatch = computed(() => {
            if (register.password_confirmation.length >= 1) {
                 if (register.password !== register.password_confirmation) {
                    return 'Password Not Matched'
                }
            }
           
        }) 

        function registerUser() {
             storeModule.dispatch('registerUserAction', register);
             if (!errorOnInputMessage) {
                 register.name = ''
                 register.email = ''
                 register.password = ''
                 register.password_confirmation = ''
             }
        }

        return {
            register,
            registerUser,
            passwordNotMatch,
            errorOnInputMessage,
            
        }

    }   
}
</script>

<style>

</style>
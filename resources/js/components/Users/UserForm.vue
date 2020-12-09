<template>
  <div>

      <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#modalAddUser"> Add User </button>

        <div class="modal" id="modalAddUser" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"> Add User </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="alert alert-primary" v-show="message">
                {{ message }}
            </div>
            <div class="modal-body">
                    <form method="post">
                        <label for=""> Username <span v-if="errOnInput.username"> {{ errOnInput.username[0] }} </span> </label>
                        <input type="text" v-model="user.username" class="form-control">
            
                        <br />
                        <label for=""> Email <span v-if="errOnInput.email"> {{ errOnInput.email[0] }} </span> </label>
                        <input type="text" v-model="user.email" class="form-control">
                        
                        <br />
                        <label for=""> User Type  <span v-if="errOnInput.user_type"> {{ errOnInput.user_type[0] }} </span> </label>
                        <select class="form-control" v-model="user.user_type">
                            <option value="staff"> Staff </option>
                            <option value="courier"> Courier </option>
                        </select>
                        
                        <br />
                        <label for=""> Password <span v-if="errOnInput.password"> {{ errOnInput.password[0] }} </span> </label>
                        <input type="password" v-model="user.password" class="form-control">
                        
                    </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" type="submit" @click="createUser()"> Add </button>
                <button type="button" class="btn btn-secondary" @click="clearTextboxes()" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>

  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
export default {
    setup() {

        const storeModule = useStore() 

        const message = computed(() => storeModule.state.user.message);
        const errOnInput = computed(() => storeModule.state.user.errorOnInput);
        const user = ref({
            username: '',
            email: '',
            user_type: '',
            password: ''
        })

        function createUser() {
            storeModule.dispatch('saveInfoOfStaffOrCourier', user.value)
       
        }

        function clearTextboxes() {
            user.value = ''
            storeModule.dispatch('clearMessage', '')
        }

        return {
            user,
            createUser,
            clearTextboxes,
            message,
            errOnInput
        }
    }
}
</script>

<style>

</style>
<template>
  <div>

        <div class="modal" id="modalAddCourier" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"> Add Courier </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="alert alert-primary" v-show="message != ''">
                {{ message }}
            </div>
            <div class="modal-body">
                <form action="" method="post">
                    <label for=""> Courier Name </label>
                    <input type="text" class="form-control" v-model="courierInfo.courier_name">
                    <label for=""> Courier Base Price (Pesos) </label>
                    <input type="text" class="form-control" v-model="courierInfo.courier_base_price">
                </form>
            </div>
            <div class="modal-footer">
                   <button class="btn btn-primary" @click="addCourier()"> Add Courier </button>
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

        const storeModule = useStore();

        const message = computed(() => storeModule.state.courier.courierMsg)
        
        const courierInfo = ref({
            'courier_name': '',
            'courier_base_price': ''
        });

        function addCourier() {
            storeModule.dispatch('addCourierAction', courierInfo.value)
        }

        return {
            addCourier,
            courierInfo,
            message
        }
    }
}
</script>

<style>

</style>
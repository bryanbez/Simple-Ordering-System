<template>
  <div>

        <div class="modal" id="modalUpdateCourier" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"> Update Courier </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="alert alert-primary" v-show="courierMessage != null">
                {{ courierMessage }}
            </div>
            <div class="modal-body">
                <form action="" method="post">
                    <label for=""> Courier Name </label>
                    <input type="text" class="form-control" v-model="specificCourierInfo.courier_name">
                    <label for=""> Courier Base Price (Pesos) </label>
                    <input type="text" class="form-control" v-model="specificCourierInfo.courier_base_price">
                </form>
            </div>
            <div class="modal-footer">
                   <button class="btn btn-primary" @click="updateCourier()"> Update Courier </button>
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

        const courierMessage = computed(() => storeModule.state.courier.courierMsg)
        const specificCourierInfo = computed(() => storeModule.state.courier.specificCourier)     
   
        function updateCourier() {
            storeModule.dispatch('updateCourierAction', specificCourierInfo)
        }

        return {
            courierMessage,
            specificCourierInfo,
            updateCourier
            
        }
    }
}
</script>

<style>

</style>
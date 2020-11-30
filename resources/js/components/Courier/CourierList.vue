<template>
  <div>

      <div class="alert alert-primary" v-if="courierDeleteMsg != null">
          {{ courierDeleteMsg }}
      </div>
      <table class="table table-bordered">
          <tr>
              <th> Courier Name </th>
              <th> Courier Base Price </th>
              <th colspan="2"> Options </th>
          </tr>
          <tr v-for="courier in courierList" :key="courier.courier_id">
              <td> {{ courier.courier_name }} </td>
              <td> {{ courier.courier_base_price }} </td>
              <td> <button class="btn btn-primary" @click="fetchSpecificCourier(courier.courier_id)" type="button" data-toggle="modal" data-target="#modalUpdateCourier"> Edit </button> </td>
              <td> <button class="btn btn-danger" @click="removeCourier(courier.courier_id)"> Archive </button> </td>
          </tr>
      </table>
      <CourierUpdateForm></CourierUpdateForm>

  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import CourierUpdateForm from '../../components/Courier/CourierUpdateForm'
export default {
    components: {
        CourierUpdateForm
    },
    setup() {

        const storeModule = useStore();

        const courierList = computed(() => storeModule.state.courier.courierList)
        const courierDeleteMsg = computed(() => storeModule.state.courier.deleteCourierMsg)

        function fetchSpecificCourier(courier_id) {
            storeModule.dispatch('fetchSpecificCourier', courier_id)
        }

        function removeCourier(courier_id) {
            if (confirm('Are you sure to delete this courier? ')) {
                storeModule.dispatch('removeCourierAction', courier_id)
            }
            
        }

        onMounted(() => {
            storeModule.dispatch('fetchCourierList');
        })

        return {
            courierList,
            fetchSpecificCourier,
            courierDeleteMsg,
            removeCourier
        }
    }
}
</script>

<style>

</style>
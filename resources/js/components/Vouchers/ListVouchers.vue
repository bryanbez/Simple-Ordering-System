<template>
  <div>

        <ModalAddVoucher></ModalAddVoucher>
        <br />
        <table class="table table-bordered">
            <tr>
                <th> Voucher Code </th>
                <th> Voucher Name </th>
                <th> Voucher Description </th>
                <th> Voucher Count </th>
                <th> Is Available </th>
                <th colspan="3"> Options </th>
            </tr>
            <tr v-for="singleVoucher in listOfVouchers.data" :key="singleVoucher.voucher_id">
                <td> {{ singleVoucher.voucher_code }} </td>
                <td> {{ singleVoucher.voucher_name }} </td>
                <td> {{ singleVoucher.voucher_description }} </td>
                <td> {{ singleVoucher.voucher_count }} </td>
                <td> {{ singleVoucher.is_available }} </td>
                <td> <button class="btn btn-success" @click="fetchSpecificVoucher(singleVoucher.voucher_id)" type="button" data-toggle="modal" data-target="#modalUpdateVoucher"> Edit </button> </td>
                <td> <button class="btn btn-danger" @click="removeVoucher(singleVoucher.voucher_id)"> Remove </button> </td>
            </tr>
            <ModalUpdateVoucher></ModalUpdateVoucher>
        </table>

        <div class="pagination">
          <button class="btn btn-secondary mr-2" :disabled="listOfVouchers.prev_page_url == null" @click="paginateVoucherList(listOfVouchers.prev_page_url)"> Previous </button>
          <button class="btn btn-secondary disabled mr-2"> {{ listOfVouchers.current_page }} of {{ listOfVouchers.last_page }} </button>
          <button class="btn btn-secondary" :disabled="listOfVouchers.next_page_url == null" @click="paginateVoucherList(listOfVouchers.next_page_url)"> Next </button>
      </div>

  </div>
</template>

<script>
import ModalAddVoucher from './formVoucher';
import ModalUpdateVoucher from './FormUpdateVoucher';
import { useStore } from 'vuex'
import { computed, onMounted, watch } from 'vue'
export default {
    components: {
        ModalAddVoucher,
        ModalUpdateVoucher
    },
    setup() {

        let storeModule = useStore();

        let listOfVouchers = computed(() => storeModule.state.voucher.listVoucher);

        let addUpdateMessage = computed(() => storeModule.state.voucher.message);
        
        watch(addUpdateMessage, () => {
            setTimeout(function (){
                storeModule.dispatch('cleanMessage')
            }, 5000)
        })

        function fetchSpecificVoucher(voucher_id) {
            storeModule.dispatch('fetchListOfSpecificVoucher', voucher_id)
        }


        function removeVoucher(voucher_id) {
            if (confirm('Are you sure to delete this voucher?')) {
                storeModule.dispatch('removeVoucherAction', voucher_id)
            }
        }

        function paginateVoucherList(url) {
            storeModule.dispatch('fetchListOfVoucher', url)
        }

        onMounted(() => {
            storeModule.dispatch('fetchListOfVoucher')
        });

        return {
            listOfVouchers,
            fetchSpecificVoucher,
            removeVoucher,
            paginateVoucherList
        }
    }

}
</script>

<style>

</style>
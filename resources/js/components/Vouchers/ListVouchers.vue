<template>
  <div>

        <h3> List Vouchers </h3>
        <ModalAddVoucher></ModalAddVoucher>
     
        <table class="table table-bordered">
            <tr>
                <th> Voucher Code </th>
                <th> Voucher Name </th>
                <th> Voucher Description </th>
                <th> Voucher Count </th>
                <th> Is Available </th>
                <th colspan="3"> Options </th>
            </tr>
            <tr v-for="singleVoucher in listOfVouchers" :key="singleVoucher.voucher_id">
                <td> {{ singleVoucher.voucher_code }} </td>
                <td> {{ singleVoucher.voucher_name }} </td>
                <td> {{ singleVoucher.voucher_description }} </td>
                <td> {{ singleVoucher.voucher_count }} </td>
                <td> {{ singleVoucher.is_available }} </td>
                <td> <button class="btn btn-success" @click="fetchSpecificVoucher(singleVoucher.voucher_id)" type="button" data-toggle="modal" data-target="#modalUpdateVoucher"> Edit </button> </td>
                <td> <button class="btn btn-danger"> Remove </button> </td>
            </tr>
            <ModalUpdateVoucher></ModalUpdateVoucher>
        </table>

  </div>
</template>

<script>
import ModalAddVoucher from './formVoucher';
import ModalUpdateVoucher from './FormUpdateVoucher';
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
export default {
    components: {
        ModalAddVoucher,
        ModalUpdateVoucher
    },
    setup() {

        let storeModule = useStore();

        let listOfVouchers = computed(() => storeModule.state.voucher.listVoucher);

        function fetchSpecificVoucher(voucher_id) {
            storeModule.dispatch('fetchListOfSpecificVoucher', voucher_id)
        }

        onMounted(() => {
            storeModule.dispatch('fetchListOfVoucher')
        });

        return {
            listOfVouchers,
            fetchSpecificVoucher
        }
    }

}
</script>

<style>

</style>
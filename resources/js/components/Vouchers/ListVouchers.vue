<template>
  <div>

        <h3> List Vouchers </h3>
        <ModalAddVoucher></ModalAddVoucher>


        {{ listOfVouchers }}

  </div>
</template>

<script>
import ModalAddVoucher from './formVoucher';
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
export default {
    components: {
        ModalAddVoucher
    },
    setup() {

        let storeModule = useStore();

        let listOfVouchers = computed(() => storeModule.state.voucher.listVoucher);

        onMounted(() => {
            storeModule.dispatch('fetchListOfVoucher')
        });

        return {
            listOfVouchers
        }
    }

}
</script>

<style>

</style>
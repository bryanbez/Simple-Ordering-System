<template>
  <div>

        <div class="modal" id="modalUpdateVoucher" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"> Update Voucher Information </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="alert alert-primary" v-show="updateMessage">
                {{ updateMessage }}
            </div>
            <div class="modal-body">
                <form action="" method="post">
                    <label for=""> Voucher Code </label>
                    <input type="text" class="form-control" v-model="singleVoucher.voucher_code">

                    <label for=""> Voucher Title </label>
                    <input type="text" class="form-control" v-model="singleVoucher.voucher_name">

                    <label for=""> Voucher Description </label>
                    <textarea class="form-control" cols="30" rows="10" v-model="singleVoucher.voucher_description"></textarea>

                    <label for=""> Voucher Count </label>
                    <input type="text" class="form-control" v-model="singleVoucher.voucher_count">  

                    <label for=""> Is Available </label>
                    <select class="form-control" v-model="singleVoucher.is_available">
                        <option value="yes"> Yes </option>
                        <option value="no"> No </option>
                    </select>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" type="button" @click="updateVoucher()"> Update </button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>

  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
export default {
    setup() {

        let storeModule = useStore();

        let updateMessage = computed(() => storeModule.state.voucher.message);
        let singleVoucher = computed(() => storeModule.state.voucher.singleVoucher);

        function updateVoucher() {
            storeModule.dispatch('updateVoucherAction', singleVoucher)
        }

        return {
            singleVoucher,
            updateMessage,
            updateVoucher
        }
    }
}
</script>

<style>

</style>
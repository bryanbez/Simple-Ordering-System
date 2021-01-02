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
                    <label for=""> Voucher Code </label> <span class="text-danger" v-show="inputErr.voucher_code"> {{ inputErr.voucher_code }} </span>
                    <input type="text" class="form-control" v-model="singleVoucher.voucher_code">

                    <label for=""> Voucher Title </label> <span class="text-danger" v-show="inputErr.voucher_name"> {{ inputErr.voucher_name }} </span>
                    <input type="text" class="form-control" v-model="singleVoucher.voucher_name">

                    <label for=""> Voucher Description </label> <span class="text-danger" v-show="inputErr.voucher_description"> {{ inputErr.voucher_description }} </span>
                    <textarea class="form-control" cols="30" rows="10" v-model="singleVoucher.voucher_description"></textarea>

                    <label for=""> Voucher Count </label> <span class="text-danger" v-show="inputErr.count"> {{ inputErr.count }} </span>
                    <input type="text" class="form-control" v-model="singleVoucher.voucher_count">  

                    <label for=""> Type of Voucher </label> <span class="text-danger" v-show="inputErr.type_of_voucher"> {{ inputErr.type_of_voucher }} </span>
                    <select class="form-control" v-model="singleVoucher.type_of_voucher">
                        <option value="percent"> Percentage </option>
                        <option value="fixed_amount"> Fixed Discount </option>
                    </select>

                    <label for=""> Percent or Amount <i>if percent, do not put percent sign </i> </label> <span class="text-danger" v-show="inputErr.percent_or_amount"> {{ inputErr.percent_or_amount }} </span>
                    <input type="text" class="form-control" v-model="singleVoucher.percent_or_amount">

                    <label for=""> Minimum Spend <i>default: 0</i> </label>
                    <input type="text" class="form-control" v-model="singleVoucher.minimum_spend"> 

                    <label for=""> Capped At <i>default: 0</i> </label>
                    <input type="text" class="form-control" v-model="singleVoucher.capped_at">  

                    <label for=""> Is Available </label> <span class="text-danger" v-show="inputErr.is_available"> {{ inputErr.is_available }} </span>
                    <select class="form-control" v-model="singleVoucher.is_available">
                        <option value="yes"> Yes </option>
                        <option value="no"> No </option>
                    </select>

                </form>

            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" type="button" @click="updateVoucher()"> Update </button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clearMessage()">Close</button>
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
        let inputErr = computed(() => storeModule.state.voucher.inputError)


        function updateVoucher() {
            storeModule.dispatch('updateVoucherAction', singleVoucher)
        }

        function clearMessage() { // onWatch lifecycle hook then timer 
            storeModule.dispatch('cleanMessage')
        }

        return {
            singleVoucher,
            updateMessage,
            updateVoucher,
            clearMessage,
            inputErr
        }
    }
}
</script>

<style>

</style>
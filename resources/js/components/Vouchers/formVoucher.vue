<template>
  <div>
      <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#modalAddVoucher"> Add Voucher </button>

        <div class="modal" id="modalAddVoucher" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"> Add Voucher Information </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="alert alert-primary" v-show="saveMessage">
                {{ saveMessage }}
            </div>
            <div class="modal-body">
                <form action="" method="post">
                    <label for=""> Voucher Code </label>  <span class="text-danger" v-show="inputErr.voucher_code"> {{ inputErr.voucher_code }} </span>
                    <input type="text" class="form-control" v-model="voucher.code">

                    <label for=""> Voucher Title </label> <span class="text-danger" v-show="inputErr.voucher_name"> {{ inputErr.voucher_name }} </span>
                    <input type="text" class="form-control" v-model="voucher.name">

                    <label for=""> Voucher Description </label> <span class="text-danger" v-show="inputErr.voucher_description"> {{ inputErr.voucher_description }} </span>
                    <textarea class="form-control" cols="30" rows="10" v-model="voucher.description"></textarea>

                    <label for=""> Voucher Count </label> <span class="text-danger" v-show="inputErr.count"> {{ inputErr.count }} </span>
                    <input type="text" class="form-control" v-model="voucher.count">  

                    <label for=""> Type of Voucher </label> <span class="text-danger" v-show="inputErr.type_of_voucher"> {{ inputErr.type_of_voucher }} </span>
                    <select class="form-control" v-model="voucher.type_of_voucher">
                        <option value="percent"> Percentage </option>
                        <option value="fixed_amount"> Fixed Discount </option>
                    </select>

                    <label for=""> Percent or Amount <i>default: 0</i> </label> <span class="text-danger" v-show="inputErr.percent_or_amount"> {{ inputErr.percent_or_amount }} </span>
                    <input type="text" class="form-control" v-model="voucher.percent_or_amount">

                    <label for=""> Minimum Spend <i>default: 0</i> </label>
                    <input type="text" class="form-control" v-model="voucher.minimum_spend"> 

                    <label for=""> Capped At <i>default: 0</i> </label>
                    <input type="text" class="form-control" v-model="voucher.capped_at">  

                    <label for=""> Is Available </label> <span class="text-danger" v-show="inputErr.is_available"> {{ inputErr.is_available }} </span>
                    <select class="form-control" v-model="voucher.is_available">
                        <option value="yes"> Yes </option>
                        <option value="no"> No </option>
                    </select>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" type="button" @click="addVoucher()"> Add </button>
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

        let saveMessage = computed(() => storeModule.state.voucher.message)
        let inputErr = computed(() => storeModule.state.voucher.inputError)

        let voucher = {
            'code': '',
            'name': '',
            'description': '',
            'count': '',
            'is_available': '',
            'minimum_spend': '',
            'capped_at': '',
            'type_of_voucher': '',
            'percent_or_amount': ''
        }

        function addVoucher() {
            storeModule.dispatch('saveVoucher', voucher)
            // voucher = ''
        }

        return {
            voucher,
            addVoucher,
            saveMessage,
            inputErr
        }
    }
}
</script>

<style>

</style>
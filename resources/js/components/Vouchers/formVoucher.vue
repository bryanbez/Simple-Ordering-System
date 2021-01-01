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
                    <label for=""> Voucher Code </label>
                    <input type="text" class="form-control" v-model="voucher.code">

                    <label for=""> Voucher Title </label>
                    <input type="text" class="form-control" v-model="voucher.name">

                    <label for=""> Voucher Description </label>
                    <textarea class="form-control" cols="30" rows="10" v-model="voucher.description"></textarea>

                    <label for=""> Voucher Count </label>
                    <input type="text" class="form-control" v-model="voucher.count">  

                    <label for=""> Is Available </label>
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

        let saveMessage = computed(() => storeModule.state.voucher.message);

        let voucher = {
            'code': '',
            'name': '',
            'description': '',
            'count': '',
            'is_available': ''
        }

        function addVoucher() {
            storeModule.dispatch('saveVoucher', voucher)
        }

        return {
            voucher,
            addVoucher,
            saveMessage
        }
    }
}
</script>

<style>

</style>
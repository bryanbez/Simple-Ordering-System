<template>
  <div>

      <div class="row mt-2">
          <div class="col col-lg-10">
              <h3> Checkout Details </h3>
          </div>
          <div class="col col-lg-2">
              <router-link to="/cart" class="btn btn-danger"> Back </router-link>
          </div>
      </div>

        <div v-for="item in checkoutList.items" :key="item.cart_id">
            <div class="card"> 
                <div class="row">
                    <div class="col col-lg-3">
                        <img class="card-img" :src="item.products.product_image" width="150" height="150">
                    </div>
                    <div class="col col-lg-9">
                        <div class="row">
                            <div class="col col-lg-8">
                                 <div class="card-body">
                                    <h5 class="card-title"> {{ item.products.product_name }}  </h5>
                                    <p class="card-text"> ₱ {{ item.products.product_price }} x {{ item.quantity }} </p>
                                </div>
                            </div>
                            <div class="col col-lg-5">
                                <div class="card-footer">
                                    <h4> Total Price: ₱ {{ item.total_price }} </h4>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

         <div class="card">
            <div class="row">
                <div class="col col-lg-4">
                    <h3> Name </h3>
                </div>
                <div class="col col-lg-8">
                    <h3> {{ profileInfoOfuser.first_name }} {{ profileInfoOfuser.middle_initial }} {{ profileInfoOfuser.last_name }}</h3>
                </div>
            </div>
        </div>
       
        <div class="card">
            <div class="row">
                <div class="col col-lg-4">
                    <h3> Address </h3>
                </div>
                <div class="col col-lg-8">
                    <h5> {{ profileInfoOfuser.address }} </h5>
                </div>
            </div>
        </div>

         <div class="card">
            <div class="row">
                <div class="col col-lg-5">
                    <h3> Courier </h3>
                </div>
                <div class="col col-lg-7">
                   <h3> <select class="form-control" @change="setCourier()" v-model="courierChoice">
                        <option v-for="courier in listOfCourier" :key="courier.courier_id" :value="courier.courier_id"> {{ courier.courier_name }} (₱{{ courier.courier_base_price }})</option>
                    </select> </h3>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="row">
                <div class="col col-lg-5">
                    <h3> Voucher Code (if any) </h3>
                </div>
                <div class="col col-lg-5">
                    <h3> <input class="form-control" type="text" placeholder="Discount Code" v-model="voucher_code"> </h3>
                    <span v-show="voucherMessage"> {{ voucherMessage }} </span>
                </div>
                <div class="col col-lg-2">
                    <!-- <h3> <button class="btn btn-secondary" @click="verifyVoucherAvailability()"> Apply Code </button> </h3> -->
                </div>
            </div>
        </div>

         <div class="card">
            <div class="row">
                <div class="col col-lg-5">
                    <h3> Payment Method </h3>
                </div>
                <div class="col col-lg-7">
                    <h3> <select class="form-control" @change="setPaymentMethod()" v-model="payment_method">
                        <option value="cod"> Cash On Delivery </option>    
                    </select> </h3>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="row">
                 <div class="col col-lg-8">
                    <p> Subtotal </p>
                </div>
                <div class="col col-lg-2">
                    <p class="text-danger"> ₱ {{ checkoutList.subtotal }} </p>
                </div>
            </div>
            <div class="row">
                 <div class="col col-lg-8">
                    <p> Courier Price </p>
                </div>
                <div class="col col-lg-2">
                    <p class="text-danger"> ₱ {{ deliveryFee }} </p>
                </div>
            </div>
            <div class="row">
                 <div class="col col-lg-8">
                    <p> Voucher Deduction Amount </p>
                </div>
                <div class="col col-lg-2">
                    <p class="text-danger"> - ₱ {{ deductionPrice }} </p>
                </div>
            </div>
            <div class="row">
                <div class="col col-lg-8">
                    <h3> Total Payment </h3>
                </div>
                <div class="col col-lg-2">
                    <h3 class="text-danger font-weight-bold"> ₱ {{ total_payment }} </h3>
                </div>
                 <div class="col col-lg-2 btn">
                    <button class="btn btn-primary" @click="placeOrder()" :disabled="enablePlaceOrder == true"> Place Order</button>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, onMounted, watch } from 'vue'
export default {
    setup() {
        const storeModule = useStore();

        let checkoutList = computed(() => storeModule.state.checkout.checkoutList)
        let total_payment = computed(() => storeModule.state.checkout.total_payment)
        let profileInfoOfuser = computed(() => storeModule.state.profile.profileOfUser)
        let listOfCourier = computed(() => storeModule.state.courier.courierList)
        let deliveryFee = computed(() => storeModule.state.checkout.deliveryFee);
        let courierChoice = ref('')
        let payment_method = ref('')
        let voucher_code = ref('')
        let enablePlaceOrder = computed(() => storeModule.state.checkout.enableButtonPlaceOrder)
        let voucherMessage = computed(() => storeModule.state.checkout.voucherMessage)
        let total_payment_without_discount = computed(() => storeModule.state.checkout.withoutDiscount)
        let deductionPrice = computed(() => storeModule.state.checkout.deductionAmount)
      

         watch(voucher_code, () => {
            let voucherAndInitialPayment = {
                'total_payment': total_payment_without_discount.value,
                'voucher_code_to_use': voucher_code.value
            }
             storeModule.dispatch('verifyVoucherAvailability', voucherAndInitialPayment)
            
        })

        function setCourier() {
            storeModule.dispatch('setCourierChoiceAction', courierChoice.value)
        }

        function setPaymentMethod() {
            storeModule.dispatch('setPaymentMethodAction', payment_method.value)
        }

        function placeOrder() {

            let orderInfo = ref({
                'productToCheckout': checkoutList,
                'courier': courierChoice,
                'total_payment': total_payment,
                'user_id': profileInfoOfuser,
                'payment_method': payment_method.value
            })

            storeModule.dispatch('listAllOrderDetailsToCheckout', orderInfo.value)

        }

        onMounted(() => {
            storeModule.dispatch('profile/fetchProfile')
            storeModule.dispatch('fetchCourierList');
            storeModule.dispatch('checkIfNameAndAddressProvide')
        });

        return {
            checkoutList,
            total_payment,
            profileInfoOfuser,
            listOfCourier,
            setCourier,
            courierChoice,
            enablePlaceOrder,
            placeOrder,
            payment_method,
            voucher_code,
            // verifyVoucherAvailability,
            voucherMessage,
            total_payment_without_discount,
            deliveryFee,
            deductionPrice,
            setPaymentMethod
        }
    }
}
</script>

<style>
.card {
    margin: 1em;
}
.card .row {
    margin: 0.5em;
}
</style>
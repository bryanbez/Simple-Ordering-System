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
                    <h3> {{ profileInfoOfuser.first_name }} {{ profileInfoOfuser.middle_initial }}. {{ profileInfoOfuser.last_name }}</h3>
                </div>
            </div>
        </div>
       
        <div class="card">
            <div class="row">
                <div class="col col-lg-4">
                    <h3> Address </h3>
                </div>
                <div class="col col-lg-8">
                    <h5> <textarea cols="50" rows="3" disabled v-model="profileInfoOfuser.address">  </textarea> </h5>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="row">
                <div class="col col-lg-9">
                    <h3> Subtotal </h3>
                </div>
                <div class="col col-lg-3">
                    <h3> ₱ {{ checkoutList.subtotal }} </h3>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="row">
                <div class="col col-lg-5">
                    <h3> Discount Code (if any) </h3>
                </div>
                <div class="col col-lg-5">
                    <h3> <input class="form-control" type="text" placeholder="Discount Code "> </h3>
                </div>
                <div class="col col-lg-2">
                    <h3> <button class="btn btn-secondary"> Apply Code </button> </h3>
                </div>
            </div>
        </div>

         <div class="card">
            <div class="row">
                <div class="col col-lg-5">
                    <h3> Payment Method </h3>
                </div>
                <div class="col col-lg-7">
                    <h3> <select class="form-control">
                        <option> Cash On Delivery </option>    
                    </select> </h3>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="row">
                <div class="col col-lg-8">
                    <h3> Total Payment </h3>
                </div>
                <div class="col col-lg-2">
                    <h3 class="red-text"> ₱ {{ total_payment }} </h3>
                </div>
                 <div class="col col-lg-2 btn btn-primary">
                    <h3> Place Order </h3>
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

        const checkoutList = computed(() => storeModule.state.checkout.checkoutList)
        const total_payment = computed(() => storeModule.state.checkout.total_payment)
        const profileInfoOfuser = computed(() => storeModule.state.profile.profileOfUser)

        onMounted(() => {
            storeModule.dispatch('fetchProfile')
        });

        return {
            checkoutList,
            total_payment,
            profileInfoOfuser
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
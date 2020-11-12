<template>
  <div>
      <div class="container">
          <div class="row mt-5">
              <div class="col col-sm-12 col-md-6 col-lg-4">
                  <img :src="productToView.product_image" width="250" height="250" />
              </div>
               <div class="col col-sm-12 col-md-6 col-lg-8">
                    <h2> {{ productToView.product_name }} </h2>
                    <hr />
                    <h3> ₱ {{ productToView.product_price }} </h3>
                    <br />
                    <label for=""> Quantity </label>
                    <input type="text" class="form-control" @keyup="calculateTotalPrice(productToView.product_price, productToView.product_id)" v-model="txtQuantity">
                    <hr />
                    <h3> Total Price: {{ totalPriceInput }} </h3>
                    <hr />
                    <button class="btn btn-primary" @click="addToCart(productToView.product_id)"> Add To Cart  </button>
              </div>

          </div>
      </div>
      
      <hr /> 

      <div class="container">
            <div class="row">
                <h4> Product Description </h4>
                <div class="col col-lg-12">
                    <p> {{ productToView.product_desc }} </p>
                </div>
          </div>
      </div>

      <hr />

      <div class="container">
          <div class="row">
              <h4> Reviews </h4>
          </div>
      </div>

  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
export default {
 
    setup() {

        const route = useRouter()
        const storeModule = useStore();
        
        function fetchSpecProduct() {
            storeModule.dispatch('fetchSpecificProduct', route.currentRoute.value.params.product_id);
        }

        const txtQuantity = ref('')
        const totalPriceInput = ref('')
        const productIdToCheckout = ref('')
        const productToView = computed(() => storeModule.state.products.specificProduct)
        const user_id = computed(() => storeModule.state.loginAndlogout.loginUsernameID)

        function calculateTotalPrice(price, id) {
            productIdToCheckout.value = id
            totalPriceInput.value = price * txtQuantity.value
        }

        function addToCart() {
            const cartProduct = ref({
                'user_id': JSON.parse(localStorage.getItem('user_id')),
                'product_id': productIdToCheckout.value,
                'quantity': txtQuantity.value,
                'total_price': totalPriceInput.value
            })
            storeModule.dispatch('addToCartAction', cartProduct.value)
        }

        onMounted(() => {
            fetchSpecProduct()
        });

        return {
            fetchSpecProduct,
            productToView,
            totalPriceInput,
            txtQuantity,
            calculateTotalPrice,
            addToCart,
        }
    }
}
</script>

<style>
.container {

    background-color: rgb(236, 234, 234);
}


</style>
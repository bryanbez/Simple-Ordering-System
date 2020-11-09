<template>
  <div>

      <div class="container">
          <div class="row">
              <div class="col col-sm-12 col-lg-3">
                  <img :src="productToView.product_image" width="250" height="250" />
              </div>
               <div class="col col-sm-12 col-lg-9">
                   <div class="row">
                       <div class="col col-lg-12">
                           <h2> {{ productToView.product_name }} </h2>
                       </div>
                         <div class="col col-lg-12">
                           <h3> ₱ {{ productToView.product_price }} </h3>
                       </div>
                   </div>
                   <div class="row">
                       <div class="col col-lg-6">
                           <label for=""> Quantity </label>
                           <input type="text" class="form-control" @keyup="calculateTotalPrice(productToView.product_price, productToView.product_id)" v-model="txtQuantity">
                            <h3> Total Price: {{ totalPriceInput }} </h3>
                       </div>
                       <div class="col col-lg-6">
                           <p></p>
                           <button class="btn btn-primary" @click="addToCart(productToView.product_id)"> Add To Cart  </button>
                       </div>
                   </div>
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

        function calculateTotalPrice(price, id) {
            productIdToCheckout.value = id
            totalPriceInput.value = price * txtQuantity.value
        }

        function addToCart() {
            const cartProduct = ref({
                'product_id': productIdToCheckout.value,
                'quantity': txtQuantity.value,
                'total_price': totalPriceInput.value
            })
            console.log(cartProduct)
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
            addToCart
 
        }
    }
}
</script>

<style>
.container {
    margin-bottom: 2em;
    background-color: rgb(236, 234, 234);
}
.row {
    margin: 2em
}

</style>
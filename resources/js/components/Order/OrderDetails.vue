<template>
  <div>
     
      <div v-for="orderItem in orderList" :key="orderItem.order_id">
        <div class="card">
          <div class="card-header">
                 <div class="row">
                  <div class="col col-lg-12">
                      <div class="row">
                          <div class="col col-sm-12 col-lg-9">
                            
                          </div>
                           <div class="col col-sm-12 col-lg-3">
                                <span> Order Date: {{ orderItem.created_at }} </span>
                                <span> Order Status: {{ orderItem.track_order.order_status }} </span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="card-body">
              <div v-for="productItem in orderItem.product_info" :key="productItem.cart_id"> 
                    <div class="row">
                        <div class="col col-lg-3">
                            <img class="card-img" :src="productItem.products.product_image" width="150" height="150">
                        </div>
                        <div class="col col-lg-9">
                            <div class="row">
                                <div class="col col-lg-8">
                                    <div class="card-body">
                                        <h5 class="card-title"> {{ productItem.products.product_name }}  </h5>
                                        <p class="card-text"> ₱ {{ productItem.products.product_price }} x {{ productItem.quantity }} </p>
                                    </div>
                                </div>
                                <div class="col col-lg-5">
                                    <div class="card-footer">
                                        <h4> Total Price: ₱ {{ productItem.total_price }} </h4>
                                </div>    
                                </div>
                            </div>
                        </div>
                    </div>
              </div>
          </div>
          <div class="card-footer">
              <div class="row">
                  <div class="col col-lg-12">
                      <div class="row">
                          <div class="col col-sm-12 col-lg-8">
                                <h4> Total Payment: ₱{{ orderItem.total_payment }} pesos </h4>
                          </div>
                           <div class="col col-sm-12 col-lg-4">
                             
                          </div>
                      </div>
                  </div>
              </div>
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
        const orderList = computed(() => storeModule.state.order.orderList);

        onMounted(() => {
            storeModule.dispatch('order/fetchAllOrders')
        });

        return {
            orderList,
           
        }
    }
}
</script>

<style>

</style>
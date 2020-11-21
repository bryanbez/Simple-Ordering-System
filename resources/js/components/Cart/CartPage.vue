<template>
    <div>
        <h3> Your Cart </h3>
        
        <table class="table table-bordered">
            <tr>
                <th> Product Image </th>
                <th> Product Name </th>
                <th> Quantity </th>
                <th> Price </th>
                <th colspan="2"> Options </th>
            </tr>
            <tr v-for="cart in cartList" :key="cart.cart_id">
                <td> <img :src="cart.products.product_image" width="200" height="150" /> </td>
                <td> {{ cart.products.product_name  }}</td>
                <td> {{ cart.quantity }} </td>
                <td> {{ cart.total_price }} </td>
                <td> <button class="btn btn-secondary" @click="showQuantityModel(cart.cart_id)" data-toggle="modal" data-target="#modalEditQuantity"> Edit Quantity </button> </td>
                <td> <button class="btn btn-danger"> Remove </button> </td>
            </tr>
        </table>
        <ModalQuantity></ModalQuantity>

    </div>
</template>

<script>
import ModalQuantity from '../Cart/EditQuantityModal'
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
export default {
    components: {
        ModalQuantity
    },
    setup() {

        const storeModule = useStore();

        const cartList = computed(() => storeModule.state.cart.cartList)
        const errorMessage = computed(() => storeModule.state.cart.errorResponse)

        function showQuantityModel(cart_id) {
            storeModule.dispatch('getSpecificCartItemInfo', cart_id)
            storeModule.dispatch('clearCartMessage')
        }

        onMounted(() => {
            storeModule.dispatch('getCartItems')
        });

        return {
            cartList,
            showQuantityModel,
            errorMessage
        }
    }

}
</script>

<style>
h3 {
    margin-top: 1em;
}
</style>
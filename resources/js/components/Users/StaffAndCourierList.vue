<template>
  <div>
      <table class="table table-bordered">
        <tr>
          <th> Name </th>
          <th> Email </th>
          <th> User Type </th>
          <th colspan="2"> Options </th>
        </tr>
        <tr v-for="user in staffAndCourierList.data" :key="user.id">
          <td> {{ user.name }} </td>
          <td> {{ user.email }} </td>
          <td> {{ user.user_type }} </td>
          <td> <button class="btn btn-primary"> Edit Details </button> </td>
          <td> <button class="btn btn-danger">  Remove User </button> </td>
        </tr>
      </table>

  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
export default {
  setup() {

    const storeModule = useStore() 

    const staffAndCourierList = computed(() => storeModule.state.user.userList)

      onMounted(() => {
            storeModule.dispatch('fetchStaffAndCourier')
      });

    return {
        staffAndCourierList
    }

  }
}
</script>

<style>

</style>
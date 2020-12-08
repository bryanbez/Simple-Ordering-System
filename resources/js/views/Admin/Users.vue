<template>
  <div>

      <StaffAndCourierList></StaffAndCourierList>
      <CustomerList></CustomerList>

  </div>
</template>

<script>
import StaffAndCourierList from '../../components/Users/StaffAndCourierList';
import CustomerList from '../../components/Users/CustomerList';
export default {
    components: {
        StaffAndCourierList,
        CustomerList
    }
}
</script>

<style>

</style>
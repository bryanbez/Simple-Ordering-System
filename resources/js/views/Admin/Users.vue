<template>
  <div>
      <h3> Users </h3>
      <UserForm></UserForm>
      <StaffAndCourierList></StaffAndCourierList>
      <CustomerList></CustomerList>

  </div>
</template>

<script>
import UserForm from '../../components/Users/UserForm'
import StaffAndCourierList from '../../components/Users/StaffAndCourierList';
import CustomerList from '../../components/Users/CustomerList';
export default {
    components: {
        StaffAndCourierList,
        CustomerList,
        UserForm
    }
}
</script>

<style>

</style>
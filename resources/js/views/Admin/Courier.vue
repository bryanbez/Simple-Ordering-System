<template>
  <div>

        <h3> Couriers </h3>
        <br />
        <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#modalAddCourier"> Add Courier </button>
        <CourierForm></CourierForm>
        <br />
        <CourierList></CourierList>

  </div>
</template>

<script>
import CourierForm from '../../components/Courier/CourierForm';
import CourierList from '../../components/Courier/CourierList';
export default {
    components: {
        CourierForm,
        CourierList
    }

}
</script>

<style>

</style>
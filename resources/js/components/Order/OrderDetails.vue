<template>
  <div>

      <h3> Checkout Details </h3>

        <div class="card"> <!-- for each if multiple items -->
            <div class="row">
                <div class="col col-lg-4">
                    <img class="card-img" width="150" height="150">
                </div>
                <div class="col col-lg-8">
                    <div class="card-body">
                        <h5 class="card-title"> Sample title </h5>
                        <p class="card-text"> Price (pesos) </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="row">
                <div class="col col-lg-4">
                    <h3> Address </h3>
                </div>
                <div class="col col-lg-8">
                    <h5> The solution is effectively pretty much the same as I used. You still might need to do minor tweaks to make it work as you wish, also stated in the documentation: "Further adjustments may be needed depending on your card content". </h5>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="row">
                <div class="col col-lg-9">
                    <h3> Total Price </h3>
                </div>
                <div class="col col-lg-3">
                    <h3> 0.00 </h3>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="row">
                <div class="col col-lg-5">
                    <h3> Discount Code (if any) </h3>
                </div>
                <div class="col col-lg-7">
                    <h3> <input class="form-control" type="text" placeholder="Discount Code "> </h3>
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
                    <h3> 0.00 </h3>
                </div>
                 <div class="col col-lg-2">
                    <h3> <button class="btn btn-primary"> Place Order </button> </h3>
                </div>
            </div>
        </div>

       
  </div>
</template>

<script>
export default {

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
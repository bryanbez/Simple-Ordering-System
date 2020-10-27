<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#"> Ordering System </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <router-link to="/" class="nav-link"> Home <span class="sr-only">(current)</span></router-link>
      
      </li>
      <li class="nav-item">
        <router-link to="/products" class="nav-link"> Products </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/categories" class="nav-link"> Categories </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/" class="nav-link"> Users </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/archive" class="nav-link"> Archives </router-link>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
export default {

}
</script>

<style>

</style>
<template>
  <div>
 
        <ListArchiveProducts></ListArchiveProducts>
        <hr />
        <ListArchiveCategories></ListArchiveCategories>
  </div>
</template>

<script>
import ListArchiveProducts from '../../components/Archive/ListArchiveProducts';
import ListArchiveCategories from '../../components/Archive/ListArchiveCategories';
export default {
    components: {
        ListArchiveProducts,
        ListArchiveCategories
    }
}
</script>

<style>

</style>
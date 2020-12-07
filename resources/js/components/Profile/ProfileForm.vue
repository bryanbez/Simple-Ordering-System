<template>
  <div>

      <h3> Update Profile </h3>
      <br />
      <div class="alert alert-success" v-if="updateProfileMsg =! []">
          {{ updateProfileMsg }}
      </div>
      <div class="row">
        <div class="col col-lg-12">
          <div class="row">
            <div class="col col-lg-4 col-sm-12">
                <label for=""> Last Name </label>
                <input type="text" class="form-control" v-model="profileInfo.last_name">
            </div>
            <div class="col col-lg-4 col-sm-12">
                <label for=""> First Name </label>
                <input type="text" class="form-control" v-model="profileInfo.first_name">
            </div>
            <div class="col col-lg-4 col-sm-12">
                <label for=""> Middle Initial </label>
                <input type="text" class="form-control" v-model="profileInfo.middle_initial">
            </div>
          </div>
        </div>

        <div class="col col-lg-12">
          <div class="row">
            <div class="col col-lg-4 col-sm-12">
              <label for="">Profile Pic</label>
              <br />
              <img :src="profileInfo.profile_pic" alt="" width="250" height="150">
              <br />
              <input type="file" v-on:change="uploadImage">
            </div>
             <div class="col col-lg-8 col-sm-12">
                <label for=""> Address </label>
                <textarea class="form-control" cols="30" rows="5" v-model="profileInfo.address"> </textarea>
            </div>
          </div>
         
        </div>

        <div class="col col-lg-12">
          <div class="row">
            <div class="col-sm-12 col-lg-6">
                <label for=""> Gender </label>
                <select v-model="profileInfo.gender" class="form-control">
                  <option value="male"> Male </option>
                  <option value="female"> Female </option>
                  <option value="prefer_not_to_say"> Prefer Not To Say</option>
                </select>
            </div>
             <div class="col-sm-12 col-lg-6">
               <label for=""> Email </label>
               <input type="text" class="form-control" v-model="profileInfo.email">
            </div>
          </div>
        </div>

        <div class="col col-lg-12">
          <div class="row">
            <div class="col col-lg-6 col-sm-12">
                <label for=""> Age </label>
                <input type="text" class="form-control" v-model="profileInfo.age">
            </div>
             <div class="col col-lg-6 col-sm-12">
                <label for=""> Username </label>
                <input type="text" class="form-control" readonly v-model="profileInfo.user_name">
            </div>
          </div>
        </div>

        <div class="col col-lg-12">
          <button class="btn btn-primary" @click="updateProfile()"> Update </button>
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

    const profileInfo = computed(() => storeModule.state.profile.profileOfUser)
    const updateProfileMsg = computed(() => storeModule.state.profile.updateProfileMsg)

    function uploadImage(event) {
        var fileReader = new FileReader();
            fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onload = (event) => {
            profileInfo.profile_pic = event.target.result;      
        }  
    }

    function updateProfile() {
        storeModule.dispatch('profile/updateProfileAction', profileInfo)
    }

    onMounted(() => {
        storeModule.dispatch('profile/fetchProfile')
    });

    return {
      profileInfo,
      uploadImage,
      updateProfile,
      updateProfileMsg,
    }

  }
}
</script>

<style>

</style>
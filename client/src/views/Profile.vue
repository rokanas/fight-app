<template>
    <div class="container">
        <div class="col-md-12 d-flex flex-column align-items-center">
            <div class="col-10">
                <ProfileForm></ProfileForm>
            </div>
            <div class="col-2 mt-1">
                <button class="btn btn-lg button-border text-color" v-on:click ="editProfile">Edit</button>
            </div>
        </div>
    </div>
</template>

<script setup>

import ProfileForm from "../components/ProfileForm.vue"
import router from "../router";

function editProfile(){
    router.push({
    name:'EditProfile'
    })
}

</script>

<style scoped>
.button-border{
    border-radius: 10px;
    border: none;
    background-color: #6B0801;
}
.text-color{
    color: #FFFF00;
}
</style>
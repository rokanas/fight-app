<template>
    <Background></Background>
    <div class="container container-padding">
        <div class="row d-flex flex-row">
            <div class="col-6 d-flex align-items-center justify-content-center">
                <h1 class="text-color">Potential partner:</h1>
            </div>
            <div class="col-6 d-flex flex-column">
                <div class="col">
                    <button type="button" class="button-border text-color">{{ fighter2 }}</button>
                </div>
                <div class="col">
                    <img
                    src="../../public/blank-profile-pic.png"
                    class="img-fluid profile-pic-size background-color img-thumbnail mt-3"
                    alt="Profile picture needed"
                    >
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col background-color">
                <div class="row d-flex flex-row mt-3">
                </div>
                <div class="row d-flex flex-row mt-1">
                    <div class="col-6">
                        <label for="challengerBox" class="form-label text-color">Date:</label>
                    </div>
                    <div class="col-6">
                        <input
                        id="challengerBox"
                        class="form-control" 
                        type="text"
                        placeholder="e.g. 2023-12-24"
                        >
                    </div>
                </div>
                <div class="row d-flex flex-row mt-1 mb-3">
                    <div class="col-6">
                        <label for="locationBox" class="form-label text-color">Location:</label>
                    </div>
                    <div class="col-6">
                        <input
                        id="locationBox"
                        class="form-control" 
                        type="text"
                        placeholder="e.g. Gothenburg"
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col">
                <button class="btn btn-lg button-border text-color" v-on:click ="createDate">Propose date</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import Background from '../components/Background.vue';

    let fighter1 = ref('Godzilla');
    let fighter2 = ref('Anonymous');

    function createDate(){

    }
</script>

<style scoped>
.container-padding{
    padding: 20px;
}
.profile-pic-size{
    size: 180px;
    border: none;
}
.button-border{
    border-radius: 10px;
    border: none;
    background-color: #6B0801;
}
.background-color{
    background-color: #6B0801;
}
.text-color{
    color: #FFFF00;
}
</style>
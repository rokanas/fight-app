<template>
    <Background></Background>
    <div class="container container-padding">
        <div class="row d-flex flex-wrap">
            <div class="col-5 col-sm-4 d-flex  flex-fill flex-column">
                <label class="fs-2 text-color" for="fighterOneImage">{{ fighter1 }}</label>
                <img
                src="../../public/Godzilla.png"
                class="img-fluid profile-pic-size background-color img-thumbnail mt-3"
                alt="Profile picture needed"
                >
            </div>
            <div class="col-2 col-sm-4 d-flex  flex-fill align-items-center justify-content-center">
                <p class="fs-1 text-color">VS</p>
            </div>
            <div class="col-5 col-sm-4 d-flex  flex-fill flex-column">
                <label class="fs-2 text-color" for="fighterOneImage">{{ fighter2 }}</label>
                <img
                src="../../public/blank-profile-pic.png"
                class="img-fluid profile-pic-size background-color img-thumbnail mt-3"
                alt="Profile picture needed"
                >
            </div>
        </div>
        <div class="row d-flex flex-column justify-content-center mt-2">
            <div class="col d-flex flex-row flex-wrap flex-fill align-items-center background-color text-color">
                <i class="bi bi-trophy w-25"></i>
                <p class="fs-4 w-50 pt-1">Winner: {{ winner }}</p>
                <i class="bi bi-trophy w-25"></i>
            </div>
            <div class="col d-flex flex-column">
                <div class="col-1 col-sm-2 w-100 d-flex flex-fill align-content-center justify-content-center mt-2">
                    <p class="fs-1 text-color">Fight stats</p>
                </div>
                <div class="col-11 col-sm-10 w-100 flex-fill justify-content-center background-color text-color">
                    <div class="row d-flex flex-row mt-2">
                        <div class="col-6">
                            <p class="flex-fill">date:</p>
                        </div>
                        <div class="col-6">
                            <p class="flex-fill">{{ date }}</p>
                        </div>
                    </div>
                    <div class="row d-flex flex-row">
                        <div class="col-6">
                            <p class="flex-fill">location:</p>
                        </div>
                        <div class="col-6">
                            <p class="flex-fill">{{ location }}</p>
                        </div>
                    </div>
                    <div class="row d-flex flex-row">
                        <div class="col-6">
                            <p class="flex-fill">Weight class:</p>
                        </div>
                        <div class="col-6">
                            <p class="flex-fill">{{ weightClass }}</p>
                        </div>
                    </div>
                    <div class="row d-flex flex-row">
                        <div class="col-6">
                            <p class="flex-fill">Martial art:</p>
                        </div>
                        <div class="col-6">
                            <ul v-for="item in martialArts" class="d-flex flex-row">
                                <li class="flex-fill">{{ item.value }} </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col w-100 justify-content-center">
                <button type="button" class="btn btn-lg button-border background-color text-color mt-2" v-on:click="deleteFight">Delete fight</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import Background from '../components/Background.vue';

    let fighter1 = ref('Godzilla');
    let fighter2 = ref('Anonymous');
    let winner = ref('Godzilla');
    
    let boxing = ref('Boxing');
    let wushu = ref('Wushu');

    let date = ref('2023-12-12');
    let location = ref('Gothenburg');
    let weightClass = ref('Heavy Weight');
    let martialArts = ref([boxing, wushu]);
    function deleteFight(){

    }

</script>

<style scoped>
.button-border{
    border-radius: 10px;
    border: none;
}
.container-padding{
    padding: 20px;
}
.profile-pic-size{
    size: 180px;
    border: none;
}
.background-color{
    background-color: #6B0801;
}
.text-color{
    color: #FFFF00;
}
.top-border{
    border-top: #FFFF00 solid;
}
</style>
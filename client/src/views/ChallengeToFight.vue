<template>
    <Background></Background>
    <div class="container container-padding">
        <div class="row d-flex flex-row">
            <div class="col-6 d-flex align-items-center justify-content-center">
                <h1 class="text-color">Your Opponent:</h1>
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
                <div class="row d-flex flex-row mt-1">
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
                <div class="row d-flex flex-row mt-1">
                    <div class="col-6">
                        <label for="weightClassBox" class="form-label text-color">Weight class:</label>
                    </div>
                    <div class="col-6">
                        <input
                        id="weightClassBox"
                        class="form-control" 
                        type="text"
                        placeholder="e.g. Heavy weight"
                        >
                    </div>
                </div>
                <div class="row d-flex flex-row mt-1">
                    <div class="col-6">
                        <label for="martialArtsBox" class="form-label text-color">Martial arts:</label>
                    </div>
                    <div class="col-6">
                        <ul v-for="item in selectedMartialArts" id="selectedMartialArtsBox" class="d-flex flex-row text-color">
                            <li class="flex-fill">{{ item.value }} </li>
                        </ul>
                        <li type="button" class="flex-fill text-color mb-3" data-bs-toggle="modal" data-bs-target="#martialArtsModal">Add more martial arts...</li>
                        <div class="modal fade" id="martialArtsModal" tabindex="-1" aria-labelledby="martialArtsModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                <div class="modal-content background-color text-color">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Choose your martial arts:</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div class="modal-body d-flex flex-row flex-wrap align-items-center justify-content-center">
                                        <ul class="list-group" v-for="item in listOfMartialArts">
                                            <li class="list-group-item d-inline-flex rounded-pill text-color list-border list-margin">
                                                <input class="btn-check" type="checkbox" :id="'checkbox-' + item.value" autocomplete="off">
                                                <label class="btn text-color" :for="'checkbox-' + item.value">{{ item.value }}</label>
                                            </li>
                                        </ul>    
                                    </div>
                                    <div class="modal-footer justify-content-center">
                                        <button type="button" class="btn btn-lg justify-content-center modal-button text-color" v-on:click ="slecetMartialArts">Select</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col">
                <button class="btn btn-lg button-border text-color" v-on:click ="createFight">Challenge</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import Background from '../components/Background.vue';

    let fighter1 = ref('Godzilla');
    let fighter2 = ref('Anonymous');

    let boxing = ref('Boxing');
    let wushu = ref('Wushu');
    let kickBox = ref('Kick box');

    let selectedMartialArts = ref([boxing, wushu]);
    let listOfMartialArts = ref([boxing, wushu,kickBox]);

    function createFight(){

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
.modal-button{
    border-radius: 10px;
    border: none;
    background-color: #B30000;
}
.list-border{
    padding: 5px 8px;
    border: 2px solid #B30000;
    background-color: rgba(255, 255, 255, 0.15) !important;
}
.list-margin{
    margin: 3px;
}
</style>
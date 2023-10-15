<template>
    <Background></Background>
    <div class="container container-width mt-5 pt-0 px-0">
        <div class="mx-1  container-border">
            <div class = "row justify-content-center">
                <div class ="col">
                <button class="w-50 fights-border btn btn-lg text-color" v-bind:style="{ backgroundColor: fightsButtonColor }" v-on:click ="showFights">Fights</button>
                <button class="w-50 dates-border btn btn-lg text-color" v-bind:style="{ backgroundColor: datesButtonColor }" v-on:click ="showDates">Dates</button>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col d-flex flex-column mt-2" v-if = "isFights">
                    <div class="col w-100">
                        <ul v-for="item in fights" class="justify-content-center pe-4">
                            <button type="button" class="list-items background-color text-color w-75" :id="'fight-' + item.value">{{ item.value }}</button>
                            <button type="button" class="bi bi-trash3-fill w-25 list-items background-color text-color" :for="'fight-' + item.value"></button>
                        </ul>
                    </div>
                    <div class="col w-100 justify-content-center">
                        <button type="button" class="btn btn-lg button-border background-color text-color mb-2" v-on:click="deleteAllFights">Delete all fights</button>
                    </div>
                </div>
                <div class="co d-flex flex-column mt-2" v-if="isDates">
                    <div class="col w-100">
                        <ul v-for="item in dates" class="justify-content-center pe-4">
                            <button type="button" class="list-items background-color text-color w-75" :id="'date-' + item.value">{{ item.value }}</button>
                            <button type="button" class="bi bi-trash3-fill w-25 list-items background-color text-color" :for="'date-' + item.value"></button>
                        </ul>
                    </div>
                    <div class="col w-100 justify-content-center">
                        <button type="button" class="btn btn-lg button-border background-color text-color mb-2" v-on:click="deleteAllDates">Delete all dates</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import Background from '../components/Background.vue';
    import { ref } from 'vue';

    let fightsButtonColor = ref('#B30000');
    let datesButtonColor = ref('#6B0801');

    let isFights = ref(true);
    let isDates = ref(false);

    let fight1 = ref('john cena match');
    let fight2 = ref('terminator match');
    let fight3 = ref('king kong match');

    let date1 = ref('jessica date');
    let date2 = ref('elizabeth date');
    let date3 = ref('maria date');
    
    let fights = ref([fight1,fight2,fight3]);
    let dates = ref([date1,date2,date3]);

    function showFights() {
        isFights = true;
        isDates = false;
        fightsButtonColor.value = '#B30000';
        datesButtonColor.value = '#6B0801';
    }
    function showDates(){
        isFights = false;
        isDates = true;
        datesButtonColor.value = '#B30000';
        fightsButtonColor.value = '#6B0801';
    }
    function deleteAllFights(){

    }
    function deleteAllDates(){
        
    }
</script>

<style scoped>
.container-width{
    width: 100%;
    max-width: 600px;
}
.container-border{
    border-radius: 10px;
    background-color: #B30000;
}
.button-border{
    border-radius: 10px;
    border: none;
}
.list-items{
    border: none;
    background: none;
}
.fights-border{
    border: none;
    border-top-left-radius: 10px;
}

.dates-border{
    border: none;
    border-top-right-radius: 10px;
}

.delete-border{
    border-radius: 10px;
    background-color: #6B0801;
}
.text-color{
    color: #FFFF00;
}
.background-color{
    background-color: #6B0801;
}
</style>
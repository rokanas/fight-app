<template>
    <Background></Background>
    <div class="contatiner">
        <div class="row d-flex flex-row flex-wrap mt-3">
            <div class="col-2 col-sm-2 d-flex align-items-center justify-content-end">
                <button type="button" class="bi bi-arrow-left-circle-fill text-color" style="background: none; border: none;"></button>
            </div>
            <div class="col-8 col-sm-8">
                <div class="row">
                    <div class="col-12">
                        <ProfileForm></ProfileForm>
                    </div>
                </div>
                <div class="row d-flex flex-row-reverse align-self-start mt-2">
                    <div class="col-sm-3 mb-sm-0 mb-2">
                        <button type="button" class="button-border text-color background-color">Challenge to fight</button>
                    </div>
                    <div class="col-sm-3 mb-sm-0 mb-2">
                        <button type="button" class="button-border text-color background-color">Ask on date</button>
                    </div>
                </div>
            </div>
            <div class="col-2 col-sm-2 d-flex align-items-center ">
                <button type="button" class="bi bi-arrow-right-circle-fill text-color" style="background: none; border: none;"></button>
            </div>
        </div>
    </div>
</template>

<script setup>
import ProfileForm from '../components/ProfileForm.vue';
import Background from '../components/Background.vue';

</script>

<style scoped>
.button-border{
    border-radius: 10px;
    border: none;
}
.background-color{
    background-color: #6B0801;
}
.text-color{
    color: #FFFF00;
}
</style>
<template>
    <div class="container container-width mt-5 pt-0 px-0">
        <div class="mx-1  container-border">
            <div class = "row justify-content-center">
                <div class ="col">
                <button class="w-50 login-border btn btn-lg text-white" v-bind:style="{ backgroundColor: loginButtonColor }" v-on:click ="showLogIn">Log in</button>
                <button class="w-50 signup-border btn btn-lg text-white" v-bind:style="{ backgroundColor: signupButtonColor }" v-on:click ="showSignUp">Sign up</button>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col mt-2" v-if = "isLogIn">
                    <form submit = "Log In">
                        <div class="d-flex align-items-center mx-3">
                            <label class="label-form text-white" for="emailBox">Email:</label>
                            <input
                            type="email"
                            id = "emailBox"
                            class="form-control"
                            placeholder="example@email.com"/>
                        </div>
                        <div class="d-flex align-items-center mt-1 mx-3 mb-2">
                            <label class="label-form text-white" for="passwordBox">Password:</label>
                            <input
                            type="password"
                            id ="passwordBox"
                            class="form-control"
                            placeholder="password"/>
                        </div>
                        <div class="col">
                            <button class="w-20 submit-border mb-2 btn btn-lg text-white">Submit</button>
                        </div>
                    </form>
                </div>
                <div class="col mt-2" v-if="isSignUp">
                    <form>
                        <div class="d-flex align-items-center mx-3">
                            <label class= "label-form text-white" for="emailBox">Email:</label>
                            <input 
                            type="email"
                            id = "emailBox"
                            class="form-control"
                            placeholder="example@email.com"/>
                        </div>
                        <div class="d-flex align-items-center mt-1 mx-3">
                            <label class= "label-form text-white" for="passwordBox">Password:</label>
                            <input
                            type="password"
                            id ="passwordBox"
                            class="form-control"
                            placeholder="password"/>
                        </div>
                        <div class="d-flex align-items-center mt-1 mx-3">
                            <label class= "label-form text-white" for="fullNameBox">Full name:</label>
                            <input
                            type="text"
                            id ="fullNameBox"
                            class="form-control"
                            placeholder="e.g. Arvin Rahimi"/>
                        </div>
                        <div class="d-flex align-items-center mt-1 mx-3">
                            <label class= "label-form text-white" for="sexBox">Sex:</label>
                            <select 
                            id="sexBox"
                            class="form-select">
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>
                        <div class="d-flex align-items-center mt-1 mx-3">
                            <label class= "label-form text-white" for="ageBox">Age:</label>
                            <input
                            type="number"
                            id ="ageBox"
                            class="form-control"
                            placeholder="e.g. 20"/>
                        </div>
                        <div class="d-flex align-items-center mt-1 mx-3">
                            <label class= "label-form text-white" for="heightBox">Height:</label>
                            <input
                            type="number"
                            id ="heightBox"
                            class="form-control"
                            placeholder="e.g. 180"/>
                        </div>
                        <div class="d-flex align-items-center mt-1 mx-3">
                            <label class= "label-form text-white" for="WeightBox">Weight:</label>
                            <input
                            type="number"
                            id ="WeightBox"
                            class="form-control"
                            placeholder="e.g. 80"/>
                        </div>
                        <div class="d-flex align-items-center mt-1 mx-3">
                            <label class= "label-form text-white" for="locationBox">Location:</label>
                            <input
                            type="text"
                            id ="locationBox"
                            class="form-control"
                            placeholder="e.g. Gothenburg"/>
                        </div>
                        <div class="d-flex align-items-center mt-1 mx-3 mb-2">
                            <label class= "label-form text-white" for="bioBox">Bio:</label>
                            <textarea
                            type="text"
                            id ="bioBox"
                            v-model ="userDescription"
                            class="form-control"
                            placeholder="explain a bit about yourself...">
                            </textarea>
                        </div>
                        <div class="col">
                            <button class="w-20 submit-border mb-2 btn btn-lg text-white">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'

    let isLogIn = ref (true);
    let isSignUp = ref (false);

    let userDescription = ref ('');

    let loginButtonColor = ref('#B30000');
    let signupButtonColor = ref('#6B0801');

    function showLogIn(){
        isLogIn.value = true;
        isSignUp.value = false;
        loginButtonColor.value = '#B30000';
        signupButtonColor.value = '#6B0801';
    }
    function showSignUp(){
        isLogIn.value = false;
        isSignUp.value = true;
        signupButtonColor.value = '#B30000';
        loginButtonColor.value = '#6B0801';
    }
</script>

<style scoped>
.label-form {
    width: 120px;
}

.container-width{
    width: 100%;
    max-width: 600px;
}
.container-border{
    border-radius: 10px;
    background-color: #B30000;
}

.login-border{
    border: none;
    border-top-left-radius: 10px;
}

.signup-border{
    border: none;
    border-top-right-radius: 10px;
}

.submit-border{
    border-radius: 10px;
    background-color: #6B0801;
}
</style>
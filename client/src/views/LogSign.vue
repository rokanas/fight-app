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
                    <form @submit.prevent = "loginFighter">
                        <div class="d-flex align-items-center mx-3">
                            <label class="label-form text-white" for="emailBox">Email:</label>
                            <input
                            type="email"
                            v-model="email"
                            id = "emailBox"
                            class="form-control"
                            placeholder="example@email.com"/>
                        </div>
                        <div class="d-flex align-items-center mt-1 mx-3 mb-2">
                            <label class="label-form text-white" for="passwordBox">Password:</label>
                            <input
                            type="password"
                            v-model="password"
                            id ="passwordBox"
                            class="form-control"
                            placeholder="password"/>
                        </div>
                        <div class="col">
                            <button class="w-20 submit-border mb-2 btn btn-lg text-white" type="submit" :disabled="isEmpty">Submit</button>
                        </div>
                    </form>
                </div>
                <div class="col mt-2" v-if="isSignUp">
                    <form @submit.prevent = "registerFighter">
                        <div class="d-flex align-items-center mx-3">
                            <label class= "label-form text-white" for="emailBox">Email:</label>
                            <input 
                            type="email"
                            v-model="email"
                            id = "emailBox"
                            class="form-control"
                            placeholder="example@email.com"/>
                        </div>
                        <div class="d-flex align-items-center mt-1 mx-3">
                            <label class= "label-form text-white" for="passwordBox">Password:</label>
                            <input
                            type="password"
                            v-model="password"
                            id ="passwordBox"
                            class="form-control"
                            placeholder="password"/>
                        </div>
                        <div class="d-flex align-items-center mt-1 mx-3">
                            <label class= "label-form text-white" for="fullNameBox">Full name:</label>
                            <input
                            type="text"
                            v-model="fullName"
                            id ="fullNameBox"
                            class="form-control"
                            placeholder="e.g. Arvin Rahimi"/>
                        </div>
                        <div class="d-flex align-items-center mt-1 mx-3">
                            <label class= "label-form text-white" for="sexBox">Sex:</label>
                            <select
                            v-model="sex"
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
                            v-model="age"
                            id ="ageBox"
                            class="form-control"
                            placeholder="e.g. 20"/>
                        </div>
                        <div class="d-flex align-items-center mt-1 mx-3">
                            <label class= "label-form text-white" for="heightBox">Height:</label>
                            <input
                            type="number"
                            v-model="height"
                            id ="heightBox"
                            class="form-control"
                            placeholder="e.g. 180"/>
                        </div>
                        <div class="d-flex align-items-center mt-1 mx-3">
                            <label class= "label-form text-white" for="WeightBox">Weight:</label>
                            <input
                            type="number"
                            v-model="weight"
                            id ="WeightBox"
                            class="form-control"
                            placeholder="e.g. 80"/>
                        </div>
                        <div class="d-flex align-items-center mt-1 mx-3">
                            <label class= "label-form text-white" for="locationBox">Location:</label>
                            <input
                            type="text"
                            v-model="location"
                            id ="locationBox"
                            class="form-control"
                            placeholder="e.g. Gothenburg"/>
                        </div>
                        <div class="d-flex align-items-center mt-1 mx-3 mb-2">
                            <label class= "label-form text-white" for="bioBox">Bio:</label>
                            <textarea
                            type="text"
                            v-model="bio"
                            id ="bioBox"
                            class="form-control"
                            placeholder="explain a bit about yourself...">
                            </textarea>
                        </div>
                        <div class="col">
                            <button class="w-20 submit-border mb-2 btn btn-lg text-white" type="submit" :disabled="isEmpty">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Api } from '@/Api'
import router from "../router";

export default {
  name: 'LogSign',
  props: ['LogSign'],

  data() {
    return {
        isLogIn: true,
        isSignUp: false,

        loginButtonColor: '#B30000',
        signupButtonColor: '#6B0801',

        email: '',
        password: '',
        fullName: '',
        sex: '',
        age: '',
        height: '',
        weight: '',
        location: '',
        bio: ''
    }
  },
  methods: {
    showLogIn() {
        this.isLogIn = true;
        this.isSignUp = false;
        this.loginButtonColor = '#B30000';
        this.signupButtonColor = '#6B0801';
    },
    showSignUp() {
        this.isLogIn = false;
        this.isSignUp = true;
        this.signupButtonColor = '#B30000';
        this.loginButtonColor = '#6B0801';
    },
    async loginFighter() {
        try {
        // create fighter object with given data
        const fighter = {
          email: this.email,
          password: this.password,
        }
        // make post request to backend API
        const response = await Api.post('/auth/login', fighter)

        if (response.status === 201) {
            localStorage.setItem('fightAppAccessToken', response.data.accessToken)
          console.log('Fighter logged in successfully.')
        }
        // clear the login form
        this.email = ''
        this.password = ''

        router.push({
            name: 'Profile',
            params: {id: fighter.email}
        })

      } catch (error) {
        alert(error.message)
      }
    },
    async registerFighter() {
        try {
        // create fighter object with given data
        const fighter = {
          email: this.email,
          password: this.password,
          full_name: this.fullName,
          sex: this.sex,
          age: this.age,
          height: this.height,
          weight: this.weight,
          location: this.location,
          bio: this.bio
        }
        // make post request to backend API
        const response = await Api.post('/auth/register', fighter)
        
        if (response.status === 201) {
          localStorage.setItem('fightAppAccessToken', response.data.accessToken)  
          console.log('Fighter registered successfully.')
        }
        // clear the login form
        this.email = ''
        this.password = ''
        this.fullName = ''
        this.sex = ''
        this.age= ''
        this.height = ''
        this.weight = ''
        this.location = ''
        this.bio = ''

        router.push({
            name: 'Profile',
            params: {id: fighter.email}
        })

      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    isEmpty() {                     // method returns true if at least 1 field isn't complete
        if(this.isLogIn) {
            return this.email == '' || this.password == '';
        } else if (this.isSignUp) {
            return this.email == '' || this.password == '' || this.fullName == '' || this.sex == '' || this.age == '' ||
            this.height == '' || this.weight == '' || this.location == '' || this.bio == '';
        }
    }
  }
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
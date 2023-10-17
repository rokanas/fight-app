<template>
  <header>
    <nav class="navbar navbar-expand-sm background-color header-be-front">
      <div class="container-fluid">
        <a href="#" class="navbar-logo text-color" id="logo">FightApp</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav justify-content-between w-100 me-auto me-lg-0 mb-2 mb-lg-0">

            <div class="col d-flex flex-wrap justify-content-sm-start justify-content-center">
              <li class="nav-item">
              <div v-if="isLoggedIn">
                <a href="#" class="nav-link navbar-items text-color" v-on:click ="goToProfile">Fighter<br>Profile</a>
              </div>
            </li>

            <li class="nav-item ms-5">
              <div v-if="isLoggedIn">
                <a href="#" class="nav-link navbar-items text-color" v-on:click ="goToOpponent">Browse<br>Fighters</a>
              </div>
            </li>
            
            </div>
            <div class="col">
              <a href="#" class="fake-navbar-logo text-color" id="logo">FightApp</a>
            </div>
            <div class="col d-flex flex-wrap justify-content-sm-end justify-content-center">
              <li class="nav-item d-flex align-items-center">
              <div v-if="isLoggedIn">
                <a href="#" class="nav-link navbar-items text-color" v-on:click ="logOut">Logout</a>
              </div>
            </li>
            </div> 
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { Api } from '@/Api'
import router from "../router";

  export default {
  name: 'Header',
  data() {
    return {
      isLoggedIn: false
    }
  },
  created() {
    this.checkIsLoggedIn();
  },
  watch: {
    // Watch for changes in localStorage and update the login status
    '$localStorage.fightAppAccessToken'(newVal) {
      this.isLoggedIn = newVal !== null;
    },
    '$route.params.id': 'checkIsLoggedIn',
  },
  methods: {
    checkIsLoggedIn() {
      this.isLoggedIn = localStorage.getItem('fightAppAccessToken') !== null;
    },
    async goToProfile() {
      try {
        const user = await Api.get('/auth/' + localStorage.getItem('fightAppAccessToken'))
        router.push({
          name: 'Profile',
          params: { id: user.data }
        })
      } catch(error) {
        console.error(error)
      }
    },
    async goToOpponent() {
      try {
        const user = await Api.get('/auth/' + localStorage.getItem('fightAppAccessToken'))

        const fighterData = await Api.get('/fighter/' + user.data)
        const location = fighterData.data.location
        const response = await Api.get('/fighter/opponents/' + location)
        
        if(response.data.length <= 1) {
          alert('No nearby fighters at your location. Sorry :(')
          router.push({
            name: 'Profile',
            params: {id: user.data.email}
          })
        } else {
          let nearbyFighters = response.data.map(fighter => fighter.email)
          nearbyFighters = nearbyFighters.filter(fighter => fighter !== user.data) // filter the array so the session User isn't able to browse their own profile
          const randomIndex = Math.floor(Math.random() * nearbyFighters.length)
          router.push({ 
            name: 'Opponent', 
            params: { id: nearbyFighters[randomIndex] }
          })
        }
      } catch(error) {
        console.error(error)
      }
    },
    async logOut() {
      localStorage.removeItem('fightAppAccessToken')
      router.push({ 
            name: 'Login', 
          })
    } 
  }
}
</script>

<style scoped>                  /* Style scoped applies css properties to HTML elements but only targets the elements of the component it is in. */

@import '../css/fonts.css';

a {
  font-family: 'MetalMania';
  -webkit-text-stroke: 1.3px #000;
}

#logo {
  -webkit-text-stroke: 2.4px #000;
}
.background-color {
  background-color: rgba(255, 0, 0, 0.301);
}
.header-be-front {
  z-index: 9999;
}
.navbar-logo {
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  padding-left: 0.5rem;
  margin-right: 2rem;
  text-decoration: none;
  font-size: 55px;
}
.fake-navbar-logo {
  text-decoration: none;
  font-size: 55px;
}
.navbar-items {
  font-size: 30px;
  transition: transform 0.3s ease-in-out;           /* Defines how the transition between two states will look.  */
}
.navbar-items:hover {
  transform: scale(1.1);
}
.text-color {
  color: #FFFF00;
}
@media (min-width: 576px){
  .navbar-logo {
    display: none;
  }
}
@media (max-width: 576px) {
  .fake-navbar-logo{
    display: none;
  }
}

</style>
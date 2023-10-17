<template>
  <header>
    <nav class="navbar navbar-expand-sm background-color header-be-front text-font">
      <div class="container-fluid">
        <a href="#" class="navbar-logo text-color">FightApp</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav justify-content-between w-100 me-auto me-lg-0 mb-2 mb-lg-0">
            <div class="col d-flex flex-wrap justify-content-sm-start justify-content-center">
              <li class="nav-item">
              <div v-if="isLoggedIn">
                <a href="#" class="nav-link navbar-items text-color">Browse Fighters</a>
              </div>
            </li>
            </div>
            <div class="col">
              <a href="#" class="fake-navbar-logo text-color">FightApp</a>
            </div>
            <div class="col d-flex flex-wrap justify-content-sm-end justify-content-center">
              <li class="nav-item">
              <div v-if="isLoggedIn">
                <a href="#" class="nav-link navbar-items text-color">Logout</a>
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
  export default {
  name: 'Header',
  inject: ['isLoggedIn'] // injected from "App.vue"
}
</script>

<style scoped>                  /* Style scoped applies css properties to HTML elements but only targets the elements of the component it is in. */

@import '../css/fonts.css';

a {
  color: #ffffff;                      /* Link color */
  font-size: 4vh;
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
.text-font {
  font-family: 'MetalMania';
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
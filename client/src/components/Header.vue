 <template>
    <header class="fightapp_header">
      <nav class="header_nav_bar" v-if="isLoggedIn">
        <a href="#/" class="header_link">Logout</a>
      </nav>
      <div class="logo_container">
        <a href="#/" class = "header_logo">FightApp</a>
      </div>
      <nav class="header_nav_bar" v-if="isLoggedIn">                   
        <a href="#/" class="header_link">Browse Fighters</a>
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

  .fightapp_header {
    background-color: rgba(255, 0, 0, 0.301);
    display: flex;               /* Adapting to screen size*/
    align-items: center;
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    z-index: 9999;              /* The high z-index value ensures consistency in that the page header is always displayed above all other page content. */
    font-family: 'MetalMania';
}

  .logo_container {
    display: flex;              /* Adapting to screen size */
    flex: 1;                    /* Resizes when growing and shrinking */
    justify-content: center;    /* Centers the flex items horizontally within the container. (The links are always centered )  */
  }
  
  .header_nav_bar {
    display: flex;              /* Adapting to screen size */
    flex: 1;                    /* Resizes when growing and shrinking */
    justify-content: center;    /* Centers the flex items horizontally within the container. (The links are always centered )  */
  }
  
  .header_link {
    margin: 10px;
    text-decoration: none;
    font-size: 40px;
    color: #FFFF00;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    transition: transform 0.3s ease-in-out;  /* Defines how the transition between two states will look.  */
  }                                          /* In this case the links will move smoothly in and out between scale 1 and 1.1 when hovered  */
  
  .header_logo {
    margin: 10px;
    text-decoration: none;
    font-size: 75px;
    color: #FFFF00;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: black;
    transition: transform 0.3s ease-in-out;  /* Defines how the transition between two states will look.  */
  }                                          /* In this case the links will move smoothly in and out between scale 1 and 1.1 when hovered  */
  
  .header_link:hover {
    transform: scale(1.1);                   /* Makes element  10 % larger  */
  }
  
  .header_button {
    margin: 20px;
    width: 250px;
  }
  
  </style>
  
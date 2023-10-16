<template>
    <div class="container container-padding">
        <div class="row d-flex flex-wrap">
            <div class="col-5 col-sm-4 d-flex  flex-fill flex-column">
                <label class="fs-2 text-color" for="fighterOneImage">{{ fighter2 }}</label>
                <img
                src="../../public/Godzilla.png"
                class="img-fluid profile-pic-size background-color img-thumbnail mt-3"
                alt="Profile picture needed"
                >
            </div>
            <div class="col-2 col-sm-4 d-flex  flex-fill align-items-center justify-content-center">
                <i class="bi bi-arrow-through-heart fs-1 text-color"></i>
            </div>
            <div class="col-5 col-sm-4 d-flex  flex-fill flex-column">
                <label class="fs-2 text-color" for="fighterOneImage">{{ fighter1 }}</label>
                <img
                src="../../public/blank-profile-pic.png"
                class="img-fluid profile-pic-size background-color img-thumbnail mt-3"
                alt="Profile picture needed"
                >
            </div>
        </div>
        <div class="row d-flex flex-column justify-content-center mt-2">
            <div class="col d-flex flex-column">
                <div class="col-1 col-sm-2 w-100 d-flex flex-fill align-content-center justify-content-center mt-2">
                    <p class="fs-1 text-color">Date details:</p>
                </div>
                <div class="col-11 col-sm-10 w-100 flex-fill justify-content-center background-color text-color">
                    <div class="row d-flex flex-row mt-2">
                        <div class="col-6">
                            <p class="flex-fill">Date:</p>
                        </div>
                        <div class="col-6">
                            <p class="flex-fill">{{ date }}</p>
                        </div>
                    </div>
                    <div class="row d-flex flex-row">
                        <div class="col-6">
                            <p class="flex-fill">Location:</p>
                        </div>
                        <div class="col-6">
                            <p class="flex-fill">{{ location }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col w-100 justify-content-center">
                <button type="button" class="btn btn-lg button-border background-color text-color mt-2" v-on:click="deleteDate">Delete date</button>
            </div>
        </div>
    </div>
</template>

<script>
import router from "../router";
import { Api } from '../Api';

export default {
    name: 'Date',

    data() {
        return {
            sessionUser: '',

            fighter1: '',
            fighter2: '',

            date: '',
            location: ''
        }
    },
    mounted: async function() {
        await this.authenticateUser();
        await this.verifyDate();
        await this.populateDate();
    },
    methods: {
        async authenticateUser() {
            try {
                const user = await Api.get('/auth/' + localStorage.getItem('fightAppAccessToken'))
                this.sessionUser = user.data
            } catch(error) {
                console.error(error)
            }
        },
        async verifyDate() {
            try {
                await Api.get('/date/' + this.$route.params.id)
            } catch(error) {
                if(error.response && error.response.status === 404) {
                    alert('404: Date does not exist!')

                    router.push({ 
                        name: 'Profile', 
                        params: { id: this.sessionUser }
                    })
                } else {
                    console.error(error)
                }
            }
        },
        async populateDate() {
            try {
                const dateData = await Api.get('/date/' + this.$route.params.id)
                this.date = dateData.data.date
                this.location = dateData.data.location

                const fighters = await Api.get('/date/' + this.$route.params.id + '/fighter')
                this.fighter1 = fighters.data[0].full_name
                this.fighter2 = fighters.data[1].full_name
            } catch(error) {
                console.error(error)
            }
        },
        async deleteDate() {
            try {
                Api.delete('/date/' + this.$route.params.id)

                router.push({
                    name: 'Profile',
                    params: {id: this.sessionUser}
                })
            } catch (error) {
                console.error(error)
            }
        }
    }
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
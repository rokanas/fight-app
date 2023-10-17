<template>
    <div class="container container-padding container-size">
        <div class="row d-flex flex-wrap mb-3">
            <div class="col-5 col-sm-4 d-flex flex-fill align-content-end">
                <div class="row d-flex flex-column">
                    <div class="col">
                        <button type="button" class="fs-2 background-color button-border text-color" v-on:click="goToFighter2">{{ fighter2.full_name }}</button>
                    </div>
                    <div class="col">
                        <img
                        src="../../public/Godzilla.png"
                        class="img-fluid profile-pic-size background-color img-thumbnail mt-3"
                        alt="Profile picture needed"
                        >
                    </div>
                </div>
            </div>
            <div class="col-2 col-sm-4 d-flex flex-fill align-items-center justify-content-center">
                <i class="bi bi-arrow-through-heart fs-1 text-color"></i>
            </div>
            <div class="col-5 col-sm-4 d-flex flex-fill align-content-end">
                <div class="row d-flex flex-column">
                    <div class="col">
                        <button type="button" class="fs-2 background-color button-border text-color" v-on:click="goToFighter1">{{ fighter1.full_name }}</button>
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
                if(localStorage.getItem('fightAppAccessToken') === null) {
                    alert('Unauthorized access')
                    
                    router.push({
                        name: 'Login',
                    })
                } else {
                const user = await Api.get('/auth/' + localStorage.getItem('fightAppAccessToken'))
                this.sessionUser = user.data
                }
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
                this.fighter1 = fighters.data[0]
                this.fighter2 = fighters.data[1]
            } catch(error) {
                console.error(error)
            }
        },
        async deleteDate() {
            try {
                if(this.sessionUser === this.fighter1.email || this.sessionUser === this.fighter2.email) {
                // delete the date resource
                    Api.delete('/date/' + this.$route.params.id)

                // delete the relationship from all fighters in date
                const fighterList = await Api.get('/fighter');
                    for (const fighter of fighterList.data) {
                        if (fighter.date_history.some(date => date === this.$route.params.id)) {
                            await Api.delete('/fighter/' + fighter.email + '/date/' + this.$route.params.id);
                        }
                    }        
                    router.push({
                        name: 'Profile',
                        params: {id: this.sessionUser}
                    })
                } else {
                    alert(`Cannot delete other fighter's dates!`)
                }
            } catch (error) {
                console.error(error)
            }
        },
        goToFighter1() {
            if(this.fighter1.email === this.sessionUser) {
                router.push({
                    name: 'Profile',
                    params: {id: this.fighter1.email}
                })
            } else {
                router.push({
                    name: 'Opponent',
                    params: {id: this.fighter1.email}
                })
            }
        },
        goToFighter2() {
            if(this.fighter2.email === this.sessionUser) {
                router.push({
                    name: 'Profile',
                    params: {id: this.fighter2.email}
                })
            } else {
                router.push({
                    name: 'Opponent',
                    params: {id: this.fighter2.email}
                })
            }
        }
    }
}
</script>

<style scoped>
.container-size{
    width: 100%;
    max-width: 600px;
}
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
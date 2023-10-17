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
                <p class="fs-1 text-color">VS</p>
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
        <div class="row" :class="{ 'list-display' : winnerExists }">
                <div class="col mt-2">
                    <select class="form-select" aria-label="winner select box" v-on:change="saveWinner" v-model="selectedWinner">
                    <option value="0">Choose Winner</option>
                    <option value="1">{{ fighter1.full_name }}</option>
                    <option value="2">{{ fighter2.full_name }}</option>
                </select>
            </div>
        </div>
        <div class="row d-flex flex-column justify-content-center mt-2">
            <div class="col d-flex flex-row flex-wrap flex-fill align-items-center background-color text-color">
                <i class="bi bi-trophy w-25"></i>
                <h4 class="w-50 pt-1">WINNER: {{ winner }}</h4>
                <i class="bi bi-trophy w-25"></i>
            </div>
            <div class="col d-flex flex-column">
                <div class="col-1 col-sm-2 w-100 d-flex flex-fill align-content-center justify-content-center mt-2">
                    <p class="fs-1 text-color">FIGHT DETAILS:</p>
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
                    <div class="row d-flex flex-row">
                        <div class="col-6">
                            <p class="flex-fill">Weight class:</p>
                        </div>
                        <div class="col-6">
                            <p class="flex-fill">{{ weightClass }}</p>
                        </div>
                    </div>
                    <div class="row d-flex flex-row">
                        <div class="col-6">
                            <p class="flex-fill">Martial Art(s):</p>
                        </div>
                        <div class="col-6">
                            <ul v-for="item in martialArts" class="d-flex flex-row">
                                <li class="flex-fill">{{ item.name }} </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col w-100 justify-content-center">
                <button type="button" class="btn btn-lg button-border background-color text-color mt-2" v-on:click="deleteFight">Delete fight</button>
            </div>
        </div>
    </div>
</template>

<script>
import router from "../router";
import { Api } from '../Api';

export default {
    name: 'Fight',

    data() {
        return {
            sessionUser: '',

            fighter1: '',
            fighter2: '',
            winner: '',

            date: '',
            location: '',
            weightClass: '',

            martialArts: [],

            selectedWinner: "",
            winnerExists: false
        }
    },
    mounted: async function() {
        await this.authenticateUser();
        await this.verifyFight();
        await this.populateFight();
    },
    computed: {
        winner() {
            if (this.selectedWinner === '1') {
                return this.fighter1.full_name;
            } else if (this.selectedWinner === '2') {
                return this.fighter2.full_name;
            } else if (this.selectedWinner === '0') {
                return 'TBD'
            } else {
                if(this.winner === this.fighter1.email) {
                    return this.fighter1.full_name
                } else if (this.winner === this.fighter2.email) {
                    return this.fighter2.full_name
                }
            }
        },
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
        async verifyFight() {
            try {
                await Api.get('/fight/' + this.$route.params.id)
            } catch(error) {
                if(error.response && error.response.status === 404) {
                    alert('404: Fight does not exist!')

                    router.push({ 
                        name: 'Profile', 
                        params: { id: this.sessionUser }
                    })
                } else {
                    console.error(error)
                }
            }
        },
        async populateFight() {
            try {
                const fightData = await Api.get('/fight/' + this.$route.params.id)
                this.date = fightData.data.date
                this.location = fightData.data.location
                this.weightClass = fightData.data.weight_class

                const fighters = await Api.get('/fight/' + this.$route.params.id + '/fighter')
                this.fighter1 = fighters.data[0]
                this.fighter2 = fighters.data[1]

                if(fightData.data.winner !== '') { // if winner attribute is not empty
                    this.winnerExists = true
                    this.winner = fightData.data.winner
                }

                const fightMartialArts = await Api.get('/fight/' + this.$route.params.id + '/martial-art')
                this.martialArts = fightMartialArts.data
            } catch(error) {
                console.error(error)
            }
        },
        async saveWinner() {
            if (this.selectedWinner === '1') {
                await Api.patch('/fight/' + this.$route.params.id, { winner: this.fighter1.email})
                this.winner = this.fighter1.email
                this.winnerExists = true
            } else if (this.selectedWinner === '2') {
                await Api.patch('/fight/' + this.$route.params.id, { winner: this.fighter2.email})
                this.winner = this.fighter2.email
                this.winnerExists = true
            } else {
                await Api.patch('/fight/' + this.$route.params.id, { winner: ""})
            }
        },
        async deleteFight() {
            try {
                if(this.sessionUser === this.fighter1.email || this.sessionUser === this.fighter2.email) {
                    // delete the fight resource
                    await Api.delete('/fight/' + this.$route.params.id);

                    // delete the relationship from all fighters in fight
                    const fighterList = await Api.get('/fighter');
                    for (const fighter of fighterList.data) {
                        if (fighter.fight_history.some(fight => fight === this.$route.params.id)) {
                            await Api.delete('/fighter/' + fighter.email + '/fight/' + this.$route.params.id);
                        }
                    }
                    router.push({
                        name: 'Profile',
                        params: { id: this.sessionUser }
                        });
                } else {
                    alert(`Cannot delete other fighter's fights!`)
                }
            } catch (error) {
                console.error(error);
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
@import '../css/fonts.css';
h4{
    font-family: 'RoadRage';
    -webkit-text-stroke: 0.4px #000;
}
.list-display{
    display: none;
}
.container-size{
    width: 100%;
    max-width: 600px;
}
.button-border{
    border-radius: 10px;
    border: none;
}
.modal-button{
    border-radius: 10px;
    border: none;
    background-color: #B30000;
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
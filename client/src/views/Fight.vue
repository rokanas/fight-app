<template>
    <div class="container container-padding">
        <div class="row d-flex flex-wrap">
            <div class="col-5 col-sm-4 d-flex  flex-fill flex-column">
                <label class="fs-2 text-color" for="fighterOneImage">{{ fighter2.full_name }}</label>
                <img
                src="../../public/Godzilla.png"
                class="img-fluid profile-pic-size background-color img-thumbnail mt-3"
                alt="Profile picture needed"
                >
            </div>
            <div class="col-2 col-sm-4 d-flex  flex-fill align-items-center justify-content-center">
                <p class="fs-1 text-color">VS</p>
            </div>
            <div class="col-5 col-sm-4 d-flex  flex-fill flex-column">
                <label class="fs-2 text-color" for="fighterOneImage">{{ fighter1.full_name }}</label>
                <img
                src="../../public/blank-profile-pic.png"
                class="img-fluid profile-pic-size background-color img-thumbnail mt-3"
                alt="Profile picture needed"
                >
            </div>
        </div>
        <div class="row">
            <div class="col mt-2">
                <button type="button" class="fs-4 background-color text-color button-border pt-1" data-bs-toggle="modal" data-bs-target="#winnerModal">Choose winner</button>
                <div class="modal fade" id="winnerModal" tabindex="-1" aria-labelledby="winnerModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content background-color text-color">
                            <div class="modal-header">
                                <h5 class="modal-title">Choose the winner!</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body d-flex flex-row flex-wrap align-items-center justify-content-center">
                                <form>
                                    <label class="form-label" for="winnerBox">Who won?</label>
                                    <input type="text" id="winnerBox" class="form-control" placeholder="winner's name">
                                </form>
                            </div>
                            <div class="modal-footer justify-content-center">
                                <button type="button" class="btn btn-lg justify-content-center modal-button text-color" v-on:click ="submitWinner">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row d-flex flex-column justify-content-center mt-2">
            <div class="col d-flex flex-row flex-wrap flex-fill align-items-center background-color text-color">
                <i class="bi bi-trophy w-25"></i>
                <p class="fs-4 w-50 pt-1">Winner: {{ winner }}</p>
                <i class="bi bi-trophy w-25"></i>
            </div>
            <div class="col d-flex flex-column">
                <div class="col-1 col-sm-2 w-100 d-flex flex-fill align-content-center justify-content-center mt-2">
                    <p class="fs-1 text-color">Fight details:</p>
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

            martialArts: []
        }
    },
    mounted: async function() {
        await this.authenticateUser();
        await this.verifyFight();
        await this.populateFight();
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

                if(fightData.data.winner === '') { // if winner attribute is empty (therefore the winner key is 'falsy')
                    this.winner = 'TBD'
                } else {
                    this.winner = fightData.data.winner
                }

                const fightMartialArts = await Api.get('/fight/' + this.$route.params.id + '/martial-art')
                this.martialArts = fightMartialArts.data
            } catch(error) {
                console.error(error)
            }
        },
        submitWinner() {

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
        }
    },

}
</script>

<style scoped>
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
<template>
    <div class="container container-padding">
        <div class="row d-flex flex-row">
            <div class="col-6 d-flex align-items-center justify-content-center">
                <h1 class="text-color">Your opponent:</h1>
            </div>
            <div class="col-6 d-flex flex-column">
                <div class="col">
                    <button type="button" class="button-border text-color" v-on:click="goToOpponentProfile">{{ fighter2.full_name }}</button>
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
        <div class="row mt-3">
            <div class="col background-color">
                <div class="row d-flex flex-row mt-3">
                    <div class="col-6">
                        <label for="challengerBox" class="form-label text-color">Date:</label>
                    </div>
                    <div class="col-6">
                        <input
                        id="challengerBox"
                        v-model="date"
                        class="form-control" 
                        type="text"
                        placeholder="e.g. YYYY-MM-DD"
                        >
                    </div>
                </div>
                <div class="row d-flex flex-row mt-1">
                    <div class="col-6">
                        <label for="locationBox" class="form-label text-color">Location:</label>
                    </div>
                    <div class="col-6">
                        <input
                        id="locationBox"
                        v-model="location"
                        class="form-control" 
                        type="text"
                        placeholder="e.g. Gothenburg"
                        >
                    </div>
                </div>
                <div class="row d-flex flex-row mt-1">
                    <div class="col-6">
                        <label for="weightClassBox" class="form-label text-color">Weight class:</label>
                    </div>
                    <div class="col-6">
                        <input
                        id="weightClassBox"
                        v-model="weightClass"
                        class="form-control" 
                        type="text"
                        placeholder="e.g. Heavyweight"
                        >
                    </div>
                </div>
                <div class="row d-flex flex-row mt-1">
                    <div class="col-6">
                        <label for="martialArtsBox" class="form-label text-color">Martial arts:</label>
                    </div>
                    <div class="col-6">
                        <ul v-for="item in selectedMartialArts" id="selectedMartialArtsBox" class="d-flex flex-row text-color">
                            <li class="flex-fill">{{ item.name }} </li>
                        </ul>
                        <li type="button" class="flex-fill text-color mb-3" data-bs-toggle="modal" data-bs-target="#martialArtsModal">Add martial arts...</li>
                        <div class="modal fade" id="martialArtsModal" tabindex="-1" aria-labelledby="martialArtsModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                <div class="modal-content background-color text-color">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Choose your martial arts:</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div class="modal-body d-flex flex-row flex-wrap align-items-center justify-content-center">
                                        <ul class="list-group" v-for="item in listOfMartialArts">
                                            <li class="list-group-item d-inline-flex rounded-pill text-color list-border list-margin">
                                                <input class="btn-check" type="checkbox" :id="'checkbox-' + item.name" autocomplete="off" v-on:click ="selectMartialArts(item)">
                                                <label class="btn text-color" :for="'checkbox-' + item.name">{{ item.name }}</label>
                                            </li>
                                        </ul>    
                                    </div>
                                    <div class="modal-footer justify-content-center">
                                        <button type="button" class="btn btn-lg justify-content-center modal-button text-color" data-bs-dismiss="modal" v-on:click ="saveMartialArts">Select</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col">
                <button class="btn btn-lg button-border text-color" @click ="createFight" :disabled="isEmpty">Challenge</button>
            </div>
        </div>
    </div>
</template>

<script>
import { Api } from "@/Api";
import router from "../router";

export default {
    name: 'ChallengeFight',

    data() {
        return {
            sessionUser: '',

            fighter1: '',
            fighter2: '',

            date: '',
            location: '',
            weightClass: '',

            selectedMartialArts: [],
            newSelection: [],
            listOfMartialArts: [],
        }
    },
    mounted: async function() {
        await this.authenticateUser();
        await this.populateFight();
        await this.getMartialArts();
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
        async populateFight() {
            try {
                this.fighter1 = this.sessionUser

                const opponent = await Api.get('/fighter/' + this.$route.params.id)
                this.fighter2 = opponent.data
            } catch(error) {
                console.error(error)
            }
        },
        async getMartialArts() {
            try {
                const martialArts = await Api.get('/martial-art')
                this.listOfMartialArts = martialArts.data
            } catch(error) {
                console.error(error)
            }
        },
        selectMartialArts(item) {
            if (this.newSelection.some(selected => selected.name === item.name)) {
                // if martial art already exists, remove it
                this.newSelection = this.newSelection.filter(selected => selected.name !== item.name);
            } else {
                // if martial art doesn't already exist, add it
                this.newSelection.push(item);
                
            }
        },
        saveMartialArts() {
            this.selectedMartialArts = this.newSelection
        },
        async createFight() {
            try {
                const martialArts = this.selectedMartialArts.map(item => item.name);

                // fetch existing fight IDs to ensure we generate a unique 5-digit one
                const fightList = await Api.get('/fight') 
                const existingIDs = fightList.data.map(item => item.id)
                let newID
                do {
                    newID = Math.floor(10000 + Math.random() * 9000)
                } while(existingIDs.some(id => id === newID))

                const newFight = {
                    id: newID,
                    date: this.date,
                    location: this.location,
                    weight_class: this.weightClass,
                    martial_art: martialArts,
                    winner: '',
                    fighters: [this.fighter1, this.fighter2.email]
                }

                // make post request to backend API
                await Api.post('/fight', newFight)
                
                // create the relationship with the fighters
                await Api.post(`/fighter/${this.sessionUser}/fight`, newFight);
                await Api.post(`/fighter/${this.fighter2.email}/fight`, newFight);

                alert('Fight created successfully!')

                router.push({
                    name: 'Fight',
                    params: {id: newFight.id}
                })
            } catch(error) {
                console.error(error)
            }
        },
        goToOpponentProfile() {
            router.push({
                name: 'Opponent',
                params: {id: this.$route.params.id}
            })
        }
    },
    computed: {
        isEmpty() {   // method returns true if at least 1 field isn't complete
            return this.date === '' || this.location === '' || this.weightClass === '' || this.selectedMartialArts.length === 0
        }
  }
}
</script>

<style scoped>
.container-padding{
    padding: 20px;
}
.profile-pic-size{
    size: 180px;
    border: none;
}
.button-border{
    border-radius: 10px;
    border: none;
    background-color: #6B0801;
}
.background-color{
    background-color: #6B0801;
}
.text-color{
    color: #FFFF00;
}
.modal-button{
    border-radius: 10px;
    border: none;
    background-color: #B30000;
}
.list-border{
    padding: 5px 8px;
    border: 2px solid #B30000;
    background-color: rgba(255, 255, 255, 0.15) !important;
}
.list-margin{
    margin: 3px;
}
</style>
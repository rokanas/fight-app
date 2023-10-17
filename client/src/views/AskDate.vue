<template>
    <div class="container container-padding">
        <div class="row d-flex flex-row">
            <div class="col-6 d-flex align-items-center justify-content-center">
                <h1 class="text-color">Potential partner:</h1>
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
                </div>
                <div class="row d-flex flex-row mt-1">
                    <div class="col-6">
                        <label for="challengerBox" class="form-label text-color">Date:</label>
                    </div>
                    <div class="col-6">
                        <input
                        id="challengerBox"
                        v-model="date"
                        class="form-control" 
                        type="text"
                        placeholder="e.g. 2023-12-24"
                        >
                    </div>
                </div>
                <div class="row d-flex flex-row mt-1 mb-3">
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
            </div>
        </div>
        <div class="row mt-3">
            <div class="col">
                <button class="btn btn-lg button-border text-color" v-on:click ="createDate" :disabled="isEmpty">Propose date</button>
            </div>
        </div>
    </div>
</template>

<script>
import { Api } from "@/Api";
import router from "../router";

export default {
    name: 'AskDate',

    data() {
        return {
            sessionUser: '',

            fighter1: '',
            fighter2: '',

            date: '',
            location: '',
        }
    },
    mounted: async function() {
        await this.authenticateUser();
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
        async populateDate() {
            try {
                this.fighter1 = this.sessionUser

                const opponent = await Api.get('/fighter/' + this.$route.params.id)
                this.fighter2 = opponent.data
            } catch(error) {
                console.error(error)
            }
        },
        async createDate() {
            try {
                // fetch existing date IDs to ensure we generate a unique 5-digit one
                const dateList = await Api.get('/date') 
                const existingIDs = dateList.data.map(item => item.id)
                let newID
                do {
                    newID = Math.floor(10000 + Math.random() * 9000)
                } while(existingIDs.some(id => id === newID))

                const newDate = {
                    id: newID,
                    date: this.date,
                    location: this.location,
                    fighters: [this.fighter1, this.fighter2.email]
                }

                // make post request to backend API
                Api.post('/date', newDate)

                alert('Date created successfully!')

                router.push({
                    name: 'Date',
                    params: {id: newDate.id}
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
            return this.date === '' || this.location === ''
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
</style>
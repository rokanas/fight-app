<template>
    <div class="contatiner mb-5">
        <div class="row d-flex flex-row flex-wrap mt-3">
            <div class="col-2 col-sm-2 d-flex align-items-center justify-content-end">
                <button type="button" class="bi bi-arrow-left-circle-fill text-color" style="background: none; border: none;" v-on:click ="previousFighter"></button>
            </div>
            <div class="col-8 col-sm-8">
                <div class="row">
                    <div class="col-12">
                        <div class="container-fluid mt-5" id="containerId">
                            <div class="row">
                                <div class="col-xl-4 d-flex flex-column align-items-center">
                                    <div class="col-3 pt-1">
                                        <p class="fs-2 text-color" >{{ fullName }}</p>
                                    </div>
                                    <div class="col-9">
                                        <img
                                        src="../../public/Godzilla.png"
                                        class="img-fluid profile-pic-size background-color img-thumbnail"
                                        alt="Profile picture needed">
                                    </div>

                                </div>
                                <div class="col-xl-8">
                                    <div class="row d-flex flex-row align-items-center mt-1 mb-2">
                                        <div class="col-5 ">
                                            <span class="fs-3 text-color">Fighter Stats</span>
                                        </div>
                                        <div class="col-1 win-style">
                                            <span class="span-center">{{ win }}</span>
                                        </div>
                                        <div class="col-1 loss-style mx-1">
                                            <span class="span-center">{{ loss }}</span>
                                        </div>
                                        <div class="col-1 draw-style">
                                            <span class="span-center">{{ draw }}</span>
                                        </div>
                                        <div class="col-3">
                                            <button class="button-border text-color background-color" v-on:click="goToHistory">Fight / Date History</button>
                                        </div>
                                    </div>
                                    <div class="row d-flex flex-sm-row flex-column justify-content-sm-center">
                                        <div class="col-sm-5 col-12 background-color me-sm-2">
                                            <div class="row">
                                                <div class="col w-100">
                                                    <div class="row flex-row text-color">
                                                        <div class="col-6 align-items-start">
                                                            <p class="flex-fill">Sex:</p>
                                                        </div>
                                                        <div class="col-6">
                                                            <p class="flex-fill">{{ sex }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="row flex-row text-color">
                                                        <div class="col-6">
                                                            <p class="flex-fill">Age:</p>
                                                        </div>
                                                        <div class="col-6">
                                                            <p class="flex-fill">{{ age }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="row flex-row text-color">
                                                        <div class="col-6">
                                                            <p class="flex-fill">Weight:</p>
                                                        </div>
                                                        <div class="col-6">
                                                            <p class="flex-fill">{{ weight }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="row flex-row text-color">
                                                        <div class="col-6">
                                                            <p class="flex-fill">Height:</p>
                                                        </div>
                                                        <div class="col-6">
                                                            <p class="flex-fill">{{ height }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="row flex-row text-color">
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
                                        
                                        <div class="col-sm-6 col-12 background-color mt-sm-0 mt-2">
                                            <div class="row">
                                                <div class="col d-flex flex-wrap w-100">
                                                    <p class="fs-4 flex-wrap flex-fill align-self-top w-100 text-color">Martial Arts:</p>
                                                    <ul v-for="item in selectedMartialArts" class="flex-row flex-wrap list-margin align-items-center justify-content-center list-group">
                                                        <li class="d-inline-flex rounded-pill text-color list-border">{{ item.name }}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-12 d-flex flex-column mb-2">
                                    <div class="col-md-2">
                                        <h3 class="text-color">Bio</h3>
                                    </div>
                                    <div class="col-md-10 w-100 background-color ps-1">
                                        <p class="text-start text-color">{{ bio }}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="row d-flex flex-row-reverse align-self-start mt-2">
                    <div class="col-sm-3 mb-sm-0 mb-2">
                        <button type="button" class="button-border text-color background-color" v-on:click ="challengeOpponent">Challenge to fight</button>
                    </div>
                    <div class="col-sm-3 mb-sm-0 mb-2">
                        <button type="button" class="button-border text-color background-color" v-on:click ="dateOpponent">Ask on date</button>
                    </div>
                </div>
            </div>
            <div class="col-2 col-sm-2 d-flex align-items-center ">
                <button type="button" class="bi bi-arrow-right-circle-fill text-color" style="background: none; border: none;" v-on:click ="nextFighter"></button>
            </div>
        </div>
    </div>
</template>

<script>
import { Api } from "@/Api";
import router from "../router";

export default {
    name: 'ProfileForm',

    data() {
        return {
            sessionUser: '',

            fullName: '',
            sex: '',
            age: '',
            weight: '',
            height: '',
            location: '',
            bio: '',
            win: '0',
            loss: '0',
            draw: '0',
                
            selectedMartialArts: [],
            nearbyFighters: []
        }
    },
    mounted: async function() {
        await this.getSessionUser()
        await this.getNearbyFighters()
        await this.verifyOpponent()
        await this.filterUser()
        await this.populateProfile()
    },
    watch: {
    '$route.params.id': 'populateProfile',
    },
    methods: {
        async getSessionUser() {
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
        async verifyOpponent() {
            try {
                await Api.get('/fighter/' + this.$route.params.id)
            } catch(error) {
                if(error.response && error.response.status === 404) {
                    alert('404: Fighter does not exist!')

                    router.push({ 
                        name: 'Profile', 
                        params: { id: this.sessionUser }
                    })
                } else {
                    console.error(error)
                }
            }
        },
        async populateProfile() {
            try {
                const fighterData = await Api.get('/fighter/' + this.$route.params.id)

                this.fullName = fighterData.data.full_name
                this.sex = fighterData.data.sex
                this.age = fighterData.data.age
                this.weight = fighterData.data.weight + ' kg'
                this.height = fighterData.data.height + ' cm'
                this.location = fighterData.data.location
                this.bio = fighterData.data.bio

                const fighterMartialArts = await Api.get('/fighter/' + this.$route.params.id + '/martial-art')
                this.selectedMartialArts = fighterMartialArts.data

                await this.populateFightRecord()
                    
            } catch (error) {
                console.error(error)
            }
        },
        async populateFightRecord() {
            try {
                const fighterFights = await Api.get('/fighter/' + this.$route.params.id + '/fight')
                
                let wins = 0;
                let losses = 0;

                fighterFights.data.forEach(fight => {
                    if (fight.winner === this.$route.params.id) {
                        wins++;
                    } else if (fight.winner != '') {
                        losses++;
                    }
                });
            this.win = wins
            this.loss = losses
            } catch(error) {
                console.error(error)
            }
        },
        async getNearbyFighters() {
            try {
                const fighterData = await Api.get('/fighter/' + this.sessionUser)
                const location = fighterData.data.location
                const response = await Api.get('/fighter/opponents/' + location)
        
                this.nearbyFighters = response.data.map(fighter => fighter.email)
                this.nearbyFighters = this.nearbyFighters.filter(fighter => fighter !== this.sessionUser) // filter the array so the session User isn't able to browse their own profile
            } catch(error) {
                console.error(error)
            }
        },
        async filterUser() { // ensure user isn't able to browse their own profile
            if(this.sessionUser === this.$route.params.id) {
                const randomIndex = Math.floor(Math.random() * this.nearbyFighters.length)
                router.push({ 
                    name: 'Opponent', 
                    params: { id: this.nearbyFighters[randomIndex] }
                })
            }
        },
        nextFighter() {
            console.log(this.nearbyFighters)
            let newIndex
            const currentIndex = this.nearbyFighters.indexOf(this.$route.params.id)
            if(currentIndex === this.nearbyFighters.length - 1) {
                newIndex = 0
            } else {
                newIndex = currentIndex + 1
            }

            router.push({ name: 'Opponent', params: { id: this.nearbyFighters[newIndex] }})
        },
        previousFighter() {
            let newIndex
            const currentIndex = this.nearbyFighters.indexOf(this.$route.params.id)
            if(currentIndex === 0) {
                newIndex = this.nearbyFighters.length - 1
            } else {
                newIndex = currentIndex - 1
            }

            router.push({ name: 'Opponent', params: { id: this.nearbyFighters[newIndex] }})

        },
        goToHistory() {
            router.push({
                name: 'FightDateHistory',
                params: {id: this.$route.params.id}
            })
        },
        challengeOpponent(){
            router.push({
                name: 'ChallengeFight',
                params: {id: this.$route.params.id}
            })
        },
        dateOpponent(){
            router.push({
                name: 'AskDate',
                params: {id: this.$route.params.id}
            })
        }
    }   
}



</script>

<style scoped>
#containerId {
    background-color: rgba(0, 0, 0, 0.5) !important;
}
.button-border{
    border-radius: 10px;
    border: none;
}
.background-color{
    background-color: #6B0801;
}
.text-color{
    color: #FFFF00;
}

.span-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.button-border{
    border-radius: 10px;
    border: none;
}
.list-border{
    padding: 5px 8px;
    border: 2px solid #B30000;
    background-color: rgba(255, 255, 255, 0.15) !important;
}
.list-margin{
    margin: 3px;
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
.win-style{
    color: white;
    border: 2px solid #108A00;
    border-radius: 10px;
    background-color: rgba(16, 138, 0, 0.5);
}
.loss-style{
    color: white;
    border: 2px solid #C20000;
    border-radius: 10px;
    background-color: rgba(194, 0, 0, 0.5);
}
.draw-style{
    color: white;
    border: 2px solid #0033CC;
    border-radius: 10px;
    background-color: rgba(0, 51, 204, 0.5);
}

</style>
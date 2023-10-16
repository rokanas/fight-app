<template>

    <div class="container">
        <div class="col-md-12 d-flex flex-column align-items-center">
            <div class="col-10">
    <div class="container-fluid mt-5 bg-black">
        <div class="row">
            <div class="col-md-4 d-flex flex-column align-items-center">
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
            <div class="col-md-8">
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
                <div class="row d-flex flex-row justify-content-center">
                    <div class="col-5 background-color me-2">
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
                    
                    <div class="col-6 d-flex flex-wrap background-color">
                        <label class="fs-4 flex-wrap flex-fill align-self-top w-100 text-color" for="martialArtBox">Martial Arts:</label>
                        <ul v-for="item in selectedMartialArts" class="flex-row flex-wrap align-items-center justify-content-center list-group" id="martialArtBox">
                            <li class="d-inline-flex rounded-pill text-color list-border list-margin">{{ item.name }}</li>
                        </ul>
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
            <div class="col-2 mt-1">
                <button class="btn btn-lg button-border text-color" v-on:click ="editProfile">Edit</button>
            </div>
        </div>
    </div>
</template>

<script>
import { Api } from "@/Api";
import router from "../router";

export default {
    name: 'Opponent',

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
                
            selectedMartialArts: []
        }
    },
    mounted: async function() {
        await this.authenticateUser();
        await this.populateProfile();
        await this.populateFightRecord();
    },
    methods: {
        async authenticateUser() {
            try {
                const user = await Api.get('/auth/' + localStorage.getItem('fightAppAccessToken'))
                this.sessionUser = user.data
                if(this.$route.params.id !== user.data) {
                    alert('Unauthorized access')
                    
                    router.push({
                        name: 'Profile',
                        params: {id: this.sessionUser}
                    })
                    }
            } catch(error) {
                console.error(error)
            }
        },
        editProfile() {
            router.push({
                name: 'EditProfile'
            })
        },
        async populateProfile() {
            try {
                const fighterData = await Api.get('/fighter/' + this.sessionUser)

                this.fullName = fighterData.data.full_name
                this.sex = fighterData.data.sex
                this.age = fighterData.data.age
                this.weight = fighterData.data.weight
                this.height = fighterData.data.height
                this.location = fighterData.data.location
                this.bio = fighterData.data.bio

                const fighterMartialArts = await Api.get('/fighter/' + this.sessionUser + '/martial-art')
                this.selectedMartialArts = fighterMartialArts.data
                    
            } catch (error) {
                console.error(error)
            }
        },
        async populateFightRecord() {
            try {
                const fighterFights = await Api.get('/fighter/' + this.sessionUser + '/fight')
                
                let wins = 0;
                let losses = 0;

                fighterFights.data.forEach(fight => {
                    if (fight.winner === this.$route.params.id) {
                        wins++;
                    } else {
                        losses++;
                    }
                });
            this.win = wins
            this.loss = losses
            } catch(error) {
                console.error(error)
            }
        },
        goToHistory() {
            router.push({
                name: 'FightDateHistory',
                params: {id: this.$route.params.id}
            })
        }
    }   
}
</script>

<style scoped>

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
    margin-right: 6px;
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

.button-border{
    border-radius: 10px;
    border: none;
    background-color: #6B0801;
}
.text-color{
    color: #FFFF00;
}
</style>
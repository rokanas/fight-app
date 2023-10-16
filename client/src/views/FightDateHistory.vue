<template>
    <div class="container container-width mt-5 pt-0 px-0">
        <div class="mx-1  container-border">
            <div class = "row justify-content-center">
                <div class ="col">
                <button class="w-50 fights-border btn btn-lg text-color" v-bind:style="{ backgroundColor: fightsButtonColor }" v-on:click ="showFights">Fights</button>
                <button class="w-50 dates-border btn btn-lg text-color" v-bind:style="{ backgroundColor: datesButtonColor }" v-on:click ="showDates">Dates</button>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col d-flex flex-column mt-2" v-if = "isFights">
                    <div class="col w-100">
                        <ul v-for="item in fights" class="justify-content-center pe-4">
                            <button type="button" class="list-items background-color text-color w-75" :id="'fight-' + item.name" v-on:click="goToFight(item)">{{ item.name }} </button>
                            <button type="button" class="bi bi-trash3-fill w-25 list-items background-color text-color" :for="'fight-' + item" v-on:click="deleteOneFight(item.id)"></button>
                        </ul>
                    </div>
                    <div class="col w-100 justify-content-center">
                        <button type="button" class="btn btn-lg button-border background-color text-color mb-2" v-on:click="deleteAllFights">Delete all fights</button>
                    </div>
                </div>
                <div class="co d-flex flex-column mt-2" v-if="isDates">
                    <div class="col w-100">
                        <ul v-for="item in dates" class="justify-content-center pe-4">
                            <button type="button" class="list-items background-color text-color w-75" :id="'date-' + item.name" v-on:click="goToDate(item)">{{ item.name }}</button>
                            <button type="button" class="bi bi-trash3-fill w-25 list-items background-color text-color" :for="'date-' + item" v-on:click="deleteOneDate(item.id)"></button>
                        </ul>
                    </div>
                    <div class="col w-100 justify-content-center">
                        <button type="button" class="btn btn-lg button-border background-color text-color mb-2" v-on:click="deleteAllDates">Delete all dates</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Api } from "@/Api";
import router from "../router";

export default {
    name: 'FightDateHistory',

    data() {
        return {
            sessionUser: '',
            isFights: true,
            isDates: false,

            fightsButtonColor: '#B30000',
            datesButtonColor: '#6B0801',

            fights: [],
            dates: []
        }
    },
    mounted: async function() {
        await this.authenticateUser();
        await this.populateFights()
        await this.populateDates()
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
        showFights() {
            this.isFights = true;
            this.isDates = false;
            this.fightsButtonColor = '#B30000';
            this.datesButtonColor = '#6B0801';
        },
        showDates(){
            this.isFights = false;
            this.isDates = true;
            this.datesButtonColor = '#B30000';
            this.fightsButtonColor = '#6B0801';
        },
        async populateFights() {
            try {
                const response = await Api.get('/fighter/' + this.$route.params.id + '/fight')
                const fightList = response.data

                const formattedFights = await Promise.all(fightList.map(async (fight) => {
                    const fighter1Email = fight.fighters[0];
                    const fighter2Email = fight.fighters[1];

                    // fetch fighter details by email
                    const fighter1Response = await Api.get('/fighter/' + fighter1Email);
                    const fighter2Response = await Api.get('/fighter/' + fighter2Email);

                    const fighter1FullName = fighter1Response.data.full_name;
                    const fighter2FullName = fighter2Response.data.full_name;

                    const fightObject = {
                        id: fight.id,
                        name: fighter1FullName + ' vs. ' + fighter2FullName // Concatenate the fighters' full names with "vs." in the middle
                    }
                    
                    return fightObject
                 }));

                this.fights = formattedFights

            } catch(error) {
                console.error(error)
            }
        },
        async populateDates() {
            try {
                const response = await Api.get('/fighter/' + this.$route.params.id + '/date')
                const dateList = response.data
                console.log(dateList)

                const formattedDates = await Promise.all(dateList.map(async (date) => {
                    const fighter1Email = date.fighters[0];
                    const fighter2Email = date.fighters[1];

                    // fetch fighter details by email
                    const fighter1Response = await Api.get('/fighter/' + fighter1Email);
                    const fighter2Response = await Api.get('/fighter/' + fighter2Email);

                    const fighter1FullName = fighter1Response.data.full_name;
                    const fighter2FullName = fighter2Response.data.full_name;

                    const dateObject = {
                        id: date.id,
                        name: fighter1FullName + ' <3 ' + fighter2FullName // Concatenate the fighters' full names with "<3" in the middle
                    }
                    
                    return dateObject
                 }));

                this.dates = formattedDates

            } catch(error) {
                console.error(error)
            }
        },
        async deleteAllFights() {
            try {
                if(this.sessionUser === this.$route.params.id) {
                    await Api.delete('fighter/' + this.sessionUser + '/fight')
                    await this.populateFights()
                } else {
                    alert(`Cannot delete other fighter's fights!`)
                }
                
            } catch(error) {
                console.error(error)
            }
        },
        async deleteAllDates() {
            try {
                if(this.sessionUser === this.$route.params.id) {
                    await Api.delete('fighter/' + this.sessionUser + '/date')
                    await this.populateDates()
                } else {
                    alert(`Cannot delete other fighter's dates!`)
                }
                
            } catch(error) {
                console.error(error)
            }
        },
        async deleteOneFight(fight) {
            try {
                if(this.sessionUser === this.$route.params.id) {
                    await Api.delete('fighter/' + this.sessionUser + '/fight/' + fight)
                    await this.populateFights()
                } else {
                    alert(`Cannot delete other fighter's fights!`)
                }
            } catch(error) {
                console.error(error)
            }
        },
        async deleteOneDate(date) {
            try {
                if(this.sessionUser === this.$route.params.id) {
                    await Api.delete('fighter/' + this.sessionUser + '/date/' + date)
                    await this.populateDates()
                } else {
                    alert(`Cannot delete other fighter's dates!`)
                }
            } catch(error) {
                console.error(error)
            }
        },
        goToFight(fight) {
            router.push({
                name: 'Fight',
                params: { id: fight.id}
            })
        },
        goToDate(date) {
            router.push({
                name: 'Date',
                params: { id: date.id}
            })
        }
    }
}
</script>

<style scoped>
.container-width{
    width: 100%;
    max-width: 600px;
}
.container-border{
    border-radius: 10px;
    background-color: #B30000;
}
.button-border{
    border-radius: 10px;
    border: none;
}
.list-items{
    border: none;
    background: none;
}
.fights-border{
    border: none;
    border-top-left-radius: 10px;
}

.dates-border{
    border: none;
    border-top-right-radius: 10px;
}

.delete-border{
    border-radius: 10px;
    background-color: #6B0801;
}
.text-color{
    color: #FFFF00;
}
.background-color{
    background-color: #6B0801;
}
</style>
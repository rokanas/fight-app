<template>
    <div class="container-fluid bg-black">
        <form>
            <div class="col-md-12 d-flex flex-column align-items-center">
                <div class="col-10">
                    <div class="row mt-3">
                        <div class="col-md-4 d-flex flex-column align-items-center">
                            <div class="col-3 w-100">
                                <div class="row d-flex flex-row align-items-between">
                                    <div class="col-3 text-wrap">
                                        <label class="text-fill text-color" for="fullnameBox">Full name:</label>
                                    </div>
                                    <div class="col-8">
                                        <input 
                                        type="text"
                                        v-model="fullName"
                                        id="fullnameBox"
                                        class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <img
                                src="../../public/Godzilla.png"
                                class="img-fluid profile-pic-size background-color img-thumbnail mt-3"
                                alt="Profile picture needed"
                                >
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="row mt-1 mb-2">
                                <div class="col-12 w-100">
                                    <p class="fs-3 text-color">Fighter Stats</p>
                                </div>
                            </div>
                            <div class="row d-flex flex-row align-items-center justify-content-center flex-md-row flex-md-wrap">
                                <div class="col-md-5 col-12 background-color d-flex flex-column mb-md-0 mb-2">
                                    <div class="row d-flex flex-row mt-1">
                                        <div class="col-6">
                                            <label for="sexBox" class="form-label text-color">Sex:</label>
                                        </div>
                                        <div class="col-6">
                                            <select 
                                            id="sexBox"
                                            v-model="sex"
                                            class="form-select">
                                                <option value="M">Male</option>
                                                <option value="F">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row d-flex flex-row mt-1">
                                        <div class="col-6">
                                            <label for="ageBox" class="form-label text-color">Age:</label>
                                        </div>
                                        <div class="col-6">
                                            <input
                                            id="ageBox"
                                            v-model="age"
                                            class="form-control" 
                                            type="number"
                                            >
                                        </div>
                                    </div>
                                    <div class="row d-flex flex-row mt-1">
                                        <div class="col-6">
                                            <label for="weightBox" class="form-label text-color">Weight:</label>
                                        </div>
                                        <div class="col-6">
                                            <input 
                                            id="weightBox"
                                            v-model="weight"
                                            type="number"
                                            class="form-control"
                                            >
                                        </div>
                                    </div>
                                    <div class="row d-flex flex-row mt-1">
                                        <div class="col-6">
                                            <label for="heightBox" class="form-label text-color">Height:</label>
                                        </div>
                                        <div class="col-6">
                                            <input 
                                            id="heightBox"
                                            v-model="height"
                                            type="number"
                                            class="form-control"
                                            >
                                        </div>
                                    </div>
                                    <div class="row d-flex flex-row mt-1 mb-1">
                                        <div class="col-6">
                                            <label for="locationBox" class="form-label text-color">Location:</label>
                                        </div>
                                        <div class="col-6">
                                            <input 
                                            id="locationBox"
                                            v-model="location"
                                            type="text"
                                            class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12 d-flex flex-wrap flex-column box-height background-color ms-md-2">
                                    <div class="col-2 col-sm-2 d-flex justify-content-center text-color mb-3 w-100">
                                        <label class="fs-4" for="martialArtBox">Martial Arts:</label>
                                    </div>
                                    <div class="col-10 col-sm-10 d-flex align-items-center flex-wrap w-100">
                                        <ul v-for="item in selectedMartialArts" class="flex-row flex-wrap justify-content-center list-group" id="martialArtBox">
                                        <li class="d-inline-flex rounded-pill text-color list-border list-margin">{{ item.name }}</li>
                                        </ul>
                                        <button type="button" class="d-inline-flex justify-content-center rounded-circle text-color list-border list-margin plus-button-size" data-bs-toggle="modal" data-bs-target="#martialArtsModal">+</button>
                                        <div class="modal fade" id="martialArtsModal" tabindex="-1" aria-labelledby="martialArtsModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                                <div class="modal-content background-color text-color">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">Choose your martial arts:</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                                    </div>
                                                    <div class="modal-body  d-flex flex-row flex-wrap align-items-center justify-content-center">
                                                        <ul class="list-group" v-for="item in listOfMartialArts">
                                                            <li class="list-group-item d-inline-flex rounded-pill text-color list-border list-margin">
                                                                <input class="btn-check" type="checkbox" :id="'checkbox-' + item.name" :checked="isMartialArtSelected(item)" autocomplete="off" v-on:click ="selectMartialArts(item)">
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
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-12 d-flex flex-column mb-2">
                            <div class="col-md-2">
                                <label class="fs-3 text-color" for="bioBox">Bio</label>
                            </div>
                            <div class="col-md-10 w-100 ps-1">
                                <textarea 
                                type="text"
                                v-model="bio"
                                class="form-control"
                                id="bioBox"
                                rows="10">
                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-2 d-flex flex-row justify-content-evenly w-50 mt-1 mb-3">
                    <button class="btn btn-lg button-border text-color" v-on:click ="deleteProfile">Delete profile</button>
                    <button class="btn btn-lg button-border text-color ms-3" v-on:click ="applyProfileChanges">Apply</button>   
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { Api } from "@/Api";
import router from "../router";

export default {
    name: 'ProfileForm',

    data() {
        return {
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
            newSelection: [],
            listOfMartialArts: [],

            imageSrc: '../../public/Godzilla.png' 
        }
    },
    mounted() {
        this.populateProfile()
        this.getMartialArts()

    },
    methods: {
        async populateProfile() {
            try {
                const fighterData = await Api.get('/fighter/' + this.$route.params.id)

                this.fullName = fighterData.data.full_name
                this.sex = fighterData.data.sex
                this.age = fighterData.data.age
                this.weight = fighterData.data.weight
                this.height = fighterData.data.height
                this.location = fighterData.data.location
                this.bio = fighterData.data.bio

                const fighterMartialArts = await Api.get('/fighter/' + this.$route.params.id + '/martial-art')
                this.selectedMartialArts = fighterMartialArts.data
                this.newSelection = this.selectedMartialArts.slice()
                    
            } catch (error) {
                console.error(error)
            }
        },
        async getMartialArts() {
            const martialArts = await Api.get('/martial-art')
            this.listOfMartialArts = martialArts.data
        },
        selectMartialArts(item) {
            if (this.newSelection.some(selected => selected.name === item.name)) {
                // if martial art already exists, remove it
                this.newSelection = this.newSelection.filter(selected => selected.name !== item.name);
            } else {
                // if martial art doesn't already exist, add it
                this.newSelection.push(item);
                
            } console.log(this.newSelection)
        },
        async saveMartialArts() {
            try {
                const toAdd = [];
                const toDelete = [];

                // fetch fighter's list of known martial arts from db
                const knownMartialArts = await Api.get('/fighter/' + this.$route.params.id + '/martial-art/')

                // compare fighter's known arts to the new selection and add to addition queue accordingly
                this.newSelection.forEach(selectedArt => {
                    if(!knownMartialArts.data.some(knownArt => knownArt.name === selectedArt.name)) {
                        toAdd.push(selectedArt)
                    }
                })

                // compare fighter's known arts to the new selection and add to deletion queue accordingly
                knownMartialArts.data.forEach(knownArt => {
                    if (!this.newSelection.some(selectedArt => selectedArt.name === knownArt.name)) {
                        toDelete.push(knownArt)
                    }
                });


                // perform additions to db
                for (var martialArtToAdd of toAdd) {
                    await Api.post('/fighter/' + this.$route.params.id + '/martial-art', martialArtToAdd);
                }

                // perform deletions to db
                for (var martialArtToDelete of toDelete) {
                    await Api.delete('/fighter/' + this.$route.params.id + '/martial-art/' + martialArtToDelete.name);
                }

                // update clientside
                const fighterMartialArts = await Api.get('/fighter/' + this.$route.params.id + '/martial-art')
                this.selectedMartialArts = fighterMartialArts.data

            } catch (error) {
                console.error(error)
            }
        },
        isMartialArtSelected(item) {
            if(this.selectedMartialArts.some(selected => selected.name === item.name)) {
                return true
            } else {    
                return false
            }
        },
        deleteProfile() {  // donn't forget to delete from local storage
            try {
                Api.delete('/fighter/' + this.$route.params.id)
                localStorage.removeItem('fightAppAccessToken')
                router.push({
                    name: 'Login'
                })
            } catch (error) {
                console.error(error)
            }
        },
        async applyProfileChanges() {
            try {
                const newData = {
                email: this.email,
                password: this.password,
                full_name: this.fullName,
                sex: this.sex,
                age: this.age,
                height: this.height,
                weight: this.weight,
                location: this.location,
                bio: this.bio
                }

                // make post request to backend API
                Api.put('/fighter/' + this.$route.params.id, newData)
            
                router.push({
                name: 'Profile'
                })

            } catch(error) {
                console.error(error)
            }
        }
    }
}
</script>

<style scoped>
.plus-button-size{
    height: 35px;
    width: 35px;
    padding: 0;
}
.modal-button{
    border-radius: 10px;
    border: none;
    background-color: #B30000;
}
.button-border{
    border-radius: 10px;
    border: none;
    background-color: #6B0801;
}
.box-height{
    min-height: 212px;
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
</style>
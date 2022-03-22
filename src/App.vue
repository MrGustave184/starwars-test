<template>
<div class="container-fluid h-100">
    <div class="d-flex bg-primary text-white rounded justify-content-center align-items-center p-4 mt-4">
        <h1>Star Wars Movies</h1>
    </div>
    
    <ul v-if="movies" class="d-flex flex-wrap justify-content-around">
        <li v-for="(movie, index) in movies" :key="index" class="card movie-card mt-4">
            <div class="card-header">
                {{ movie.title }}
            </div>
            <div class="card-body">
                <h5 class="card-title">Director: {{ movie.director }}</h5>
                <p class="card-text">Producer: {{ movie.producer }}</p>
            </div>
        </li>
    </ul>

    <div class="d-flex bg-info text-white rounded justify-content-center align-items-center p-4 mt-4">
        <h1>Select a movie to see its Characters</h1>
    </div>
    <select class="mt-1 mb-5 form-control w-60" v-if="movies" name="" id="" v-model="peopleUrl" @change="updateCharacters">
        <option value="" disabled selected>Select your favorite movie</option>
        <option v-for="(movie, index) in movies" :value="movie.url" :key="index">
            {{ movie.title }}
        </option>
    </select>

    <div class="mb-5" id="characters-container">
        <div class="d-flex justify-content-center w-100" role="status">
            <div v-show="getLoadingCharacters" class="spinner-border"></div>
        </div>
        <ul v-show="!getLoadingCharacters" class="d-flex flex-wrap justify-content-around">
            <li class="card movie-card" v-for="(character, index) in getCharacters" :key="index">
                <div class="card-header">
                    {{ character.data.name }}
                </div>
                <div class="card-body">
                    <p class="card-text">Height: {{ character.data.height }}</p>
                    <p class="card-text">Mass: {{ character.data.mass }}</p>
                    <p class="card-text">Hair Color: {{ character.data.hair_color }}</p>
                    <p class="card-text">Skin Color: {{ character.data.skin_color }}</p>
                    <p class="card-text">Eye Color: {{ character.data.eye_color }}</p>
                    <p class="card-text">Birth Year: {{ character.data.birth_year }}</p>
                    <p class="card-text">Gender: {{ character.data.gender }}</p>
                </div>
            </li>
        </ul>
    </div>

    <div class="d-flex bg-dark text-white rounded justify-content-center align-items-center p-4 mt-5">
        <h1>Created By: Rafael Ortiz</h1>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions } from "vuex";
import { basicErrorHandler } from './services/errorHandlers/basicErrorHandler';

export default {
    name: 'starWars',
    data() {
        return {
            movies: null,
            peopleUrl: '',
        }
    },
    methods: {
        ...mapActions(['setCharacters']),
        async getData() {
            /**
             * Added this because the app was slow at times so i needed 
             * to test if it was my code or the swapi api. 
             * I concluded it was the swapi api because in the network tab of the browser the 
             * swapi reponse was slow at times but jsonplaceholder was always fast event when
             * requesting 5000 records
             */
            // const photos = await axios.get('https://jsonplaceholder.typicode.com/photos');
            // console.log(photos.data);

            const response = await axios.get('https://swapi.dev/api/films').catch(basicErrorHandler);
            this.movies = response.data.results;
        },
        async updateCharacters() {
            const response = await axios.get(this.peopleUrl).catch(basicErrorHandler);
            const { characters } = response.data;

            await this.setCharacters(characters);
        }
    },
    async created() {
        await this.getData().catch(basicErrorHandler);
    },
    computed: {
        ...mapGetters(['getCharacters', 'getLoadingCharacters']),
    }
}
</script>

<style>
    @import './assets/styles.css';
</style>

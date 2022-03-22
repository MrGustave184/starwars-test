import axios from "axios";

const state = {
    characters: [],
    loadingCharacters: false
};

const getters = {
    getCharacters(state) { return state.characters },
    getLoadingCharacters(state) { return state.loadingCharacters }
}

const actions = {
    async setCharacters({ commit, state }, characters) {
        state.loadingCharacters = true;
        const promises = [];

        characters.forEach(async (character) => {
            promises.push(axios.get(character));
        });

        Promise.all(promises)
        .then((charaterList) => {
            commit('setCharacters', charaterList)
            state.loadingCharacters = false;
        });
    }
};

const mutations = {
    setCharacters(state, payload) {
        state.characters = payload;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
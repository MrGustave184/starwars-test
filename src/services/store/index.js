import { createStore } from "vuex";
import starWars from './starWars.module';

const store = createStore({
    modules: {
        starWars
    }
});

export { store }
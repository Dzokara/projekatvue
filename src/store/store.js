import Vue from 'vue';
import Vuex from 'vuex';
import users from './modules/users'
import products from './modules/products'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        users: users,
        products:products
      },
});

export default store;
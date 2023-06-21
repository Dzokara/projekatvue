import axios from 'axios';

export default {
  state: {
    searchObj: { keyword: null },
    products: [],
    deletedProducts:[],
    isDataFetched: false,
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
      state.isDataFetched = true;
    },
    changeKeyword(state, keyword) {
      state.searchObj.keyword = keyword;
    },
    updateProduct(state, productObj) {
      var obj = state.products.find(x => x.id == productObj.id)
      obj.name = productObj.name
      obj.price = productObj.price
      obj.img = productObj.img,
      obj.dsc = productObj.dsc
    },
    deleteProduct(state, id) {
      state.deletedProducts.push(id)
    }
  },
  actions: {
    fetchData({ commit, state }) {
      if (!state.isDataFetched) {
        return axios
          .get('https://free-food-menus-api-production.up.railway.app/burgers')
          .then(response => {
            commit('setProducts', response.data.slice(0, 12));
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    changeKeyword({ commit }, keyword) {
      commit('changeKeyword', keyword);
    },
  },
  getters: {
    getProducts: state => state.products,
    products(state) {
      if (state.searchObj.keyword) {
        return state.products.filter(function(p) {
          return p.name.toLowerCase().includes(state.searchObj.keyword.toLowerCase().trim());
        });
      }
      return state.products;
    },
    nonDeletedProducts(state ,getters) {
      return getters.products.filter(x => !state.deletedProducts.includes(x.id))
    }
  },
};

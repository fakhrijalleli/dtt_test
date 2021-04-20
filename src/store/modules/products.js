import axios from 'axios';

const state = {
    products: [],
    productsByCategory: [],
    categoryList: [],
    product: {},
    highPrice: 50
};
const getters = {
    allProducts: state => state.products,
    productsByCategory: state => state.productsByCategory,
    allCategories: state => state.categoryList

};
const baseUrl = 'https://fakestoreapi.com/products';
const actions = {
    //Fetch all products from the api limited to 10
    async fetchProducts({commit}) {
        const response = await axios.get(
            baseUrl
        );
        //Set all return products in the response data to appear in front view
        commit('setProducts', response.data);
    },

    async fetchProductById({commit}, id) {
        const response = await axios.get(
            baseUrl + '/' + id
        );
        //Set the returned products in the response data to appear in front view
        commit('findProductById', response.data);
    },

    async fetchProductsCategoriesList({commit}) {
        const response = await axios.get(
            baseUrl + '/categories'
        );
        //Set the returned categories in the response data to appear in front view
        commit('setCategories', response.data);
    },

    async fetchProductByCategory({commit}, category) {
        const response = await axios.get(
            baseUrl + '/category/' + category
        );
        //Set the returned products By category in the response data to appear in front view
        commit('setproductsByCategory', response.data);
    },


};
const mutations = {
    setProducts: (state, products) => (state.products = products),
    setproductsByCategory: (state, productsByCategory) => (state.productsByCategory = productsByCategory),
    setCategories: (state, categoryList) => (state.categoryList = categoryList),
    setHighPrice(state, event) {
        state.highPrice = event
    },
};

export default {
    state,
    getters,
    actions,
    mutations

};

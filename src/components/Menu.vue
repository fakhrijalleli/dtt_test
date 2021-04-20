<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="logo">
                <img alt="logo" src="../assets/dtt_logo.svg">
            </div>
            <button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                    class="navbar-toggler"
                    data-target="#navbarSupportedContent" data-toggle="collapse" type="button">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link to="/home">
                            <a class="nav-link" href="#">Home</a>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/random">
                            <a class="nav-link" href="#">Random</a>
                        </router-link>
                    </li>
                    <li class="nav-item dropdown" v-show="isHomePage">
                        <a aria-expanded="false" aria-haspopup="true" class="nav-link dropdown-toggle"
                           data-toggle="dropdown"
                           href="#" id="navbarDropdown" role="button">
                            Categories
                        </a>
                        <div aria-labelledby="navbarDropdown" class="dropdown-menu">
                            <a class="dropdown-item"
                               v-on:click="showAll()">all</a>
                            <a :key="category"
                               class="dropdown-item" v-for="category in allCategories"
                               v-on:click="showCategory(category)">{{category}}</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    import {mapActions, mapGetters} from "vuex";
    import {eventHub} from '@/mixin/eventHub'

    Vue.use(VueRouter)

    export default {
        name: 'Menu',
        methods: {
            ...mapActions(["fetchProductsCategoriesList"]),
            // delete the shared product
            deleteSharedItem() {
                this.$store.state.product = null;
            },
            // emit the choosen category to the shared vue instace
            showCategory: function (category) {
                eventHub.$emit('update', category)
            },// if all option is choosen emit all
            showAll: function () {
                eventHub.$emit('update', 'All')
            }
        },
        computed: {
            ...mapGetters(["allCategories"]),
            isHomePage() {
                return this.$route.name === 'home';
            }
        }
        ,
        created() {
            //fetch for products category list
            this.fetchProductsCategoriesList();
        }
        ,
    }
</script>

<style scoped>
    header {
        position: fixed;
        width: 100%;
        z-index: 999999;
    }

    nav {
        padding: 20px 0;
        background: #fff;
        border-bottom: 4px solid #E65540;
    }

    .logo {
        width: 40%;
    }

    .logo img {
        width: 120px;
        height: auto;
    }

    ul li.nav-item {
        width: 100px;
    }

    .navbar-light .navbar-nav .nav-link {
        color: #E65540;
        font-size: 18px;
    }

    .navbar-light .navbar-nav .nav-link:hover,
    .navbar-light .navbar-nav .nav-link:focus {
        border-bottom: 2px solid #E65540;
    }

    header {
        box-shadow: 0 5px 20px 0 rgb(41 48 51 / 10%);
    }

</style>

<template>
    <div class="home_wrapper">
        <div class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-2">
                <div class="sidebar-wrap sort-list">
                    <div class="text-style-dtt">
                        Search by title:
                    </div>
                    <div class="input-global-search">
                        <div class="input-group mb-3">
                            <input aria-describedby="inputGroup-sizing-default" aria-label="Default"
                                   class="form-control" placeholder="search for a product"
                                   type="text" v-model="search"
                                   v-on:input="filterProducts">
                        </div>
                    </div>
                    <div class="text-style-dtt">
                        SORT BY :
                    </div>
                    <ul>
                        <li @click="sort('price')" v-bind:class="[sortBy === 'price' ? sortDirection : '']">
                            Price
                        </li>
                        <li @click="sort('category')" v-bind:class="[sortBy === 'category' ? sortDirection : '']">
                            Category
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-10">
                <div class="product-list">
                    <transition-group name="card" tag="ul" v-if="visibleProducts.length>0">
                        <item :is-detail="false"
                              :key="product.id" :product="product" class="product-card"
                              v-for="product in visibleProducts"></item>
                    </transition-group>
                    <div v-else>
                        No products to show
                    </div>
                    <pagination v-bind:currentPage="currentPage"
                                v-bind:pageSize="pageSize"
                                v-bind:products="allProducts"
                                v-on:page:update="updatePage"
                                v-show="visibleProducts.length>9">
                    </pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import Item from "@/components/Item";
    import Pagination from "../components/Paginator";
    import {eventHub} from '@/mixin/eventHub'

    export default {

        components: {Item, Pagination},
        data() {
            return {
                name: "Home",
                sortBy: '',
                sortDirection: 'asc',
                highPrice: 100,
                currentPage: 0,
                pageSize: 10,
                visibleProducts: [],
                search: '',

            }
        },
        methods: {
            ...mapActions(["fetchProducts", "fetchProductByCategory"]),
            //change the item sort direction
            sort(s) {
                if (s === this.sortBy) {
                    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
                }
                this.sortBy = s;
                this.sortedProducts();
            },
            // sort products in the visible list by choosen criteria
            sortedProducts() {
                return this.visibleProducts.sort((p1, p2) => {
                    let modifier = 1;
                    if (this.sortDirection === 'desc') modifier = -1;
                    if (p1[this.sortBy] < p2[this.sortBy]) return -1 * modifier;
                    if (p1[this.sortBy] > p2[this.sortBy]) return 1 * modifier;
                    return 0;
                });
            },
            //update visible list by choosen page number from the paginator
            updatePage(pageNumber) {
                this.currentPage = pageNumber;
                this.getProductForPagination();
            },
            // return the element to show from all product According
            getProductForPagination() {
                this.visibleProducts = this.allProducts.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize);
            },
            // filter product list according to the title entered
            filterProducts() {
                if (this.search === '') {
                    this.getProductForPagination();
                }
                this.visibleProducts = this.visibleProducts.filter((product) => {
                    return product.title.toLowerCase().match(this.search.toLowerCase());
                })
            },
        },
        computed: {
            ...mapGetters(["allProducts"]),
        },

        async created() {

            await this.fetchProducts();
            this.getProductForPagination();
            // show filtred product list according to the category choosen in the menu
            eventHub.$on('update', data => {
                if (data === 'All') {
                    this.getProductForPagination();
                } else {
                    this.visibleProducts = this.allProducts.filter(product => product.category === data)
                }
            })
        },
    }
</script>

<style scoped>

    .product-card:hover, .product-card:focus {
        cursor: pointer;
        box-shadow: 1px 0rem 14px 0px #eee;
        outline: none;
    }

    .product-card.out-of-stock img {
        opacity: 0.6;
    }

    .asc:after {
        content: "\25B2"

    }

    .desc:after {
        content: "\25BC"
    }

    .sort-list {
        margin-top: 10px;
    }

    .sort-list ul {
        list-style: none;
        padding-left: 0;
    }

    .sort-list ul li {
        border: 1px solid #d7d7d7;
        margin: 10px 0;
        padding: 10px 15px;
        border-radius: 5px;
        text-align: left;
    }

    .text-style-dtt {
        color: #414141;
        font-size: 16px;
        font-weight: bold;
    }

    input.form-control {
        border: 1px solid #d7d7d7;
        margin: 10px 0;
        padding: 20px 15px;
        border-radius: 5px;
        width: auto;
    }

    .input-global-search {
        margin-bottom: 20px;
        width: 100%;
    }


</style>

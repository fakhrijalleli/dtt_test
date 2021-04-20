<template>
    <div>
        <button @click="getRandomItem()" v-if="isRandomizer">Show another Item</button>
        <div class="product_wrapper detail-product">
            <div class="item_image">
                <img :alt="`image of ${product.title}`" :src=product.image>
            </div>
            <div class="item_wrapper">
                <span class="product-title">{{product.title}}</span>
                <span class="product-category">{{product.category}}</span>
                <span class="product-description">{{product.description}}</span>
                <span class="product-price"> {{product.price }}$</span>

            </div>
        </div>
        <div class="product-list" v-if="!isRandomizer">
            <transition-group name="card" tag="ul">
                <li :key="index"
                    class="product-card" v-for="(productElement,index) in products.slice(0, 3)">
                    <item :is-detail="true" :product="productElement" @click="showItem(product)"></item>
                </li>
            </transition-group>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from "vuex";
    import Item from "@/components/Item";

    export default {
        components: {Item},
        name: "Detail",
        data() {
            return {
                product: {}
            }
        },
        computed: {
            ...mapGetters(["allProducts", "productsByCategory"]),
            products() {
                return this.productsByCategory.filter(product => product.id !== this.product.id)
            },
            isRandomizer() {
                return this.$route.name === 'Random';
            }

        },
        created() {
            //if a  product is shared show details page else show random page
            if (this.$store.state.product) {
                this.product = this.$store.state.product;
                this.getProductByCategory(this.product.category);
            } else {
                this.getRandomItem();
            }
        },
        methods: {
            ...mapActions(["fetchProductByCategory"]),
            //fetch prodcuts that have same category us the choosen product
            getProductByCategory(category) {
                this.fetchProductByCategory(category);
                const index = this.productsByCategory.indexOf(this.product, 0);
                this.productsByCategory.splice(index, 1)
            },
            //generates a random product
            getRandomItem() {
                const random = Math.floor(Math.random() * 20);
                this.product = this.allProducts[random];
                this.getProductByCategory(this.product.category)
            },
            showItem(product) {
                this.product = product;
                this.getProductByCategory(product.category)
            }
        },

    }
</script>

<style scoped>
    .product_wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        border: 6px ridge rgba(28, 110, 164, 0.13);
        border-radius: 30px;
        margin-bottom: 30px;
    }

    @media screen and (max-width: 1024px) {
        .product_wrapper {
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            justify-content: flex-start;
            align-items: stretch;
            align-content: stretch;
        }
    }

    .product_wrapper {
        padding: 30px;
    }

    .product_wrapper img {
        max-width: 350px;
    }

    @media screen and (max-width: 1024px) {
        .product_wrapper img {
            width: 215px;
        }
    }

    .product-price {
        font-weight: bold;
    }

    .product-card:hover, .product-card:focus {
        cursor: pointer;
        box-shadow: 1px 0rem 14px 0px #eee;
        outline: none;
    }

    .product-card.out-of-stock img {
        opacity: 0.6;
    }

    .product-title {
        font-size: 22px;
        font-weight: bold;
        text-align: left;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

</style>

<template>
    <div class="item_wrapper">
        <div class="image-article">
            <img :alt="`image of ${product.title}`" :src=product.image>
        </div>
        <div class="descp-article">
            <span class="product-title">{{product.title}}</span>
            <span class="product-category">{{product.category}}</span>
        </div>
        <div class="block-price">
            <span class="product-price"> {{product.price }}$</span>
            <button @click="showDetails(product)" class="btn btn-primary btn-details" type="button"
                    v-show="!isDetailsPage">Show details
            </button>
        </div>
    </div>
</template>

<script>
    import Index from "@/router";

    export default {
        name: "Item",
        props: ['product', 'isDetail'],
        created() {
            this.$store.state.product = null;
        },
        methods: {
            // on click on item go to details page
            showDetails(product) {
                this.$store.state.product = product;
                if (!this.isDetail) {
                    Index.push('detail')
                }
            }
        },
        computed: {
            // return true if detail page
            isDetailsPage() {
                return this.$route.name === 'Detail';
            }
        }
    }
</script>

<style scoped>
    .product-title {
        margin-top: 10px;
        margin-bottom: 5px;
        font-size: 16px;
        font-weight: bold;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .product-price {
        font-weight: bold;
    }

    .product-card.out-of-stock .product-price, .product-card.out-of-stock .product-title {
        opacity: 0.6;
    }

    .descp-article {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        align-content: stretch;
        height: 80px;
    }

    .product-card img {
        margin: auto;
        display: block;
    }

    .btn.btn-primary.btn-details {
        cursor: pointer;
    }
</style>

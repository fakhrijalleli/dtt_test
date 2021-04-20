<template>
    <div>
        <nav aria-label="..." class="d-flex justify-content-center pagination-style">
            <ul class="pagination pagination-sm  col-md-4">
                <li v-show="!showPreviousLink()">
                    <a class="" v-on:click="updatePage(currentPage - 1)">Previous</a>
                </li>

                <div :key="index" v-for="index in totalPages()">

                    <li class="active" v-if="currentPage+1===index">
                        <a v-on:click="updatePage(index-1)">{{index}} <span class="sr-only">(current)</span></a>
                    </li>

                    <li v-else>
                        <a v-on:click="updatePage(index-1)">{{index}}</a>
                    </li>
                </div>

                <li v-show="!showNextLink()">
                    <a v-on:click="updatePage(currentPage + 1)">Next</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'pagination',
        props: ['products', 'currentPage', 'pageSize'],
        data() {
            return {
                next: '>',
                previous: '<'
            }
        },
        methods: {
            //emit page number to the home page
            updatePage(pageNumber) {
                this.$emit('page:update', pageNumber);
            },
            //calculate page number to show in paginator
            totalPages() {
                return Math.ceil(this.products.length / this.pageSize);
            },
            // return true if current page is first one
            showPreviousLink() {
                return this.currentPage == 0;
            },
            // return true if current page is last one
            showNextLink() {
                return this.currentPage == (this.totalPages() - 1);
            }
        }
    }
</script>

<style scoped>


    .pagination-style {
        margin-top: 50px;
    }

    .pagination-style ul {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        padding: 0;
        grid-gap: 10px;
    }

    li {
        -moz-border-radius: 40px 40px 40px 40px;
        -webkit-border-radius: 40px;
        border-radius: 40px 40px 40px 40px;
        -moz-box-shadow: 1px 2px 4px #f3f3f3;
        -webkit-box-shadow: 1px 2px 4px #f3f3f3;
        box-shadow: 1px 2px 4px #f3f3f3; /* Opera 10.5, IE 9 */
        border: 1px solid #E65540;
        color: #E65540;
        display: inline-block;
        font-family: verdana;
        font-size: 11px;
        font-weight: bold;
        margin: 0 0 20px 17px;
        padding: 3px 5px;
    }

    li:hover {
        cursor: pointer;
        color: #222;
    }

    li.active {
        color: #708296;
        border-color: lightgrey;
        text-shadow: 1px 1px 2px #FFFFFF;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

</style>

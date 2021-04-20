<template>
    <div id="app">
        <Menu/>
        <div class="content-wrapper">
            <router-view/>
        </div>
        <Footer/>
    </div>
</template>
<script>

    import Menu from "@/components/Menu";
    import Footer from "@/components/Footer";

    export default {
        name: 'App',
        components: {
            Menu, Footer
        },
        data: () => ({})
    }
</script>

<style>
    @import './assets/styles.css';

</style>

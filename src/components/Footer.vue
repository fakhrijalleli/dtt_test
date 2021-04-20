<template>
    <footer>
        <section class="bloc-top">
            <div class="container-footer">
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-4 bloc1">
                        <h4>
                            <span>DTT</span><span>SHOP</span>
                        </h4>
                        <p>
                            This app is created for the dtt frontend test
                        </p>
                    </div>
                    <div class="col-md-8 col-12">
                        <div class="row">
                            <div class="col-12 col-sm-6 col-md-4 bloc2">
                                <h4 class="color-orange-style">GET AROUND</h4>
                                <li>
                                    <router-link to='/home'>HOME</router-link>
                                </li>
                                <li>
                                    <router-link to='/random'>RANDOM</router-link>
                                </li>
                            </div>

                            <div class="col-12 col-sm-6 col-md-8 bloc4">
                                <h4 class="color-orange-style">CONTACTS</h4>
                                <a href="https://www.linkedin.com/in/fakhreddine-jalleli/" target="_blank">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="bloc-botton">
            <div>
                Mentions légales | Privacy Policy
            </div>
            <div>
                Created by Fakhreddine <a href="https://github.com/" target="_blank">Repo</a>. Tous droits réservés.
            </div>
        </section>
    </footer>

</template>

<script>
    export default {
        name: "footer",
    }
</script>

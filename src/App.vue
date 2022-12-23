<template>
    <Navbar/>
    <main class="container pt-4">
        <router-view/>
    </main>
</template>

<script>
    import Navbar from './components/Navbar';
    export default {
        components: {
            Navbar
        }
    }
</script>

<style lang="scss">
    @import '~bootstrap/dist/css/bootstrap.min.css';
    @import './assets/scss/style.scss';
</style>

<template>
    <header>
        <div class="navbar" ref="navbar">
            <div class="container">
                <div class="brand">
                    <h1 class="m-0 p-0">
                        <a href="/">
                            <img src="@/assets/imgs/logos/gohlong-logo.png" alt="logo" width="200px" />
                        </a>
                    </h1>
                </div>
                <div class="nav-links d-lg-block d-none">
                    <ul class="m-0 p-0">
                        <li>
                            <a href="#home">Home</a>
                        </li>
                        <li>
                            <a href="#services">Services</a>
                        </li>
                        <li>
                            <a href="#brands">Brands</a>
                        </li>
                        <li>
                            <a href="#updates">Updates</a>
                        </li>
                        <li>
                            <a href="#gallery">Gallery</a>
                        </li>
                        <li>
                            <a href="#contact">Contact Us</a>
                        </li>
                    </ul>
                </div>
                <div class="hamburger d-lg-none" v-on:click="toggleHamburger()" v-bind="hamburger">
                    <i class="fa fa-bars fa-lg"></i>
                </div>
                <div class="fullscreen-nav d-lg-none" ref="fullscreenNav" v-on:click="toggleHamburger()">
                    <ul v-bind:class="navLinks">
                        <li>
                            <a href="#home">Home</a>
                        </li>
                        <li>
                            <a href="#services">Services</a>
                        </li>
                        <li>
                            <a href="#brands">Brands</a>
                        </li>
                        <li>
                            <a href="#updates">Updates</a>
                        </li>
                        <li>
                            <a href="#gallery">Gallery</a>
                        </li>
                        <li>
                            <a href="#contact">Contact Us</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- <div style="margin-bottom: 1000px;">
         
        </div>
        <p id="services">asd</p> -->
    </header>
</template>

<script setup>
    import { useRouter } from "vue-router";
    import { ref, watchEffect } from "vue";

    const router = useRouter();

    /* const homeRouter = createRouter({
        scrollBehavior(to, from, savedPosition) {
            if (to.hash) {
                return {
                    el: to.hash,
                    behavior: "smooth",
                };
            }
        },
    }); */

    const hamburger = ref({
        isOpen: false,
    });

    const toggleHamburger = () => {
        hamburger.value.isOpen = !hamburger.value.isOpen;
        if (hamburger.value.isOpen) {
            openFullscreenNav();
        } else {
            closeFullscreenNav();
        }
    };

    const fullscreenNav = ref();
    
    const navLinks = ref({
        "d-lg-block": false,
        "d-none": true,
    });

    const openFullscreenNav = () => {
        watchEffect(() => {
            navLinks.value = {
                "d-lg-block": true,
                "d-none": false,
            };
            fullscreenNav.value.style.transform = "translateY(0%)";
        })
    }
    const closeFullscreenNav = () => {
        watchEffect(() => {
            navLinks.value = {
                "d-lg-block": false,
                "d-none": true,
            };
            fullscreenNav.value.style.transform = "translateY(-100%)";
        })
    }

    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 0) {
            closeFullscreenNav();
        } else {
            hamburger.value.isOpen == true ? openFullscreenNav() :
            closeFullscreenNav();
        }
    });

    /* fixed to top navbar when scroll down */
    const navbar = ref();

    window.addEventListener("scroll", () => {
        watchEffect(() => {
            if (window.pageYOffset > 0) {
                navbar.value.style.position = "fixed";
                navbar.value.style.top = "0";
                navbar.value.style.left = "0";
                navbar.value.style.right = "0";
                navbar.value.style.zIndex = "100";
                navbar.value.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.1)";
                navbar.value.style.transition = "all 0.3s ease-in-out";
    
            } else {
                navbar.value.style.position = "relative";
                navbar.value.style.boxShadow = "none";
            }
        });
    });
   
    
    const login = () => {
        router.push("/login");
    };
</script>

<style scoped>

    .navbar {
        background-color: #ffffff;
        padding: 10px;
        margin: 0;
    }

    .navbar .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .navbar .nav-links ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .navbar .nav-links ul li {
        list-style: none;
        margin: 0 20px;
    }

    .navbar .nav-links ul li a {
        text-decoration: none;
        color: #000000;
        font-weight: 600;
    }

    .navbar .nav-links ul li a:hover {
        color: #ff5e14;
        transition: 0.3s ease-in-out;
    }

    .navbar .nav-links ul li a.active {
        color: #ff5e14;
    }

    .navbar .nav-links ul li a.active::after {
        content: "";
        display: block;
        width: 100%;
        height: 2px;
        background-color: #ff5e14;
    }

    .navbar .nav-links ul li a.active::before {
        content: "";
        display: block;
        width: 100%;
        height: 2px;
        background-color: #ff5e14;
    }

    .navbar .nav-links ul li a::after {
        content: "";
        display: block;
        width: 100%;
        height: 2px;
        background-color: #ff5e14;
        transform: scaleX(0);
        transition: transform 0.3s ease-in-out;
    }

    .navbar .nav-links ul li a:hover::after {
        transform: scaleX(1);
    }

    .navbar .nav-links ul li a::before {
        content: "";
        display: block;
        width: 100%;
        height: 2px;
        background-color: #ff5e14;
        transform: scaleX(0);
        transition: transform 0.3s ease-in-out;
    }

    .navbar .brand {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .hamburger {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .hamburger i {
        color: #000000;
    }

    .hamburger i:hover {
        color: #ff5e14;
        transition: 0.3s ease-in-out;
    }
    
    .fullscreen-nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #0a0a0acc;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 1000;
        padding: 0 50px;
        transform: translateY(-100%);
        transition: transform 0.2s ease-in-out;
    }

    .fullscreen-nav ul {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .fullscreen-nav ul li {
        list-style: none;
        margin: 20px 0;
    }

    .fullscreen-nav ul li a {
        text-decoration: none;
        color: #c5c5c5;
        font-weight: 600;
    }

    .fullscreen-nav ul li a:hover {
        color: #ff5e14;
        transition: 0.3s ease-in-out;
    }

    .fullscreen-nav ul li a.active {
        color: #ff5e14;
    }

    .fullscreen-nav ul li a.active::after {
        content: "";
        display: block;
        width: 100%;
        height: 2px;
        background-color: #ff5e14;
    }

    .fullscreen-nav ul li a.active::before {
        content: "";
        display: block;
        width: 100%;
        height: 2px;
        background-color: #ff5e14;
    }

    .fullscreen-nav ul li a::after {
        content: "";
        display: block;
        width: 100%;
        height: 2px;
        background-color: #ff5e14;
        transform: scaleX(0);
        transition: transform 0.3s ease-in-out;
    }

    .fullscreen-nav ul li a:hover::after {
        transform: scaleX(1);
    }

    .fullscreen-nav ul li a::before {
        content: "";
        display: block;
        width: 100%;
        height: 2px;
        background-color: #ff5e14;
        transform: scaleX(0);
        transition: transform 0.3s ease-in-out;
    }

</style>
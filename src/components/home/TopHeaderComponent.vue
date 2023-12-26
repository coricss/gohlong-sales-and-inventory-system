<template>
<!-- create top header -->
<div id="home"></div>
    <div class="top-header d-lg-block d-none">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="header-contact d-flex align-items-center">
                        <ul class="m-0 p-0 float-left">
                            <li>
                                <i class="fa fa-phone"></i> +63 927 021 1061
                            </li>
                            <li>
                                <i class="fa fa-clock"></i> Everyday 7:30 am - 5:00 pm
                            </li>
                            <li>
                                <i class="fa fa-envelope"></i>
                                <a href="mailto:" target="_blank">
                                    gohlong.tire@yahoo.com
                                </a>
                            </li>
                        </ul>
                        <div class="ml-auto">
                        <!-- <button class="btn btn-outline-primary mr-1 btn-login font-weight" @click="login()" data-toggle="modal" data-target="#"><strong>Log in</strong></button> -->
                       <!--  <button class="btn btn-primary ml-auto btn-get-quote font-weight" data-toggle="modal" data-target="#"><strong>Get a Quote</strong></button> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>  
 </template>

<script setup>
    import { useRouter } from "vue-router";
    
    const router = useRouter();

    const login = () => {
        router.push("/login");
    };
</script>

<style>
    .top-header {
        background: #f7f7f7;
    }
    .top-header .header-contact ul li {
        display: inline-block;
        margin-right: 20px;
        font-size: 14px;
        color: #333;
    }
    .top-header .header-contact ul li i {
        margin-right: 5px;
        color: #ff5e14;
    }
    .top-header .header-contact ul li:last-child {
        margin-right: 0;
    }
    .top-header .header-contact ul li a {
        color: #333;
    }
    .top-header .header-contact ul li a:hover {
        color: #ff5e14;
    }

    .btn-login {
        border-radius: 0%;
        outline: none !important;
        border: none !important;
        background-color: none !important;
        background: transparent !important;
    }

    .btn-login:hover, .btn-login:focus, .btn-login:active {
        background: transparent !important;
        color: #0066ff !important;
    }

    .btn-get-quote {
        border-radius: 0%;
    }
</style>
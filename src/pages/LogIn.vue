<template>
    <div class="login-page">
    <!-- LOGIN CONTENT -->
        <div class="login-box">
            <div class="card">
                <div class="card-header text-center">
                    <img src="@/assets/imgs/logos/gohlong-logo.png" class="img-fluid rounded-top w-75 p-3" alt=""/> <br><br>
                    <h3><b>Sales and Inventory Management System</b></h3>
                </div>
                <div class="card-body">
                    <p class="login-box-msg">Log in to start your session</p>
                    <form method="POST" @submit.prevent="login">
                        <div class="input-group mb-3">
                            <input type="email" v-model="form.email" class="form-control" name="txt_email" id="txt_email" placeholder="Email" required>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" v-model="form.password" class="form-control" name="txt_userpassword" id="txt_userpassword" placeholder="Password" required>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <button class="btn btn-primary btn-block">Log In</button>
                            </div>
                        </div>
                    </form>
                    <!-- <p class="mb-1 mt-3">
                        <a href="" data-toggle="modal" data-target="#forgotPassword">Forgot password?</a>
                    </p> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import { useAuthStore } from "@/store/auth.js";

    const authStore = useAuthStore();

    const form = ref({
        email: "",
        password: "",
    });

    const login = () => {
        authStore.handleLogin(form.value);
    };
</script>

<style scoped>
    .login-page {
        background-image: linear-gradient(#a36f3fad, #c47124d8, #f87305);
        color: #000;
        overflow-x: hidden !important;
        overflow-y: hidden !important;
    }

</style>
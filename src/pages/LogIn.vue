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
                    <div class="input-group mb-3">
                        <input type="text" v-model="username" class="form-control" name="txt_userid" id="txt_userid" placeholder="User ID or Username" required>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-user"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" v-model="password" class="form-control" name="txt_userpassword" id="txt_userpassword" placeholder="Password" required>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="row">
                        <div class="icheck-primary ml-auto">
                        <input type="checkbox" id="remember">
                        <label for="remember">
                            Remember Me
                        </label>
                        </div>
                    </div> -->
                    <div class="row">
                        <div class="col-12">
                            <button @click="login()" class="btn btn-primary btn-block">Log In</button>
                        </div>
                    </div>
                
                    <p class="mb-1 mt-3">
                        <a href="" data-toggle="modal" data-target="#forgotPassword">Forgot password?</a>
                    </p>
                    <!-- <p class="mb-0">
                    <a href="register.html" class="text-center">Register a new membership</a>
                    </p> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

    import { useToast } from "vue-toastification";
    const toast = useToast();

    import { ref } from "vue";
    import { useRouter } from "vue-router";

    const router = useRouter();
    const username = ref("");
    const password = ref("");

    const login = () => {
        if (username.value === "admin" && password.value === "admin") {
            router.push("/dashboard");
            loadToast("Welcome Admin", "success");
        } else {
            loadToast("Invalid username or password", "error");
        }
    };

    const loadToast = (message, type) => {
      toast(message, {
          timeout: 2000,
          type: type,
          position: 'top-right',
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          newestOnTop: true,
          draggable: true,
          draggablePercent: 0.6,
          dangerouslyHTMLString: true,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: false,
          icon: true,
          rtl: false,
          theme: 'colored',
          transition: 'bounce'
      });
    };

    
</script>

<style scoped>
    .login-page{
        background-image: linear-gradient(#a36f3fad, #c47124d8, #f87305);
        color: #000;
        overflow-x: hidden !important;
    }

</style>
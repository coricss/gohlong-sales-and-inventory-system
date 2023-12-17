<template>
    <div>
        <Dialog 
          v-model:visible="is_new_user"
          :modal="is_new_user" 
          :draggable="false"
          :closable="false"
          :style="{ width: '20vw' }"
        >
          <template #header>
              <div class="text-center">
                  <h4 class="m-0 font-weight-bold">Change Password</h4>
              </div>
          </template>
          <div class="row">
            <div class="col-12 my-2">
              <InputText 
                v-model="password_form.old_password" 
                :type="show_password ? 'text' : 'password'"
                placeholder="Enter current password" 
                class="form-control" 
                style="width: 100%"
              />
            </div>
            <div class="col-12 my-2">
              <!-- <InputText 
                v-model="password_form.new_password" 
                :type="show_password ? 'text' : 'password'"
                placeholder="Enter new password" 
                class="form-control" 
                style="width: 100%"
              />
              <passwordMeter 
                  :password="password_form.new_password" :show="true" 
                  @score="onScore"
              /> -->
                <Password 
                  v-model="password_form.new_password"
                  class="w-100"
                  inputId="reset_password"
                  :pt="{
                      input: {
                          type: show_password ? 'text' : 'password',
                          placeholder: 'New Password',
                          class: 'form-control',
                          required: true,
                         /* type event */
                         onInput: getStrengthPassword
                      },
                      info: {
                          class: 'text-muted',
                          style: 'font-size: 0.8rem'
                      }
                  }"
              >
                  <template #header>
                      <h6>Pick a password</h6>
                  </template>
                  <template #footer>
                      <Divider />
                      <p class="mt-2">Suggestions</p>
                      <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                          <li>At least one lowercase</li>
                          <li>At least one uppercase</li>
                          <li>At least one numeric</li>
                          <li>Minimum 8 characters</li>
                      </ul>
                  </template>
              </Password>
            </div>
            <div class="col-12 my-2">
              <InputText 
                v-model="password_form.confirm_password" 
                :type="show_password ? 'text' : 'password'"
                placeholder="Confirm new password" 
                class="form-control" 
                style="width: 100%"
              />
              <div class="custom-control custom-checkbox float-right mt-2">
                  <input class="custom-control-input" type="checkbox" id="show_password" value="option1" @click="show_password=!show_password" style="cursor: pointer">
                  <label for="show_password" class="custom-control-label text-muted">Show Password</label>
              </div>
            </div>
            <div class="col-12 mt-1">
              <Button 
                size="large"
                icon ="pi pi-key"
                class="w-100 rounded"
                @click="submitCreatePassword"
              >
                <i class="pi pi-key mr-2"></i>
                Create new password
              </Button>
            </div>
          </div>
      </Dialog>
      <!-- Main Sidebar Container -->
      <aside class="main-sidebar sidebar-light-success elevation-1">
        <!-- Brand Logo -->
        <router-link to="/dashboard" class="brand-link logo-switch d-flex justify-content-center align-items-center">
          <!-- <img src="@/assets/imgs/logos/gohlong-logo.png" alt="Company Logo" class="brand-image elevation-0" style="opacity: .8; margin-top: px;"> -->
          <img src="@/assets/imgs/logos/gohlong-logo.png" alt="Company Logo" class="brand-image-xs logo-xl elevation-0 mx-5" style="opacity: 1; margin-top: 0px;">
          <img src="@/assets/imgs/logos/gohlong-logo-small.png" alt="Company Logo" class="brand-image-xl logo-xs elevation-0" style="opacity: 1; margin-top: 0px; width: 40px;">
        </router-link>
  
        <!-- Sidebar -->
        <div class="sidebar">
          <!-- Sidebar user panel (optional) -->
          <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
              <img 
                :src="picture != null ? api_url+'storage/images/'+picture : (user.picture != null ? api_url+'storage/images/'+user.picture : 'http://localhost:3000/src/assets/imgs/users/default-150x150.png')"
                class="img-circle elevation-0" 
                :alt="picture" 
                style="width: 35px; height: 35px"
              >
            </div>
            <div class="info nav-link">
              <router-link to="/profile" v-if="user" class="d-block profile_name">{{ username == 'User name' ? user.name : username }}</router-link>
            </div>
          </div>
  
          <!-- Sidebar Menu -->
          <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar nav-collapse-hide-child nav-child-indent flex-column" data-widget="treeview" role="menu">
              <!-- Add icons to the links using the .nav-icon class
                  with font-awesome or any other icon font library -->
              <li class="nav-item">
                <router-link class="nav-link default" to="/dashboard">
                  <i class="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Dashboard
                  </p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/user-management" v-if="user.role === 'admin' || user.role === 'super_admin'">
                  <i class="nav-icon fas fa-users"></i>
                  <p>
                    User Management
                  </p>
                </router-link>
              </li>
              <li class="nav-item" 
                id="inventory_menu"
                :class="{'menu-open': $route.path.includes('/inventory') || is_inventory_open}"
                v-if="user.role === 'admin' || user.role === 'super_admin'"
              >
                <a style="cursor: pointer;" class="inventory nav-link" :class="{'active': $route.path.includes('/inventory')}">
                  <i class="nav-icon fas fa-boxes"></i>
                  <p>
                    Inventory
                    <i class="right fas fa-angle-left"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview" style="padding-left: 1rem">
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/inventory/categories" :class="{'active': $route.path.includes('/inventory/categories')}">
                      <i class="fas fa-shapes mx-2"></i>
                      <p>Categories</p>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/inventory/brands" :class="{'active': $route.path.includes('/inventory/brands')}">
                      <i class="fas fa-tags mx-2"></i>
                      <p>Brands</p>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/inventory/products" :class="{'active': $route.path.includes('/inventory/products')}">
                      <i class="fas fa-box-open mx-2"></i>
                      <p>Products</p>
                    </router-link>
                  </li>
                </ul>
              </li>
              <li class="nav-item" v-if="user.role === 'user' || user.role === 'super_admin'">
                <router-link class="nav-link" to="/point-of-sales">
                  <i class="nav-icon fas fa-shopping-cart"></i>
                  <p>
                    Point of Sales
                  </p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/sales">
                  <i class="nav-icon fas fa-cash-register"></i>
                  <p>
                    Sales
                  </p>
                </router-link>
              </li>
              <li class="nav-item" v-if="user.role !== 'user'">
                <router-link class="nav-link" to="/logs">
                  <i class="nav-icon fas fa-clock"></i>
                  <p>
                    Logs
                  </p>
                </router-link>
              </li>
              <!-- <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="nav-icon fas fa-th"></i>
                  <p>
                    Simple Link
                    <span class="right badge badge-danger">New</span>
                  </p>
                </a>
              </li> -->
              <!-- 'src/assets/imgs/users/default-150x150.png' -->
            </ul>
          </nav>
          <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
      </aside>
      <div id="sidebar-overlay" @click="closeSidebarOverlay()" class="sidebar-overlay"></div>
    </div>
</template>
  
<script setup>

    import { 
      ref,
      onMounted,
      watch
    } from "vue";
    import { useToast } from "vue-toastification";
    import { useProfileManagementStore } from "@/store/profile-management.js";
    import passwordMeter from "vue-simple-password-meter";

    const is_inventory_open = ref(false);
    const user = ref(JSON.parse(sessionStorage.getItem("user")));
    const password_form = ref({
        old_password: "",
        new_password: "",
        confirm_password: "",
    });

    const api_url = import.meta.env.VITE_LARAVEL_API_URL;
    const has_picture = ref(false);
    const is_new_user = ref(null);
    const show_password = ref(false);
    const strength = ref(null);

    const toast = useToast();
    const profileStore = useProfileManagementStore();

    /* const onScore = (score) => {
        strength.value = score.strength;
    } */

    const getStrengthPassword = () => {
        const password = document.getElementById('reset_password');
        password.addEventListener('keyup', () => {
            const passwordLabel = document.querySelector('.p-password-info').innerHTML;
            strength.value = passwordLabel;
        });
    }

    const loadProfileData = () => {
        profileStore.getProfileData();
        user.value = JSON.parse(sessionStorage.getItem("user"));
    }

    const submitCreatePassword = (e) => {
      if(password_form.value.old_password === "" || password_form.value.new_password === "" || password_form.value.confirm_password === "") {
          loadToast("Please fill up all fields!", "error");
      } else if(password_form.value.new_password !== password_form.value.confirm_password) {
          loadToast("New password and confirm password does not match!", "error");
      } else {
        /* if((strength.value !== 'risky') && (strength.value !== 'guessable') && (strength.value !== 'weak')) { */
        if((strength.value !== 'Weak') && (strength.value !== 'Medium')) {
            profileStore.changePassword(password_form.value).then((response) => {
                if(response.status == 200){
                    loadToast(response.message, "success");
                    password_form.value = {
                        old_password: "",
                        new_password: "",
                        confirm_password: ""
                    };
                    loadProfileData();
                    is_new_user.value = false;
                } else {
                    loadToast(response.message, "error");
                }
            
            }).catch((error) => {
                loadToast(error.message, "error");
            });
        } else {
            loadToast("Password is not strong enough!", "error");
        }
      }
    }

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

    defineProps({
        username: {
            type: String,
            default: 'User name'
        },
        picture: {
            type: String,
            default: null
        }
    });

    const closeSidebarOverlay = () => {
        document.body.classList.remove('sidebar-open');
        document.body.classList.add('sidebar-collapse');
    }

    onMounted(() => {
      /* getStrengthPassword(); */
      /* loadProfileData(); */
      user.value = JSON.parse(sessionStorage.getItem("user"));
      user.value.picture === null ? has_picture.value = false : has_picture.value = true;
      user.value.is_new_user === 1 ? is_new_user.value = true : is_new_user.value = false;

      if(user.value.role !== 'user') {
        document.getElementById("inventory_menu").addEventListener("click", function(){
          is_inventory_open.value = !is_inventory_open.value;
        });
      }
    });

</script>

<style scoped>
    .router-link-active.nav-link, .inventory.active{
        background-image: var(--gradient-orange);
        color: #ececec !important;
    }

    a.router-link-active.nav-link.sub-link{
        background-image: linear-gradient(to bottom right, #ff822f62, #ff660057 80%, #ff741867) !important;
        color: #212529 !important;
    }

    .router-link-active.router-link-exact-active.profile_name{
        font-weight: bold;
        color: #ff7418;
    }

    .router-link-active.router-link-exact-active.profile_name:hover{
        color: #ff7418;
    }

</style>  
<template>
    <div>
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
                :src="picture != null ? api_url+'images/'+picture : (user.picture != null ? api_url+'images/'+user.picture : 'src/assets/imgs/users/default-150x150.png')"
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
                <router-link class="nav-link" to="/user-management">
                  <i class="nav-icon fas fa-users"></i>
                  <p>
                    User Management
                  </p>
                </router-link>
              </li>
              <li class="nav-item" :class="{'menu-open': $route.path.includes('/inventory')}">
                <a href="#" class="inventory nav-link" :class="{'active': $route.path.includes('/inventory')}">
                  <i class="nav-icon fas fa-boxes"></i>
                  <p>
                    Inventory
                    <i class="right fas fa-angle-left"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview" style="padding-left: 1rem">
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/inventory/products" :class="{'active': $route.path.includes('/inventory/products')}">
                      <i class="fas fa-box-open mx-2"></i>
                      <p>Products</p>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/inventory/categories">
                      <i class="fas fa-shapes mx-2"></i>
                      <p>Categories</p>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link sub-link" to="/inventory/brands">
                      <i class="fas fa-tags mx-2"></i>
                      <p>Brands</p>
                    </router-link>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/point-of-sales">
                  <i class="nav-icon fas fa-shopping-cart"></i>
                  <p>
                    Point of Sales
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

    const user = ref(JSON.parse(sessionStorage.getItem("user")));
    /* const user = ref(null); */
    const api_url = import.meta.env.VITE_LARAVEL_API_URL;
    const has_picture = ref(false);

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
       user.value = JSON.parse(sessionStorage.getItem("user"));
       user.value.picture === null ? has_picture.value = false : has_picture.value = true;
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
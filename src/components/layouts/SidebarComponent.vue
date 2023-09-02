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
              <img v-if="user" :src="api_url+'/images/'+user.picture" class="img-circle elevation-0" alt="User Image">
              <img v-else src="@/assets/imgs/users/default-150x150.png" class="img-circle elevation-0" alt="User Image">
            </div>
            <div class="info nav-link">
              <router-link to="/profile" v-if="user" class="d-block">{{ user.name }}</router-link>
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
              <!-- <li class="nav-item menu-open">
                <a href="#" class="nav-link active">
                  <i class="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Starter Pages
                    <i class="right fas fa-angle-left"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a href="#" class="nav-link active">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Active Page</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="#" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Inactive Page</p>
                    </a>
                  </li>
                </ul>
              </li> -->
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="nav-icon fas fa-th"></i>
                  <p>
                    Simple Link
                    <span class="right badge badge-danger">New</span>
                  </p>
                </a>
              </li>
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
      onMounted
    } from "vue";

    const user = ref(null);
    const api_url = ref(null);

    const closeSidebarOverlay = () => {
        document.body.classList.remove('sidebar-open');
        document.body.classList.add('sidebar-collapse');
    }

    onMounted(() => {
       user.value = JSON.parse(sessionStorage.getItem("user"));
       api_url.value = import.meta.env.VITE_LARAVEL_API_URL;
    });

</script>

<style>
    .router-link-active.nav-link{
        background-image: var(--gradient-orange);
        color: #ececec !important;
    }
</style>  
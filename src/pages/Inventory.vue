<template>
    <div class="content-wrapper" style="min-height: 1599.06px;">
      <!--   <Toast /> -->
        <HeaderComponent/>
        <SidebarComponent/>
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="text-dark"><i class="nav-icon fas fa-boxes"></i> Inventory Management</h1>
                        </div>
                        <!-- <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item"><a href="#">Layout</a></li>
                        <li class="breadcrumb-item active">Fixed Footer Layout</li>
                        </ol>
                        </div> -->
                    </div>
                </div>
            </section>
            <section class="content">
                <div class="container-fluid">
                    <ProductsTable/>
                </div>
            </section>
        <FooterComponent/>
    </div>
</template>

<script setup>
    import HeaderComponent from "@/components/layouts/HeaderComponent.vue";
    import SidebarComponent from "@/components/layouts/SidebarComponent.vue";
    import FooterComponent from "@/components/layouts/FooterComponent.vue";
    import ProductsTable from "@/components/inventory-tables/ProductsTable.vue";
    import { 
        ref,
        onMounted
    } from "vue";
</script>

<style scoped>

li.p-tabview-header.p-highlight a.p-tabview-nav-link.p-tabview-header-action {
    border-bottom: 2px solid #ff6600 !important;
}

li.p-tabview-header a span, li.p-tabview-header a i{
    color: #3d3d3d;
}

li.p-tabview-header.p-highlight a span, li.p-tabview-header.p-highlight a i{
    color: #ff6600;
}

li.p-tabview-header a:hover span, li.p-tabview-header a:hover i{
    color: #ff6600;
}


</style>
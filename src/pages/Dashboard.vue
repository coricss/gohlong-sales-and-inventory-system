<template>
    <div class="content-wrapper" style="min-height: 1599.06px;">
        <HeaderComponent/>
        <SidebarComponent/>
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="text-dark"><i class="nav-icon fas fa-tachometer-alt"></i> Dashboard</h1>
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
                    <div class="row">
                        <div class="col-md-3 mb-3" v-for="widget in widgets" :key="widget.title">
                            <Card>
                                <template #content>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 class="text-muted">{{ widget.title }}</h5>
                                            <h4 class="text-dark">{{ widget.count }}</h4>
                                        </div>
                                        
                                        <i :class="widget.icon"></i>
                                    </div>
                                </template>
                                <template #footer>
                                    <div class="d-flex justify-content-center align-items-center">
                                        <router-link :to="widget.link" class="text-dark view-details">
                                            <span>View Details</span>
                                            <i class="fas fa-angle-right mt-1 ml-2"></i>
                                        </router-link>
                                    </div>
                                </template>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        <FooterComponent/>
    </div>
</template>

<script setup>
    import HeaderComponent from "@/components/layouts/HeaderComponent.vue";
    import SidebarComponent from "@/components/layouts/SidebarComponent.vue";
    import FooterComponent from "@/components/layouts/FooterComponent.vue";

    import {ref, onMounted} from "vue";

    const widgets = ref([
        {
            id: 1,
            title: "Products",
            icon: "fas fa-box-open fa-3x text-orange widget-icon",
            count: 1234,
            link: "/inventory/products"
        },
        {
            id: 2,
            title: "Categories",
            icon: "fas fa-shapes fa-3x text-orange widget-icon",
            count: 1234,
            link: "/inventory/categories"
        },
        {
            id: 3,
            title: "Brands",
            icon: "fas fa-tags fa-3x text-orange widget-icon",
            count: 1234,
            link: "/inventory/brands"
        },
        {
            id: 4,
            title: "Sales",
            icon: "fas fa-chart-line fa-3x text-orange widget-icon",
            count: 1234,
            link: "/inventory/sales"
        },
    ]);

    /* update count of categories */
    const updateCount = () => {
        widgets.value[0].count = 1000;

    }

    onMounted(() => {
        updateCount();
    });
    
</script>

<style scoped>

    .p-card .widget-icon {
        transition: all 0.3s ease-in-out;
    }
    .p-card:hover .widget-icon {
        transform: scale(1.1);
    }

    .view-details i {
        transition: all 0.3s ease-in-out;
    }
    .view-details:hover i {
        transform: translateX(5px);
    }
</style>
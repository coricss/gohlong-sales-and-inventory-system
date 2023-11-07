<template>
    <div class="content-wrapper">
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
                                            <h5 class="font-weight-bold widget-title">{{ widget.title }}</h5>
                                            <h4 class="text-dark widget-count">
                                                <vue3-autocounter ref="counter" :startAmount="0" :endAmount="widget.count" :duration="1" prefix="" suffix="" separator="," decimalSeparator="." :decimals="0" :autoinit="true" />
                                            </h4>
                                        </div>
                                        <i :class="widget.icon"></i>
                                    </div>
                                </template>
                                <template #footer>
                                    <div class="d-flex justify-content-center align-items-center">
                                        <router-link :to="widget.link" class="text-muted view-details">
                                            <span class="text-muted">View Details</span>
                                            <i class="fas fa-angle-right mt-1 ml-2 text-muted"></i>
                                        </router-link>
                                    </div>
                                </template>
                            </Card>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-7 mb-3">
                            <Card>
                                <template #title>
                                    <i class="fas fa-chart-bar mr-2"></i>
                                    <span>Weekly Sales</span>
                                </template>
                                <template #content>
                                    <Chart 
                                        type="bar" 
                                        :data="weeklySalesData" 
                                        :options="weeklySalesOptions" 
                                        :pt="{
                                            canvas: {
                                                class: 'w-100 h-100',
                                            },
                                            root: {
                                                class: 'w-100 h-100',
                                            }
                                        }"
                                    />
                                </template>
                            </Card>
                        </div>
                        <div class="col-md-5 mb-3">
                            <Card>
                                <template #title>
                                    <i class="fas fa-chart-pie mr-2"></i>
                                    <span>Top Products</span>
                                </template>
                                <template #content>
                                    <Chart 
                                        type="doughnut" 
                                        :data="topProductData" 
                                        :options="topProductOptions" 
                                        :pt="{
                                            canvas: {
                                                class: 'text-center w-75 h-25',
                                            },
                                            root: {
                                                class: 'w-50 h-50',
                                            }
                                        }"
                                    />
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
            count: 500,
            link: "/inventory/categories"
        },
        {
            id: 3,
            title: "Brands",
            icon: "fas fa-tags fa-3x text-orange widget-icon",
            count: 200,
            link: "/inventory/brands"
        },
        {
            id: 4,
            title: "Total Sales",
            icon: "fas fa-chart-line fa-3x text-orange widget-icon",
            count: 2590,
            link: "/sales"
        },
    ]);

    const weeklySalesData = ref();
    const weeklySalesOptions = ref();

    /* const refresh = () => {
        weeklySalesData.value = setweeklySalesData();
        weeklySalesOptions.value = setweeklySalesOptions();
    }; */

    const setweeklySalesData = () => {
        return {
            labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
            datasets: [
                {
                    label: 'This week',
                    data: [540, 234, 213, 567, 123, 446, 333],
                    minBarLength: 3,
                    barPercentage: 0.5,
                    backgroundColor: ['#fed8b9'],
                    borderColor: ['#fd8b2c'],
                    borderWidth: 2
                },
                {
                    label: 'Last week',
                    data: [213, 235, 664, 345, 865, 344, 232],
                    minBarLength: 3,
                    barPercentage: 0.5,
                    backgroundColor: ['#ebebeb'],
                    borderColor: ['#c2c2c2'],
                    borderWidth: 2
                },
            ]
        };
    };

    const setweeklySalesOptions = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        return {
            plugins: {
                responsive: true,
                interaction: {
                    intersect: true
                },
                aspectRatio: 1,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: textColor,
                        boxWidth: 15,
                        fontSize: 10,
                        padding: 10
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
    }

    const topProductData = ref();
    const topProductOptions = ref(null);

    const setTopProductData = () => {
        const documentStyle = getComputedStyle(document.body);

        return {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };
    };

    const setTopProductOptions = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        return {
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        cutout: '60%',
                        color: textColor,
                        boxWidth: 15,
                        fontSize: 10,
                        padding: 10
                    }
                }
            }
        };
    };

    /* update count of categories */
    const updateCount = () => {
        widgets.value[0].count = 1000;

    }

    onMounted(() => {
        weeklySalesData.value = setweeklySalesData();
        weeklySalesOptions.value = setweeklySalesOptions();
        topProductData.value = setTopProductData();
        topProductOptions.value = setTopProductOptions();
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

    .p-chart {
        height: 100% !important;
        width: 100% !important;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
</style>
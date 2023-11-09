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
                                                <vue3-autocounter ref="counter" :startAmount="0" :endAmount="widget.count" :duration="1" prefix="&#8369;"
                                                 suffix="" separator="," decimalSeparator="." :decimals="2" :autoinit="true" v-if="widget.id == 4" />
                                                <vue3-autocounter v-else ref="counter" :startAmount="0" :endAmount="widget.count" :duration="1" prefix="" suffix="" separator="," decimalSeparator="." :decimals="0" :autoinit="true" />
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
    import { useDashboardStore } from "@/store/dashboard";

    const dashboardStore = useDashboardStore();

    const count_data = ref([]);

    const widgets = ref([
        {
            id: 1,
            title: "Products",
            icon: "fas fa-box-open fa-3x text-orange widget-icon",
            count: 0,
            link: "/inventory/products"
        },
        {
            id: 2,
            title: "Categories",
            icon: "fas fa-shapes fa-3x text-orange widget-icon",
            count: 0,
            link: "/inventory/categories"
        },
        {
            id: 3,
            title: "Brands",
            icon: "fas fa-tags fa-3x text-orange widget-icon",
            count: 0,
            link: "/inventory/brands"
        },
        {
            id: 4,
            title: "Total Sales "+ /* this month */ '('+new Date().toLocaleString('default', { month: 'short', year: 'numeric' })+')',
            icon: "fas fa-chart-line fa-3x text-orange widget-icon",
            count: 0,
            link: "/sales"
        },
    ]);

    const weeklyData = [];
    const model_size = [];
    const total_quantity = [];

    const loadDashboard = () => {
        dashboardStore.getWidgetsData().then((response) => {
            count_data.value = response;
            /* replace widgets.count */
            widgets.value[0].count = response.products;
            widgets.value[1].count = response.categories;
            widgets.value[2].count = response.brands;
            widgets.value[3].count = response.sales;
        });

        dashboardStore.getWeeklySalesData().then((response) => {
            weeklyData.this_week = response.this_week;
            weeklyData.last_week = response.last_week;
            weeklySalesData.value = setweeklySalesData(weeklyData.this_week, weeklyData.last_week);
        });

        dashboardStore.getTopProductsData().then((response) => {
            for (var i = 0; i < response.length; i++) {
                model_size.push(response[i].model_size);
                total_quantity.push(response[i].total_quantity);
            }
            
            topProductData.value = response.length == 0 ? setTopProductData(['No data'], [1]) : setTopProductData(model_size, total_quantity);
        });
    }

    const weeklySalesData = ref();
    const weeklySalesOptions = ref();

    /* const refresh = () => {
        weeklySalesData.value = setweeklySalesData();
        weeklySalesOptions.value = setweeklySalesOptions();
    }; */

    const last_seven_days = ref([]);
    const last_7_days = () => {
        var date_now = new Date();

        for (var i = 1; i < 8; i++) {
            var date = new Date(date_now);
            date.setDate(date_now.getDate() - i);
            var day = date.toLocaleString('default', { weekday: 'short' });
            last_seven_days.value.push(day);
        }
    }

    const setweeklySalesData = (this_week, last_week) => {
        return {
            labels: last_seven_days,
            datasets: [
                {
                    label: 'This week',
                    data: this_week,
                    minBarLength: 3,
                    barPercentage: 0.5,
                    backgroundColor: ['#fed8b9'],
                    borderColor: ['#fd8b2c'],
                    borderWidth: 2
                },
                {
                    label: 'Last week',
                    data: last_week,
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

    const setTopProductData = (model_size, total_quantity) => {
        const documentStyle = getComputedStyle(document.body);

        return {
            labels: model_size,
            datasets: [
                {
                    data: total_quantity,
                    backgroundColor: model_size == 'No data' ? documentStyle.getPropertyValue('--gray-600') : [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--purple-500')],
                    hoverBackgroundColor: model_size == 'No data' ? documentStyle.getPropertyValue('--gray-500') : [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--purple-400')],
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
                    position: 'right',
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
        /* widgets.value[0].count = 1000; */

    }

    onMounted(() => {
        loadDashboard();
        last_7_days();
        weeklySalesOptions.value = setweeklySalesOptions();
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
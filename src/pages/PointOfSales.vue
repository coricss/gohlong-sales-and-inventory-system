<template>
    <div class="content-wrapper">
        <HeaderComponent />
        <SidebarComponent />
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="text-dark"><i class="fas fa-shopping-cart"></i> Point of Sales</h1>
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
                        <div class="col-md-4">
                            <!-- BARCODE -->
                            <div class="card card-orange card-outline">
                                <div class="card-header">
                                    <h4 class="text-dark" style="font-weight: 600">Search a Product Item</h4>
                                </div>
                                <div class="card-body">
                                    <div class="row mb-4">
                                        <div class="col-md-12">
                                            <div class="p-inputgroup flex-1">
                                                <InputText 
                                                    placeholder="Scan Barcode or Enter Product ID" 
                                                />
                                                <Button 
                                                    icon="fas fa-barcode" 
                                                    severity="secondary"
                                                    style="width: 50px; border-radius: 0 5px 5px 0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item_detail" v-if="item_found">
                                        <div class="row mb-3">
                                            <div class="col-6">
                                                <div class="model_size text-dark">
                                                    <h6 class="font-weight-bold">Product ID:</h6>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="model_size text-dark">
                                                    <h6 class="">qweq</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-6">
                                                <div class="model_size text-dark">
                                                    <h6 class="font-weight-bold">Model/Size:</h6>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="model_size text-dark">
                                                    <h6 class="">qweq</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-3 mt-3">
                                            <div class="col-6">
                                                <div class="model_size text-dark">
                                                    <h6 class="font-weight-bold">Brand:</h6>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="model_size text-dark">
                                                    <h6 class="">qweq</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-3 mt-3">
                                            <div class="col-6">
                                                <div class="model_size text-dark">
                                                    <h6 class="font-weight-bold">Category:</h6>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="model_size text-dark">
                                                    <h6 class="">qweq</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-3 mt-3">
                                            <div class="col-6">
                                                <div class="model_size text-dark">
                                                    <h6 class="font-weight-bold">Price:</h6>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="model_size text-dark">
                                                    <h6 class="">qweq</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-8 mt-3 quantity_wrapper">
                                                <div class="p-inputgroup flex-1">
                                                    <InputNumber 
                                                        inputId="item_quantity"
                                                        v-model="item_quantity" 
                                                        buttonLayout="horizontal"
                                                        showButtons 
                                                        :min="0"
                                                        decrementButtonClass="p-button-danger" 
                                                        incrementButtonClass="p-button-success" 
                                                        incrementButtonIcon="pi pi-plus" 
                                                        decrementButtonIcon="pi pi-minus"
                                                        suffix=" piece(s)"
                                                        style="width: 100%; height: 40px; font-size: 15px; word-break: break-all; white-space: normal;"
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-lg-4 mt-3 quantity_wrapper">
                                                <div class="p-inputgroup flex-1 d-flex align-items-center">
                                                    <ToggleButton 
                                                        v-model="is_discounted" 
                                                        class="rounded"
                                                        onIcon="pi pi-check"
                                                        offIcon="pi pi-times"
                                                        onLabel="Discounted"
                                                        offLabel="No Discount"
                                                        onIconPos="left"
                                                        offIconPos="right"
                                                        onClass="p-button-success"
                                                        offClass="p-button-danger"
                                                        style="width: 100%; height: 40px; font-size: 15px; word-break: break-all; white-space: normal;"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="empty_item" v-else>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="d-flex justify-content-center align-items-center flex-column">
                                                    <img src="@/assets/imgs/empty_item.png" alt="Empty" class="img-fluid" style="width: 230px; height: 230px">
                                                    <h4 class="text-dark m-0">No Item</h4>
                                                    <p class="text-dark m-0">Please scan barcode or enter product ID</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-12">
                                            <Button 
                                                icon="fas fa-plus"
                                                class="w-100 mt-3 rounded" 
                                                size="large"
                                                :disabled="!item_found"
                                            >
                                                <i class="pi pi-plus mr-2"></i>
                                                Add Item
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8">
                           <!--  ITEMS -->
                            <div class="card card-orange card-outline">
                                <div class="card-header">
                                    <h4 class="text-dark" style="font-weight: 600">List of Items</h4>
                                </div>
                                <div class="card-body">
                                    <DataTable
                                            class="table table-hover table-bordered table-sm text-dark display nowrap w-100"
                                            id="inventory-management-table"
                                            ref="inventory_table"
                                            :data="items"
                                            :columns="columns"
                                            :options="{
                                                dom:            'Bftip',
                                                scrollY:        '60vh',
                                                scrollX:        true,
                                                scrollCollapse: true,
                                                destroy:        true,
                                                responsive:     true,
                                                autoWidth:      true,
                                                serverSide:     false,  
                                                processing:     true,
                                                language:       {search: 'Search'},
                                                buttons:        buttons,
                                                lengthMenu:     lengthMenu,
                                                deferRender:    true,
                                                lengthChange:   false,
                                                info:           false,
                                                columnDefs: [
                                                { responsivePriority: 1, targets: 0 },
                                                { responsivePriority: 2, targets: -1 },
                                                {
                                                    targets: 0,
                                                    className: 'text-center',
                                                },
                                                {
                                                    targets: [1, 2, 3, 4, 5, 6, 7, 8],
                                                    className: 'text-center align-middle',
                                                },
                                                {
                                                    targets: 9,
                                                    className: 'text-center',
                                                    orderable: false,
                                                }
                                                ],
                                                order: [[ 0, 'asc' ]]
                                            }"
                                            :initComplete="initComplete"
                                        >
                                            <thead class="bg-dark text-white">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Product ID</th>
                                                    <th>Model/Size</th>
                                                    <th>Brand</th>
                                                    <th>Category</th>
                                                    <th>Sold to</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Total</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                            </tbody>
                                        </DataTable>
                                </div>
                                <div class="card-footer">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="d-flex justify-content-start align-items-center">
                                                <h5 class="text-dark m-0">Total Products:</h5>
                                                <h5 class="text-dark m-0 mx-2">
                                                    {{items.length}}
                                                </h5>>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="d-flex justify-content-end align-items-center">
                                                <h5 class="text-dark m-0">Total Price:</h5>
                                                <h5 class="text-dark m-0 mx-2">
                                                    <span>&#8369;</span>
                                                    {{ total_price }}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-12">
                                            <div class="d-flex justify-content-center align-items-center">
                                                <Button 
                                                    icon="pi pi-cart-plus"
                                                    class="w-50 mt-3 rounded" 
                                                    size="large"
                                                    :disabled="items.length == 0"
                                                >
                                                    <i class="pi pi-cart-plus mr-2" style="font-size: 18px"></i>
                                                    Checkout
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        <FooterComponent />
    </div>
</template>

<script setup>
import HeaderComponent from "@/components/layouts/HeaderComponent.vue";
import SidebarComponent from "@/components/layouts/SidebarComponent.vue";
import FooterComponent from "@/components/layouts/FooterComponent.vue";
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import Buttons from 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-responsive';
import 'datatables.net-select';

import { 
    ref,
    onMounted,
    watch
} from "vue";

DataTable.use(DataTablesCore);
DataTable.use(Buttons);

const item_found = ref(false);
const item_quantity = ref(0);
const is_discounted = ref(false);

item_found.value = true;

const items = ref([
    {
        count: 1,
        product_id: '123',
        model_size: '123',
        brand: '123',
        category: '123',
        sold_to: '123',
        price: 123,
        quantity: '123',
        total: 123.39,
        action: '123',
    },
    {
        count: 1,
        product_id: '123',
        model_size: '123',
        brand: '123',
        category: '123',
        sold_to: '123',
        price: 123,
        quantity: '123',
        total: 123.39,
        action: '123',
    },
    {
        count: 1,
        product_id: '123',
        model_size: '123',
        brand: '123',
        category: '123',
        sold_to: '123',
        price: 123,
        quantity: '123',
        total: 123.39,
        action: '123',
    },
    {
        count: 1,
        product_id: '123',
        model_size: '123',
        brand: '123',
        category: '123',
        sold_to: '123',
        price: 123,
        quantity: '123',
        total: 123.39,
        action: '123',
    },
    {
        count: 1,
        product_id: '123',
        model_size: '123',
        brand: '123',
        category: '123',
        sold_to: '123',
        price: 123,
        quantity: '123',
        total: 123.39,
        action: '123',
    },
    {
        count: 1,
        product_id: '123',
        model_size: '123',
        brand: '123',
        category: '123',
        sold_to: '123',
        price: 123,
        quantity: '123',
        total: 123.39,
        action: '123',
    },
    {
        count: 1,
        product_id: '123',
        model_size: '123',
        brand: '123',
        category: '123',
        sold_to: '123',
        price: 123,
        quantity: '123',
        total: 123.39,
        action: '123',
    },
    {
        count: 1,
        product_id: '123',
        model_size: '123',
        brand: '123',
        category: '123',
        sold_to: '123',
        price: 123,
        quantity: '123',
        total: 123.39,
        action: '123',
    },
]);


const total_price = ref(0);

items.value.forEach(item => {
    total_price.value += item.total;
});




const columns = ref([
    {
        /* count */
        data: null,
        render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
        }
    },  
    {
        data: "product_id",
    },
    {
        data: "model_size",
    },
    {
        data: "brand",
    },
    {
        data: "category",
    },
    {
        data: "sold_to",
    },
    {
        data: "price",
    },
    {
        data: "quantity",
    },
    {
        data: "total",
    },
    {
        data: "action",
    },

]);

const buttons = ref([
    {
        text: '<i class="fas fa-sync fa-sm"></i> Refresh',
        titleAttr: 'Show entries',
        className: 'btn btn-sm btn-dark',
        attr:  {
            id: 'btn-refresh'
        },
        init: function (api, node, config) {
            node.removeClass('dt-button');
        },
        action: function ( e, dt, node, config ) {
           /*  loadData(); */
            dt.order([0, 'asc']).draw();
            dt.columns.adjust().responsive.recalc();
            /* getDT(dt); */
        }
    },
    {
        text: '<i class="fas fa-eye fa-sm"></i> Show entries',
        extend: "pageLength",
        titleAttr: 'Show entries',
        className: "btn btn-sm btn-dark",
        init: function (api, node, config) {
            node.removeClass('dt-button');
        },
    },
]);

const lengthMenu = ref([
    [  -1, 10, 25, 50 ],
    [ 
    'Show all',
    '10 rows', 
    '25 rows', 
    '50 rows'
    ]
]);

const windowResize = () => {
    window.addEventListener('resize', function() {
        /* loadData(); */
        document.getElementById('btn-refresh').click();
    });
};

const initComplete = (settings, json) => {
    windowResize();
};

</script>

<style>
@import 'datatables.net-bs5';
@import 'datatables.net-buttons-dt';
@import 'datatables.net-responsive-dt';
@import 'datatables.net-select-dt';

.p-inputnumber-button-up {
    border-radius: 0 5px 5px 0 !important;
    border-left: 0 !important;
    border-top: 0 !important;
    border-bottom: 0 !important;
    border-color: #ced4da !important;
}

.p-inputnumber-button-down {
    border-radius: 5px 0 0 5px !important;
    border-left: 0 !important;
    border-top: 0 !important;
    border-bottom: 0 !important;
    border-color: #ced4da !important;
}


input#item_quantity {
    border-radius: 0px !important;
}

</style>
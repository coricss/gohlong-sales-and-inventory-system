<template>
    <div class="content-wrapper" style="min-height: 1599.06px;">
        <HeaderComponent/>
            <SidebarComponent/>
                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="text-dark"><i class="fas fa-box-open"></i> Manage Products</h1>
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
                            <div class="col-12">
                                <div class="card card-orange card-outline">
                                    <div class="card-body" style="display: block;">
                                        <DataTable
                                            class="table table-hover table-bordered table-sm text-dark display nowrap w-100"
                                            id="product-management-table"
                                            ref="product_table"
                                            :data="product_items"
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
                                                columnDefs: [
                                                { responsivePriority: 1, targets: 0 },
                                                { responsivePriority: 2, targets: -1 },
                                                {
                                                    targets: 0,
                                                    className: 'text-center',
                                                },
                                                {
                                                    targets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                                                    className: 'text-center align-middle',
                                                },
                                                {
                                                    targets: 13,
                                                    className: 'text-center',
                                                    orderable: false,
                                                }
                                                ],
                                                order: [[ 0, 'asc' ]]
                                            }"
                                        >
                                            <thead class="bg-dark text-white">
                                                <tr style="font-size: 12px;">
                                                    <th>#</th>
                                                    <th>Product ID</th>
                                                    <th>Model/Size</th>
                                                    <th>Brand</th>
                                                    <th>Category</th>
                                                    <th>Stocks</th>
                                                    <th>Old Stocks</th>
                                                    <th>New Stocks Added At</th>
                                                    <th>Price</th>
                                                    <th>Discounted Price</th>
                                                    <th>Total Price Stocks</th>
                                                    <th>Total Discounted Price Stocks</th>
                                                    <th>Created At</th>
                                                    <th>Updated At</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                            </tbody>
                                        </DataTable>
                                         <ConfirmDialog
                                            :dismissable-mask="true"
                                            :closable="true"
                                            :draggable="false"
                                            :resizable="false"
                                        ></ConfirmDialog>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- ADD NEW PRODUCT -->
                <Dialog 
                    v-model:visible="new_product_modal"
                    :modal="true" 
                    :closable="true" 
                    :dismissable-mask="false" 
                    :draggable="false" 
                    :resizable="true"  
                    @hide="clear_product_modal"
                    :style="{ width: '30rem' }"
                >
                    <template #header>
                        <div class="text-center">
                            <h4 class="m-0 font-weight-bold">Add new product</h4>
                        </div>
                    </template>
                    <form @submit.prevent="add_new_product" id="new-product-form">
                        <div class="row">
                            <div class="col-sm-8 mt-2">
                                <InputText 
                                    v-model.trim="new_product"
                                    class="w-100"
                                    placeholder="Enter model/size"
                                    :maxlength="50"
                                    required
                                    autofocus
                                />
                            </div>
                             <div class="col-sm-4 mt-2">
                                <InputNumber
                                    inputId="new-stocks"
                                    v-model="new_stocks"
                                    placeholder="Enter stocks"
                                    :min="0"
                                    suffix=" pc(s)"
                                    showButtons
                                    required
                                    decrementButtonClass="p-button-secondary" 
                                    incrementButtonClass="p-button-secondary" 
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 mt-2">
                                <Dropdown 
                                    v-model="new_brand"
                                    id="brand_dropdown"
                                    class="w-100"
                                    :options="brand_items"
                                    optionLabel="brand_name"
                                    optionValue="id"
                                    placeholder="Select brand"
                                    filter
                                    showClear
                                    required
                                    @click="getBrandData"
                                    @change="getCategorById(new_brand)"
                                />
                            </div>
                            <div class="col-sm-6 mt-2">
                                <Dropdown 
                                    v-model="new_category"
                                    id="category_dropdown"
                                    class="w-100"
                                    :options="category_items"
                                    optionLabel="category_name"
                                    optionValue="id"
                                    placeholder="Select category"
                                    filter
                                    showClear
                                    required
                                    disabled
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 mt-2">
                                <InputNumber
                                    inputId="new-price"
                                    v-model="new_price"
                                    placeholder="Enter price"
                                    :min="0"
                                    prefix="Price: "
                                    showButtons
                                    required
                                    mode="currency"
                                    currency="PHP"
                                    decrementButtonClass="p-button-secondary" 
                                    incrementButtonClass="p-button-secondary" 
                                />
                            </div>
                            <div class="col-sm-6 mt-2">
                                <InputNumber 
                                    inputId="new-discounted-price"
                                    v-model="new_discounted_price"
                                    placeholder="Enter discounted price"
                                    :min="0"
                                    prefix="Discount: "
                                    showButtons
                                    required
                                    mode="currency"
                                    currency="PHP"
                                    decrementButtonClass="p-button-secondary" 
                                    incrementButtonClass="p-button-secondary" 
                                />
                            </div>
                        </div>
                    </form>
                    <template #footer>
                        <div class="text-center">
                            <Button 
                                icon="pi pi-check"
                                class=" mt-2 mx-1 rounded p-button-success"
                                size="small"
                                type="submit"
                                form="new-product-form"
                            >
                                <i class="fas fa-save mr-1"></i> Save
                            </Button>
                            <Button 
                                icon="pi pi-check"
                                class=" mt-2 mx-1 rounded p-button-danger"
                                size="small"
                                outlined 
                                @click="new_product_modal = false"
                            >
                                <i class="fas fa-times mr-1"></i>
                                Cancel
                            </Button>
                        </div>
                    </template>
                </Dialog>

                <!-- EDIT PRODUCT -->
                <Dialog 
                    v-model:visible="edit_product_modal"
                    :modal="true" 
                    :closable="true" 
                    :dismissable-mask="false" 
                    :draggable="false" 
                    :resizable="true"  
                    @hide="clear_product_modal"
                    :style="{ width: '30rem' }"
                >
                    <template #header>
                        <div class="text-center">
                            <h4 class="m-0 font-weight-bold">Update product</h4>
                        </div>
                    </template>
                    <form @submit.prevent="update_product" id="edit-product-form">
                        <div class="row">
                            <div class="col-sm-8 mt-2">
                                <InputText 
                                    v-model.trim="edit_product"
                                    class="w-100"
                                    placeholder="Enter model/size"
                                    :maxlength="50"
                                    required
                                />
                            </div>
                             <div class="col-sm-4 mt-2">
                                <InputNumber
                                    inputId="edit-stocks"
                                    v-model="edit_stocks"
                                    placeholder="Enter stocks"
                                    :min="0"
                                    suffix=" pc(s)"
                                    showButtons
                                    required
                                    decrementButtonClass="p-button-secondary" 
                                    incrementButtonClass="p-button-secondary" 
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 mt-2">
                                <Dropdown 
                                    v-model="edit_brand"
                                    id="brand_dropdown"
                                    class="w-100"
                                    :options="brand_items"
                                    optionLabel="brand_name"
                                    optionValue="id"
                                    placeholder="Select brand"
                                    filter
                                    showClear
                                    required
                                    @click="getBrandData"
                                    @change="getCategorById(edit_brand)"
                                />
                            </div>
                            <div class="col-sm-6 mt-2">
                                <Dropdown 
                                    v-model="edit_category"
                                    id="category_dropdown"
                                    class="w-100"
                                    :options="category_items"
                                    optionLabel="category_name"
                                    optionValue="id"
                                    placeholder="Select category"
                                    filter
                                    showClear
                                    required
                                    disabled
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 mt-2">
                                <InputNumber
                                    inputId="edit-price"
                                    v-model="edit_price"
                                    placeholder="Enter price"
                                    :min="0"
                                    prefix="Price: "
                                    showButtons
                                    required
                                    mode="currency"
                                    currency="PHP"
                                    decrementButtonClass="p-button-secondary" 
                                    incrementButtonClass="p-button-secondary" 
                                />
                            </div>
                            <div class="col-sm-6 mt-2">
                                <InputNumber 
                                    inputId="edit-discounted-price"
                                    v-model="edit_discounted_price"
                                    placeholder="Enter discounted price"
                                    :min="0"
                                    prefix="Discount: "
                                    showButtons
                                    required
                                    mode="currency"
                                    currency="PHP"
                                    decrementButtonClass="p-button-secondary" 
                                    incrementButtonClass="p-button-secondary" 
                                />
                            </div>
                        </div>
                    </form>
                    <template #footer>
                        <div class="text-center">
                            <Button 
                                icon="pi pi-check"
                                class=" mt-2 mx-1 rounded p-button-success"
                                size="small"
                                type="submit"
                                form="edit-product-form"
                            >
                                <i class="fas fa-save mr-1"></i> Save
                            </Button>
                            <Button 
                                icon="pi pi-check"
                                class=" mt-2 mx-1 rounded p-button-danger"
                                size="small"
                                outlined 
                                @click="edit_product_modal = false"
                            >
                                <i class="fas fa-times mr-1"></i>
                                Cancel
                            </Button>
                        </div>
                    </template>
                </Dialog>

                <!-- PRINT BARCODE -->
                <Dialog 
                    v-model:visible="print_barcode_modal"
                    :modal="true" 
                    :closable="true" 
                    :dismissable-mask="false" 
                    :draggable="false" 
                    :resizable="true"  
                    @hide="clear_product_modal"
                    :style="{ width: '50rem', }"
                >
                    <template #header>
                        <div class="text-center">
                            <h4 class="m-0 font-weight-bold">Print this barcode</h4>
                        </div>
                    </template>
                    <iframe ref="print_frame" id="print_frame" name="print_frame" src="" style="display:block; width:100%; height: 500px; border: none;"></iframe>
                </Dialog>

                <!-- ADMIN STAFF COMPARISON -->
                <Dialog
                    v-model:visible="adminStaffComparisonModal"
                    :modal="true" 
                    :closable="true" 
                    :dismissable-mask="false" 
                    :draggable="false" 
                    :resizable="true"  
                    @hide="clear_product_modal"
                    :style="{ width: '80rem', }"
                >
                    <template #header>
                        <div class="text-center">
                            <h4 class="m-0 font-weight-bold">Admin-Staff Inventory Comparison</h4>
                        </div>
                    </template>
                    <div class="row">
                        <div class="col-sm-12">
                            <DataTable
                                class="table table-hover table-bordered table-sm text-dark display nowrap w-100"
                                id="discrepancy-management-table"
                                @click="get_actual_stocks($event)"
                                :data="discrepancy_items"
                                :columns="discrepancy_columns"
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
                                    buttons:        discrepancy_buttons,
                                    lengthMenu:     lengthMenu,
                                    deferRender:    true,
                                    lengthChange:   false,
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
                            >
                                <thead class="bg-dark text-white">
                                    <tr style="font-size: 12px;">
                                        <th>#</th>
                                        <th>Product ID</th>
                                        <th>Model/Size</th>
                                        <th>Brand</th>
                                        <th>Category</th>
                                        <th>Total Recorded Stocks</th>
                                        <th>Actual Stocks</th>
                                        <th>Discrepancy</th>
                                        <th>Created At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </DataTable>
                        </div>
                    </div>  
                </Dialog>
                <Dialog
                    v-model:visible="edit_actual_stocks_modal"
                    :modal="true" 
                    :closable="true" 
                    :dismissable-mask="false" 
                    :draggable="false" 
                    :resizable="true"  
                    @hide="clear_actual_stocks_modal"
                    :style="{ width: '25rem', }"
                >
                    <template #header>
                        <div class="text-start">
                            <span class="m-0 font-weight-bold">Update <span style="text-decoration: underline; font-weight: bold;">{{ product_name ? product_name : 'product' }}'s</span> actual stocks</span>
                        </div>
                    </template>
                    <form @submit.prevent="update_actual_stocks" id="update-actual-stocks-form">
                        <div class="row">
                            <div class="col-sm-12 mt-2">
                                <InputNumber
                                    class="w-100"
                                    inputId="actual-stocks"
                                    v-model="edit_actual_stocks"
                                    placeholder="Enter actual stocks"
                                    :min="0"
                                    suffix=" pc(s)"
                                    showButtons
                                    required
                                    decrementButtonClass="p-button-secondary" 
                                    incrementButtonClass="p-button-secondary" 
                                />
                            </div>
                        </div>
                    </form>
                    <template #footer>
                        <div class="text-center">
                            <Button 
                                icon="pi pi-check"
                                class=" mt-2 mx-1 rounded p-button-success"
                                size="small"
                                type="submit"
                                form="update-actual-stocks-form"
                            >
                                <i class="fas fa-save mr-1"></i> Save
                            </Button>
                            <Button 
                                icon="pi pi-check"
                                class=" mt-2 mx-1 rounded p-button-danger"
                                size="small"
                                outlined 
                                @click="edit_actual_stocks_modal = false"
                            >
                                <i class="fas fa-times mr-1"></i>
                                Cancel
                            </Button>
                        </div>
                    </template>
                </Dialog>
        <FooterComponent/>
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

import { ref, onMounted, inject } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "vue-toastification";
import { useCategoryStore } from "@/store/category.js";
import { useBrandStore } from "@/store/brands.js";
import { useProductStore } from "@/store/products.js";
import { useLogStore } from "@/store/logs.js";

const categoryStore = useCategoryStore();
const brandStore = useBrandStore();
const productStore = useProductStore();
const logStore = useLogStore();

DataTable.use(DataTablesCore);
DataTable.use(Buttons);

const confirm = useConfirm();
const toast = useToast();
const swal = inject("$swal");
const counter = ref(0);
const product_items = ref(null);
const discrepancy_items = ref(null);

/* loadData */
const loadData = () => {
    productStore.getProductData().then((response) => {
        product_items.value = response;
    }).catch((error) => {
        loadToast(error.message, 'error');
    });
};

const brand_items = ref(null);
const new_category = ref(null);
const category_items = ref(null);

const getBrandData = () => {
    brandStore.getBrandData().then((response) => {
        brand_items.value = response;
    }).catch((error) => {
        loadToast(error.message, 'error');
    });
};

const getCategoryData = () => {
    categoryStore.getCategoryData().then((response) => {
        category_items.value = response;
    }).catch((error) => {
        loadToast(error.message, 'error');
    });
}

const getCategorById = (brand_id) => {
    getCategoryData();
    if(brand_id !== null) {
        brandStore.getBrandById(brand_id).then((response) => {
            new_category.value = response.category_id;
            edit_category.value = response.category_id;
        }).catch((error) => {
            loadToast(error.message, 'error');
        });
    } else {
        new_category.value = null;
    }
};

/* Columns */
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
        data: "brand_name",
    },
    {
        data: "category_name",
    },
    {
        data: "stocks",
        render: function (data, type, row) {
            if (data <= 10) {
                return '<center><span class="badge badge-danger">'+data+'</span></center>';
            } else if (data <= 20) {
                return '<center><span class="badge badge-warning">'+data+'</span></center>';
            } else {
                return '<center><span class="badge badge-success">'+data+'</span></center>';
            }
        }
    },
    {
        data: "old_stocks",
        render: function (data, type, row) {
            if (data <= 10) {
                return '<center><span class="badge badge-danger">'+data+'</span></center>';
            } else if (data <= 20) {
                return '<center><span class="badge badge-warning">'+data+'</span></center>';
            } else {
                return '<center><span class="badge badge-success">'+data+'</span></center>';
            }
        }
    },
    {
        data: "stock_added_at",
        render: function (data, type, row) {
          /* return date format yyyy-mm-dd */
            return '<small>'+new Date(data).toLocaleString('en-PH', { year: 'numeric', month: 'numeric', day: 'numeric' })+'</small>';
        }
    },
    {
        data: "price",
        render: function (data, type, row) {
            return '<center><small>'+new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(data)+'</small></center>';
        }
    },
    {
        data: "discount",
        render: function (data, type, row) {
            return '<center><small>'+new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(data)+'</small></center>';
        }
    },
    {
        data: "total_stock_price",
        render: function (data, type, row) {
            return '<center><small>'+new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(data)+'</small></center>';
        }
    },
    {
        data: "total_stock_discounted_price",
        render: function (data, type, row) {
            return '<center><small>'+new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(data)+'</small></center>';
        }
    },
    {
        data: "created_at",
        render: function (data, type, row) {
          return '<small>'+new Date(data).toLocaleString()+'</small>';
        }
    },
    {
        data: "updated_at",
        render: function (data, type, row) {
          return '<small>'+new Date(data).toLocaleString()+'</small>';
        }
    },
    {
        data: "id",
        render: function (data, type, row) {

            var btn_edit_product = document.createElement("button");
            btn_edit_product.setAttribute("class", "btn btn-sm btn-primary btn-edit-product");
            btn_edit_product.setAttribute("data-id", data);
            btn_edit_product.innerHTML = `<i class=\"fas fa-edit\" data-id="${data}"></i>`;

            var btn_print_barcode = document.createElement("button");
            btn_print_barcode.setAttribute("class", "btn btn-sm btn-info btn-print-barcode");
            btn_print_barcode.setAttribute("data-id", data);
            btn_print_barcode.innerHTML = `<i class=\"fas fa-barcode\" data-id="${data}"></i>`;

            var btn_delete_product = document.createElement("button");
            btn_delete_product.setAttribute("class", "btn btn-sm btn-danger btn-delete-product");
            btn_delete_product.setAttribute("data-id", data);
            btn_delete_product.innerHTML = `<i class=\"fas fa-trash\" data-id="${data}"></i>`;

            return '<center>'+btn_edit_product.outerHTML+' '+ btn_print_barcode.outerHTML +' '+btn_delete_product.outerHTML+'</center>';

        }
    },

])

/* Buttons */
const buttons = ref([
    {
        text: '<i class="fas fa-xs fa-plus"></i> New',
        titleAttr: 'Add new accident solution',
        className: 'btn btn-sm btn-dark',
        attr:  {
            id: 'btn-new',
            'data-toggle': 'modal',
            'data-target': '#new-user-modal'
        },
        init: function (api, node, config) {
            node.removeClass('dt-button');
        },
        action: function ( e, dt, node, config ) {
            new_product_modal.value = true;
        }
    },
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
            loadData();
            dt.order([0, 'asc']).draw();
            dt.columns.adjust().responsive.recalc();
            /* getDT(dt); */
        }
    },
    {
        extend: 'csv',
        text: '<i class="fas fa-download fa-sm"></i> Export',
        title: "Gohlong Tire and Service Inventory Products",
        titleAttr: 'Export',
        className: 'btn btn-sm btn-dark',
        attr:  {
            id: 'btn-csv'
        },
        init: function (api, node, config) {
            node.removeClass('dt-button');
        },
        exportOptions: {
            columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        },
    },
    {
        extend: 'csv',
        text: '<i class="fas fa-exchange-alt fa-sm"></i> Admin-Staff Inventory Comparison',
        title: "Gohlong Tire and Service Inventory Products",
        titleAttr: 'Admin-Staff Inventory Comparison',
        className: 'btn btn-sm btn-dark',
        attr:  {
            id: 'btn-csv'
        },
        init: function (api, node, config) {
            node.removeClass('dt-button');
        },
        action: function ( e, dt, node, config ) {
            productStore.getProductData().then((response) => {
                discrepancy_items.value = response;
                adminStaffComparisonModal.value = true;
                get_actual_stocks();
            }).catch((error) => {
                loadToast(error.message, 'error');
            });
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

/* lengthmenu */
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
        loadData();
    });
};

/* Add new product */
const new_product_modal = ref(false);
const new_product = ref(null);
const new_stocks = ref(null);
const new_brand = ref(null);
const new_price = ref(null);
const new_discounted_price = ref(null);

const add_new_product = () => {
    if ((new_product.value === null) || (new_stocks.value === null) || (new_brand.value === null) || (new_category.value === null) || (new_price.value === null) || (new_discounted_price.value === null)) {
        loadToast('Please enter details properly', 'error');
        return false;
    } else {
        const data = {
            model_size: new_product.value,
            stocks: new_stocks.value,
            brand_id: new_brand.value,
            category_id: new_category.value,
            price: new_price.value,
            discounted_price: new_discounted_price.value,
        };
        productStore.addProduct(data).then((response) => {
            loadToast(response.message, 'success');
            new_product_modal.value = false;
            clear_product_modal();
            loadData();
            logStore.addNewLog('Added new product: '+response.product.model_size, 'Products');
        }).catch((error) => {
            loadToast(error.message, 'error');
        });
    }
};

/* Edit product */
const edit_product_modal = ref(false);
const edit_product_id = ref(null);
const edit_product = ref(null);
const edit_stocks = ref(null);
const edit_brand = ref(null);
const edit_category = ref(null);
const edit_price = ref(null);
const edit_discounted_price = ref(null);
const print_barcode_modal = ref(false);
const print_frame = ref([]);

const update_product = () => {
    if ((edit_product.value === null) || (edit_stocks.value === null) || (edit_brand.value === null) || (edit_category.value === null) || (edit_price.value === null) || (edit_discounted_price.value === null)) {
        loadToast('Please enter details properly', 'error');
        return false;
    } else {
        const data = {
            model_size: edit_product.value,
            stocks: edit_stocks.value,
            brand_id: edit_brand.value,
            category_id: edit_category.value,
            price: edit_price.value,
            discounted_price: edit_discounted_price.value,
        };
        productStore.updateProduct(data, edit_product_id.value).then((response) => {
            loadToast(response.message, 'success');
            edit_product_modal.value = false;
            clear_product_modal();
            loadData();
            logStore.addNewLog('Updated details of: '+response.product.product_id, 'Products');
        }).catch((error) => {
            loadToast(error.message, 'error');
        });
    }
}

const action = () => {
    const productTable = document.querySelector('#product-management-table');

    productTable.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-edit-product') || e.target.classList.contains('fa-edit')) {
            const id = e.target.getAttribute('data-id');
            edit_product_id.value = id;
            edit_product_modal.value = true;
            getBrandData();
            productStore.getProductById(id).then((response) => {
                edit_product.value = response.model_size;
                edit_stocks.value = response.stocks;
                edit_brand.value = response.brand_id;
                edit_category.value = response.category_id;
                getCategorById(edit_brand.value);
                edit_price.value = parseFloat(response.price);
                edit_discounted_price.value = parseFloat(response.discount);
            }).catch((error) => {
                loadToast(error.message, 'error');
            });
        } else if (e.target.classList.contains('btn-delete-product') || e.target.classList.contains('fa-trash')) {
            const id = e.target.getAttribute('data-id');
            confirm.require({
                message: 'Are you sure you want to proceed?',
                header: 'Delete this product?',
                icon: 'pi pi-question-circle',
                acceptLabel: 'Yes, delete it!',
                rejectLabel: 'No',
                acceptClass: 'p-button-success p-button-sm rounded mx-1',
                rejectClass: 'p-button-danger p-button-sm rounded mx-1',
                accept: () => {
                    productStore.deleteProduct(id).then((response) => {
                        if (response.status == 200) {
                            loadToast(response.message, 'success');
                            loadData();
                            logStore.addNewLog('Deleted a product', 'Products');
                        }
                    }).catch((error) => {
                        loadToast(error.message, 'error');
                    });
                },
                reject: () => {
                   
                }
            });
        } else if (e.target.classList.contains('btn-print-barcode') || e.target.classList.contains('fa-barcode')) {
            const id = e.target.getAttribute('data-id');
            print_barcode_modal.value = true;

            productStore.printBarcode(id).then((response) => {
                if (response.status == 200) {
                    loadToast(response.message, 'success');
                    print_frame.value.src = import.meta.env.VITE_LARAVEL_API_URL + 'barcodes/' + response.product.product_id+'.pdf';
                    loadData();
                }
            }).catch((error) => {
                loadToast(error.message, 'error');
            });
        }
    });
}

const clear_product_modal = () => {
    new_product.value = null;
    new_stocks.value = null;
    new_brand.value = null;
    new_category.value = null;
    new_price.value = null;
    new_discounted_price.value = null;

    edit_product.value = null;
    edit_stocks.value = null;
    edit_brand.value = null;
    edit_category.value = null;
    edit_price.value = null;
    edit_discounted_price.value = null;
};

const adminStaffComparisonModal = ref(false);

const discrepancy_buttons = ref([
    {
        /* print */
        extend: 'csv',
        text: '<i class="fas fa-download fa-sm"></i> Export',
        title: "Admin-Staff Inventory Comparison",
        titleAttr: 'Export',
        className: 'btn btn-sm btn-dark',
        attr:  {
            id: 'btn-csv'
        },
        init: function (api, node, config) {
            node.removeClass('dt-button');
        },
        exportOptions: {
            columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8]
        },
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


const discrepancy_columns = ref([
    {
        /* count */
        data: null,
        render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
        }
    },
    {
        data: "product_id"
    },
    {
        data: "model_size"
    },
    {
        data: "brand_name"
    },
    {
        data: "category_name"
    },
    {
        /* add two columns */
        data: null,
        render: function (data, type, row) {
            return row.old_stocks + row.stocks;
        }
    },
    {
        data: "actual_stocks",
        render: function (data, type, row) {
            return data == null ? '<center><span class="badge badge-danger">No items checked</span></center>' : data;
        }
    },
    {
        data: null,
        render: function (data, type, row) {
            var total_stocks = row.old_stocks + row.stocks;
            var actual_stocks = row.actual_stocks;

            if(actual_stocks !== null) {
                if(actual_stocks > total_stocks) {
                    return '<center><span class="badge badge-info">+'+(actual_stocks - total_stocks)+'</span></center>'
                } else if(actual_stocks < total_stocks) {
                        return '<center><span class="badge badge-danger">-'+(total_stocks - actual_stocks)+'</span></center>'
                } else {
                        return '<center><span class="badge badge-success">No discrepancy</span></center>'
                }
            } else {
                return '<center><span class="badge badge-warning">Update actual stocks</span></center>'
           }  
        }
    },
    {
        data: "created_at",
        render: function (data, type, row) {
          return '<small>'+new Date(data).toLocaleString()+'</small>';
        }
    },
    {
        data: "id",
        render: function (data, type, row) {
            var product_id = row.product_id;
            var actual_stocks = row.actual_stocks;

            var btn_update_actual_stocks = document.createElement("button");
            btn_update_actual_stocks.setAttribute("class", "btn btn-md btn-primary btn-update-actual-stocks");
            btn_update_actual_stocks.setAttribute("title", "Update actual stocks");
            btn_update_actual_stocks.setAttribute("data-id", data);
            btn_update_actual_stocks.setAttribute("data-product", product_id);
            btn_update_actual_stocks.setAttribute("data-actual-stocks", actual_stocks);
            btn_update_actual_stocks.innerHTML = `<i class=\"fas fa-cubes\" data-id="${data}" data-product="${product_id}" data-actual-stocks="${actual_stocks}"></i>`;

            return '<center>'+btn_update_actual_stocks.outerHTML+'</center>';
        }
    }  
]);

const edit_actual_stocks_modal = ref(false);
const actual_stocks_id = ref(null);
const product_name = ref(null);
const edit_actual_stocks = ref(null);

const get_actual_stocks = (e) => {
    if(e !== undefined) {
        if(e.target.classList.contains('btn-update-actual-stocks') || e.target.classList.contains('fa-cubes')) {
            edit_actual_stocks_modal.value = true;

            const id = e.target.getAttribute('data-id');
            const product_id = e.target.getAttribute('data-product');
            const actual_stocks = e.target.getAttribute('data-actual-stocks');

            actual_stocks_id.value = id;
            product_name.value = product_id;
            edit_actual_stocks.value = !parseInt(actual_stocks) ? 0 : parseInt(actual_stocks);
        }
    }
}

const update_actual_stocks = () => {
    if(edit_actual_stocks.value === null) {
        loadToast('Please enter details properly', 'error');
        return false;
    } else {
        const data = {
            actual_stocks: edit_actual_stocks.value,
        };
        productStore.updateActualStocks(data, actual_stocks_id.value).then((response) => {
            if(response.status == 200) {
                productStore.getProductData().then((response) => {
                    discrepancy_items.value = response;
                    clear_actual_stocks_modal();
                }).catch((error) => {
                    loadToast(error.message, 'error');
                });
                logStore.addNewLog('Updated actual stocks of: '+response.product, 'Products');
                loadToast(response.message, 'success');
            } else {
                loadToast(response.message, 'error');
            }
        }).catch((error) => {
            loadToast(error.message, 'error');
        });
    }
}

const clear_actual_stocks_modal = () => {
    product_name.value = null;
    edit_actual_stocks.value = null;
    edit_actual_stocks_modal.value = false;
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

onMounted(() => {
    action();
    windowResize();
    loadData();
});

</script>

<style>
@import 'datatables.net-bs5';
@import 'datatables.net-buttons-dt';
@import 'datatables.net-responsive-dt';
@import 'datatables.net-select-dt';

#new-stocks, #new-price, #new-discounted-price, #edit-stocks, #edit-price, #edit-discounted-price, #actual-stocks {
    width: 100% !important;
}

</style>